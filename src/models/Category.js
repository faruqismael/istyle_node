const { Model, DataTypes } = require("sequelize");

const sequelize = require("../database/connection");

class Category extends Model {}

Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    category_image: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: false,
    modelName: "categories",
  }
);

module.exports = Category;
