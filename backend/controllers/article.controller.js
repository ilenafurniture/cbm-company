require("dotenv").config();
const Article = require("../models/article");
const Tag = require("../models/tag");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

// helper: parse "double JSON" aman
const safeParseTags = (raw) => {
  try {
    let out = JSON.parse(raw);
    if (typeof out === "string") out = JSON.parse(out);
    return Array.isArray(out) ? out : [];
  } catch {
    return [];
  }
};

const read = async (req, res) => {
  const pathParam = req.params.path;
  const { tag, kategori, q } = req.query;

  // pagination
  const pag = Math.max(1, parseInt(req.query.pag || "1", 10));
  const limit = Math.max(1, parseInt(req.query.limit || "8", 10)); // default 8
  const offset = (pag - 1) * limit;

  try {
    // ambil daftar tag utk mapping id->label
    const tagRows = await Tag.findAll();
    const tags = tagRows.map((t) => t.dataValues);

    // DETAIL: GET /article/:path
    if (pathParam) {
      const article = await Article.findOne({ where: { path: pathParam } });
      if (!article) return res.status(404).json({ error: "Article not found" });

      const tagIds = safeParseTags(article.dataValues.tag);
      const tagLabels = tagIds
        .map((id) => tags.find((t) => `${t.id}` === `${id}`)?.label)
        .filter(Boolean);

      return res.status(200).json({
        ...article.dataValues,
        gambar: `${process.env.BASE_URL}/image/${article.dataValues.gambar}`,
        tag: tagLabels,
      });
    }

    // LIST: GET /article
    const where = {};
    if (q) where.judul = { [Op.like]: `%${q}%` };
    if (tag) where.tag = { [Op.like]: `%${tag}%` }; // idealnya pakai relasi many-to-many
    if (kategori) where.kategori = kategori.replaceAll("-", " ");

    const { rows, count } = await Article.findAndCountAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    const data = rows.map((a) => {
      const tagIds = safeParseTags(a.dataValues.tag);
      const tagLabels = tagIds
        .map((id) => tags.find((t) => `${t.id}` === `${id}`)?.label)
        .filter(Boolean);

      return {
        ...a.dataValues,
        gambar: `${process.env.BASE_URL}/image/${a.dataValues.gambar}`,
        tag: tagLabels,
      };
    });

    const totalItems = count;
    const totalPages = Math.max(1, Math.ceil(totalItems / limit));

    return res.status(200).json({
      data,
      page: pag,
      limit,
      totalItems,
      totalPages,
      hasPrev: pag > 1,
      hasNext: pag < totalPages,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const readAdmin = async (req, res) => {
  const id = req.params.id;
  const { q } = req.query;

  const pag = Math.max(1, parseInt(req.query.pag || "1", 10));
  const limit = Math.max(1, parseInt(req.query.limit || "8", 10));
  const offset = (pag - 1) * limit;

  try {
    const tagRows = await Tag.findAll();
    const tags = tagRows.map((t) => t.dataValues);

    if (id) {
      const article = await Article.findByPk(id);
      if (!article) return res.status(404).json({ error: "Article not found" });

      const tagIds = safeParseTags(article.dataValues.tag);
      const tagLabels = tagIds
        .map((tid) => tags.find((t) => `${t.id}` === `${tid}`)?.label)
        .filter(Boolean);

      return res.status(200).json({
        ...article.dataValues,
        gambar: `${process.env.BASE_URL}/image/${article.dataValues.gambar}`,
        tag: tagLabels,
      });
    }

    const where = {};
    if (q) where.judul = { [Op.like]: `%${q}%` };

    const { rows, count } = await Article.findAndCountAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    const data = rows.map((a) => {
      const tagIds = safeParseTags(a.dataValues.tag);
      const tagLabels = tagIds
        .map((tid) => tags.find((t) => `${t.id}` === `${tid}`)?.label)
        .filter(Boolean);

      return {
        ...a.dataValues,
        gambar: `${process.env.BASE_URL}/image/${a.dataValues.gambar}`,
        tag: tagLabels,
      };
    });

    const totalItems = count;
    const totalPages = Math.max(1, Math.ceil(totalItems / limit));

    return res.status(200).json({
      data,
      page: pag,
      limit,
      totalItems,
      totalPages,
      hasPrev: pag > 1,
      hasNext: pag < totalPages,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
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
    }`.slice(-2)}${`0${newDate.getDate()}`.slice(-2)}${`0${newDate.getHours()}`.slice(
      -2
    )}${`0${newDate.getMinutes()}`.slice(-2)}${`0${newDate.getSeconds()}`.slice(-2)}`;

    let tags = [];
    for (let i = 0; i < tag.length; i++) {
      const t = tag[i];
      let itemTag = "";
      const checkExistingTags = await Tag.findOne({ where: { label: t } });
      if (!checkExistingTags) {
        await Tag.create({ id: `${idPrefix}${i}`, label: t });
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
    if (!articleSelected) {
      return res.status(400).json({ message: "Article not found" });
    }
    if (tag.length > 8) {
      return res.status(400).json({ message: "Tag maksimal 8" });
    }

    const newDate = new Date();
    const idPrefix = `${newDate.getFullYear()}${`0${
      newDate.getMonth() + 1
    }`.slice(-2)}${`0${newDate.getDate()}`.slice(-2)}${`0${newDate.getHours()}`.slice(
      -2
    )}${`0${newDate.getMinutes()}`.slice(-2)}${`0${newDate.getSeconds()}`.slice(-2)}`;

    let tags = [];
    for (let i = 0; i < tag.length; i++) {
      const t = tag[i];
      let itemTag = "";
      const checkExistingTags = await Tag.findOne({ where: { label: t } });
      if (!checkExistingTags) {
        await Tag.create({ id: `${idPrefix}${i}`, label: t });
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

    await Article.update(dataArticle, { where: { id: idArticle } });
    res.status(200).json({ ...articleSelected.dataValues, ...dataArticle });
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
    res
      .status(200)
      .json({ message: `Artikel ${articleSelected.dataValues.judul} berhasil dihapus` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { read, create, update, destroy, readAdmin };
