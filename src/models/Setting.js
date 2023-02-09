const { Model, DataTypes } = require("sequelize");

const sequelize = require("../database/connection");

class Setting extends Model {}

Setting.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    setting_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    setting_value: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    setting_type: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "text",
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: false,
    modelName: "settings",
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("Setting table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error.message);
  });

module.exports = Setting;
