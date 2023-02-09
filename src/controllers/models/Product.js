const { Sequelize, DataTypes } = require("sequelize");
require("../database/connection");

const Product = sequelize.define("product", {
  title: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  priority: {
    type: DataTypes.INTEGER,
    defaultValue: 3,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: "categories", //table name
    referencesKey: "category_id", // column name in the table
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Product table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error.message);
  });

module.exports = Product;
