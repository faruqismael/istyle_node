const Category = require("../models/Category");

async function createCategory(category, req) {
  const newCategory = await Category.create(category);
  try {
    return newCategory;
  } catch (error) {
    // if ((error.name = "SequelizeValidationError"))
    //   throw new Error(error.message, "Make sure to fill all inputs !");
    // throw new Error("Something went wrong, try again");
  }
}

const categoryController = {
  createCategory,
};

module.exports = categoryController;
