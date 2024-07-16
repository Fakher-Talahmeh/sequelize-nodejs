const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-test', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  port:3307
});

module.exports = sequelize;
