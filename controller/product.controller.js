const { Product } = require("../models");

const getAllProducts = async (req, res) => {
  try {
    const data = await Product.find();
    if (data)
      return res.status(200).json({
        ok: true,
        data: [...data],
        message: "Products loaded successfully",
      });
    else
      return res.status(404).json({
        ok: false,
        message: "Data not found",
      });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Could not load products",
    });
  }
};

const getProduct = async (req, res) => {
  const product = req.product;
  try {
    return res.status(200).json({
      ok: true,
      data: product,
      message: "Products loaded successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Could not load product",
    });
  }
};

module.exports = { getAllProducts, getProduct };
