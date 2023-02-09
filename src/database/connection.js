const Sequelize = require("sequelize");
const sequelize = new Sequelize("istyle", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
global.sequelize = sequelize;
