import Course from "../model/courses.model";
export async function getCourse(req, res) {
  try {
    const course = await Course.find();
    return res.status(200).json({
      message: "Lay ds thanh cong",
      data: course,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
export async function getCourseById(req, res) {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "khong tim thay" });
    }
    return res.status(200).json({
      message: "Lay ds thanh cong",
      data: course,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
export async function addCourse(req, res) {
  try {
    const newCourse = await Course.create(req.body);

    return res.status(201).json({
      message: "Them thanh cong",
      data: newCourse,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
export async function deleteCourse(req, res) {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "khong tim thay" });
    }
    return res.status(201).json({
      message: "Xoa thanh cong",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
export async function updateCourse(req, res) {
  try {
    const updateCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateCourse) {
      return res.status(40).json({ message: "Cap nhat that bai" });
    }
    return res.status(201).json({
      message: "cap nhat thanh cong",
      data: updateCourse,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
