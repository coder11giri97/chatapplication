const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "chat",
  "root",
  "apple@17",
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelize;