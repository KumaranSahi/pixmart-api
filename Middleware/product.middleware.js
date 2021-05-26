const Product = require("../Models/products.model");

const productCheck = async (req, res, next) => {
  let productId;
  if (req.params.productId) productId = req.params.productId;
  else productId = req.body.productId;
  try {
    const product = await Product.findById(productId);
    if (product) {
      req.product = product;
      next();
    } else {
      return res.status(404).json({
        ok: false,
        message: "Data not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      ok: false,
      message: "Data not found",
    });
  }
};

module.exports = productCheck;
