const { Model, DataTypes } = require("sequelize");

const sequelize = require("../database/connection");

class Subscriber extends Model {}

Subscriber.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    phone_number: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: false,
    modelName: "subscribers",
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("Subscriber table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error.message);
  });

module.exports = Subscriber;
