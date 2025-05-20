const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM,
        values: ["admin", "user"],
        defaultValue: "user",
    },
    token: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
    },
});

module.exports = User;
