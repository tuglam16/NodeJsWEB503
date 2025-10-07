import Joi from "joi";
import authors from "../models/author.model.js";

// Validation schema
const createAuthorSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  bio: Joi.string().max(500).optional(),
});

const updateAuthorSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional().allow(""),
  bio: Joi.string().max(500).optional(),
}).custom((value, helpers) => {
  if (value.name === "") {
    return helpers.message("Tên không được để trống nếu có truyền");
  }
  return value;
});

let idCounter = 1;


export const createAuthor = (req, res) => {
  const { error, value } = createAuthorSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const newAuthor = {
    id: idCounter++,
    name: value.name,
    bio: value.bio || "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  authors.push(newAuthor);
  res.status(201).json(newAuthor);
};


export const getAuthors = (req, res) => {
  res.json(authors);
};


export const getAuthorById = (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));
  if (!author) return res.status(404).json({ message: "Không tìm thấy tác giả" });
  res.json(author);
};


export const updateAuthor = (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));
  if (!author) return res.status(404).json({ message: "Không tìm thấy tác giả" });

  const { error, value } = updateAuthorSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  if (value.name !== undefined) author.name = value.name;
  if (value.bio !== undefined) author.bio = value.bio;
  author.updatedAt = new Date();

  res.json(author);
};


export const deleteAuthor = (req, res) => {
  const index = authors.findIndex(a => a.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Không tìm thấy tác giả" });

  const deleted = authors.splice(index, 1);
  res.json(deleted[0]);
};
