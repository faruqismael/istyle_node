const Product = require("../models/Product");

async function createProduct(product, req) {
  const newProduct = await Product.create(product);
  try {
    return newProduct;
  } catch (error) {
    // if ((error.name = "SequelizeValidationError"))
    //   throw new Error(error.message, "Make sure to fill all inputs !");
    // throw new Error("Something went wrong, try again");
  }
}

const productController = {
  createProduct,
};

module.exports = productController;
