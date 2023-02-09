/* const Sequelize = require("sequelize");
const sequelize = new Sequelize("istyle", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
global.sequelize = sequelize;
*/
// server;
 const Sequelize = require("sequelize");
 const sequelize = new Sequelize(
  'istyle',
  'istyle_admin',
  'Istyleaddis=1',
   {
     host: '127.0.0.1',
     dialect: 'mysql',
   }
 );

 module.exports = sequelize
 global.sequelize = sequelize
