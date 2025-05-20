const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Tag = sequelize.define(
    "Tag",
    {
        id: {
            type: DataTypes.STRING(20),
            primaryKey: true,
        },
        label: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "tags",
        timestamps: false,
    }
);

module.exports = Tag;
