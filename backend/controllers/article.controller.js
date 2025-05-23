require("dotenv").config();
const Article = require("../models/article");
const Tag = require("../models/tag");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

const read = async (req, res) => {
    const path = req.params.path;
    const { tag, kategori, q, pag = 1 } = req.query;
    try {
        const fetcthTags = await Tag.findAll();
        const tags = fetcthTags.map((t) => t.dataValues);
        if (path) {
            const article = await Article.findOne({ where: { path } });
            if (!article) {
                return res.status(404).json({ error: "Article not found" });
            }
            const tagsArticleArr = JSON.parse(
                JSON.parse(article.dataValues.tag)
            );
            const tagsArticleView = [];
            for (let i = 0; i < tagsArticleArr.length; i++) {
                tagsArticleView.push(
                    tags.find((t) => t.id == tagsArticleArr[i]).label
                );
            }
            return res.status(200).json({
                ...article.dataValues,
                gambar: `${process.env.BASE_URL}/image/${article.dataValues.gambar}`,
                tag: tagsArticleView,
            });
        }
        let filter = {};
        if (q) {
            filter.judul = { [Op.like]: `%${q}%` };
        }
        if (tag) {
            filter.tag = { [Op.like]: `%${tag}%` };
        }
        if (kategori) {
            filter.kategori = kategori;
        }
        const article = await Article.findAll({
            where: filter,
            limit: 20,
            offset: (pag - 1) * 20,
        });
        const articleAll = await Article.findAll({
            where: filter,
        });
        res.status(200).json({
            data: article.map((a) => {
                const tagsArticleArr = JSON.parse(JSON.parse(a.dataValues.tag));
                const tagsArticleView = [];
                for (let i = 0; i < tagsArticleArr.length; i++) {
                    tagsArticleView.push(
                        tags.find((t) => t.id == tagsArticleArr[i]).label
                    );
                }
                return {
                    ...a.dataValues,
                    gambar: `${process.env.BASE_URL}/image/${a.dataValues.gambar}`,
                    tag: tagsArticleView,
                };
            }),
            count: articleAll.length,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const readAdmin = async (req, res) => {
    const id = req.params.id;
    const { q, pag = 1 } = req.query;
    try {
        const fetcthTags = await Tag.findAll();
        const tags = fetcthTags.map((t) => t.dataValues);
        if (id) {
            const article = await Article.findByPk(id);
            if (!article) {
                return res.status(404).json({ error: "Article not found" });
            }
            const tagsArticleArr = JSON.parse(
                JSON.parse(article.dataValues.tag)
            );
            const tagsArticleView = [];
            for (let i = 0; i < tagsArticleArr.length; i++) {
                tagsArticleView.push(
                    tags.find((t) => t.id == tagsArticleArr[i]).label
                );
            }
            return res.status(200).json({
                ...article.dataValues,
                gambar: `${process.env.BASE_URL}/image/${article.dataValues.gambar}`,
                tag: tagsArticleView,
            });
        }
        let filter = {};
        if (q) filter.judul = { [Op.like]: `%${q}%` };
        const article = await Article.findAll({
            where: filter,
            limit: 20,
            offset: (pag - 1) * 20,
        });
        const articleAll = await Article.findAll({
            where: filter,
        });
        res.status(200).json({
            data: article.map((a) => {
                const tagsArticleArr = JSON.parse(JSON.parse(a.dataValues.tag));
                const tagsArticleView = [];
                for (let i = 0; i < tagsArticleArr.length; i++) {
                    tagsArticleView.push(
                        tags.find((t) => t.id == tagsArticleArr[i]).label
                    );
                }
                return {
                    ...a.dataValues,
                    gambar: `${process.env.BASE_URL}/image/${a.dataValues.gambar}`,
                    tag: tagsArticleView,
                };
            }),
            count: articleAll.length,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const create = async (req, res) => {
    try {
        const { tag } = req.body;
        if (tag.length > 8) {
            return res.status(400).json({ message: "Tag maksimal 8" });
        }
        const newDate = new Date();
        const idPrefix = `${newDate.getFullYear()}${`0${
            newDate.getMonth() + 1
        }`.slice(-2)}${`0${newDate.getDate()}`.slice(
            -2
        )}${`0${newDate.getHours()}`.slice(
            -2
        )}${`0${newDate.getMinutes()}`.slice(
            -2
        )}${`0${newDate.getSeconds()}`.slice(-2)}`;
        let tags = [];
        for (let i = 0; i < tag.length; i++) {
            const t = tag[i];
            let itemTag = "";
            const checkExistingTags = await Tag.findOne({
                where: { label: t },
            });
            if (!checkExistingTags) {
                await Tag.create({
                    id: `${idPrefix}${i}`,
                    label: t,
                });
                itemTag = `${idPrefix}${i}`;
            } else {
                itemTag = checkExistingTags.id;
            }
            tags.push(itemTag);
        }
        const dataArticle = {
            ...req.body,
            tag: JSON.stringify(tags),
            path: req.body.judul
                .replace(/[^a-zA-Z0-9 ]/g, "")
                .replaceAll(" ", "-")
                .toLowerCase(),
            gambar: req.file.filename,
        };
        const resCreateArticle = await Article.create(dataArticle);
        res.status(200).json(resCreateArticle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const update = async (req, res) => {
    try {
        const { tag } = req.body;
        const idArticle = req.params.id;
        const articleSelected = await Article.findByPk(idArticle);
        console.log(articleSelected);
        // return;
        if (!articleSelected) {
            return res.status(400).json({ message: "Article not found" });
        }
        if (tag.length > 8) {
            return res.status(400).json({ message: "Tag maksimal 8" });
        }
        const newDate = new Date();
        const idPrefix = `${newDate.getFullYear()}${`0${
            newDate.getMonth() + 1
        }`.slice(-2)}${`0${newDate.getDate()}`.slice(
            -2
        )}${`0${newDate.getHours()}`.slice(
            -2
        )}${`0${newDate.getMinutes()}`.slice(
            -2
        )}${`0${newDate.getSeconds()}`.slice(-2)}`;
        let tags = [];
        for (let i = 0; i < tag.length; i++) {
            const t = tag[i];
            let itemTag = "";
            const checkExistingTags = await Tag.findOne({
                where: { label: t },
            });
            if (!checkExistingTags) {
                await Tag.create({
                    id: `${idPrefix}${i}`,
                    label: t,
                });
                itemTag = `${idPrefix}${i}`;
            } else {
                itemTag = checkExistingTags.id;
            }
            tags.push(itemTag);
        }

        const dataArticle = {
            ...req.body,
            tag: JSON.stringify(tags),
            path: req.body.judul
                .replace(/[^a-zA-Z0-9 ]/g, "")
                .replaceAll(" ", "-")
                .toLowerCase(),
        };

        if (req.file) {
            const oldFilePath = path.join(
                __dirname,
                "..",
                "uploads",
                articleSelected.dataValues.gambar
            );
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
            dataArticle.gambar = req.file.filename;
        }

        await Article.update(dataArticle, {
            where: { id: idArticle },
        });
        res.status(200).json({
            ...articleSelected.dataValues,
            ...dataArticle,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const destroy = async (req, res) => {
    try {
        const idArticle = req.params.id;
        const articleSelected = await Article.findByPk(idArticle);
        if (!articleSelected) {
            return res.status(400).json({ message: "Article not found" });
        }
        const oldFilePath = path.join(
            __dirname,
            "..",
            "uploads",
            articleSelected.dataValues.gambar
        );
        if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
        }
        await Article.destroy({ where: { id: idArticle } });
        res.status(200).json({
            message: `Artikel ${articleSelected.dataValues.judul} berhasil dihapus`,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { read, create, update, destroy, readAdmin };
