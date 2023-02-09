const { Model, DataTypes } = require("sequelize");

const sequelize = require("../database/connection");

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id",
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("Product Tag table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error.message);
  });

module.exports = ProductTag;
