const Tag = require("../models/tag");

const read = async (req, res) => {
    try {
        const tags = await Tag.findAll();
        res.status(200).json(tags);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { read };
