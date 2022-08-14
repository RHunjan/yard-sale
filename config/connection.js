const Sequelize = require('sequelize');

//require('dotenv').config();

// create connection to our db
const sequelize = new Sequelize('yard_sale_db', 'root', '!Apple@SQL', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

module.exports = sequelize;