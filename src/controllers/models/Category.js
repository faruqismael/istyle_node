const { Sequelize, DataTypes } = require("sequelize");
require("../database/connection");

const Category = sequelize.define("category", {
  title: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Category table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error.message);
  });

module.exports = Category;
