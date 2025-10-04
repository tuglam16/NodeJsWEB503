import Product from "../models/Product.model";

export async function getProduct(req,res) {
  try {
    // Lấy query params
    const {
      _page = 1,
      _limit = 10,
      name,
      minPrice,
      maxPrice,
    } = req.query;

    const query = {};

    // Tìm kiếm theo tên (không phân biệt hoa thường)
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    // Lọc theo khoảng giá
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Phân trang
    const page = Number(_page);
    const limit = Number(_limit);
    const skip = (page - 1) * limit;

    // Lấy dữ liệu
    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // sort mới nhất trước

    // Đếm tổng số sản phẩm phù hợp query
    const total = await Product.countDocuments(query);

    return res.json({
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getProductById(req,res) {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    return res.status(200).json({
        message: "Lấy dữ liệu thành công",
        data: product,
    });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function addProduct(req,res) {
    try {
        const newProduct = await Product.create(req.body)
        return res.status(201).json({
        message: "Thêm thành công",
        data: newProduct,
    });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function updateProduct(req,res) {
    try {
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators: true
            }
        )
        if (!updateProduct) {
        return res.status(400).json({ message: "Cập nhật sản phẩm thất bại" });
    }

    return res.status(200).json({
        message: "Cập nhật thành công",
        data: updateProduct,
    });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


export async function deleteProduct(req,res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    return res.status(200).json({
        message: "Xóa sản phẩm thành công",
    });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}