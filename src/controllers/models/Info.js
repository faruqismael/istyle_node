const {Sequelize, DataTypes} = require("sequelize")
require("../database/connection")

const Info = sequelize.define("info", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
  
})

sequelize.sync().then(() => {
    console.log('info table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error.message);
 });



module.exports = Info;