const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

// Create a connection to the database
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
    }
);

// const sequelize = new Sequelize("cbm_company", "root", "", {
//     host: "localhost",
//     dialect: "mysql",
// });

module.exports = sequelize;
