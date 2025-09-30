import Post from "../models/Post";


export async function getPost(req, res){
  try {
    const post = await Post.find();

    return res.status(200).json({
      message: "Lấy danh sách thành công",
      data: post,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export async function getPostById(req, res){
try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    return res.status(200).json({
      message: "Lấy dữ liệu thành công",
      data: post,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export async function addPost(req, res){
 try {
    const newPost = await Post.create(req.body);

    return res.status(201).json({
      message: "Thêm thành công",
      data: newPost,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export async function updatePost(req, res){
 try {
    const updatePost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // trả về giá trị sau khi cập nhật
        runValidators: true, // kiểm tra validate
      }
    );

    if (!updatePost) {
      return res.status(400).json({ message: "Cập nhật sản phẩm thất bại" });
    }

    return res.status(200).json({
      message: "Cập nhật thành công",
      data: updatePost,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export async function deletePost(req, res){
 try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    return res.status(200).json({
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

// export function searchPost(req,res){
//  try {
//     const { search } = req.query;

//     // Nếu có tham số search
//     if (search) {
//       const keyword = search.toLowerCase().trim();

//       const filteredPosts = posts.filter((post) =>
//         post.title.toLowerCase().includes(keyword)
//       );

//       // Không tìm thấy bài viết nào
//       if (filteredPosts.length === 0) {
//         return res.json([]); // trả về mảng rỗng
//       }

//       return res.json(filteredPosts);
//     }

//     // Nếu không có tham số search
//     if (posts.length === 0) {
//       return res.status(404).json({ error: "No posts available" });
//     }

//     return res.json(posts);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ error: "Server error", message: error.message });
//   }
// }