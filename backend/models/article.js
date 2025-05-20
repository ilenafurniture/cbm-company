const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Article = sequelize.define("Article", {
    judul: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    penulis: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kategori: {
        type: DataTypes.ENUM,
        values: ["Tips & trick", "Olahraga"],
        allowNull: false,
    },
    tag: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    gambar: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
    },
    deskripsi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    keyword: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isi: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
    },
    suka: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    bagikan: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    pengunjung: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});

module.exports = Article;
