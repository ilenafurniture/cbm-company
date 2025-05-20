require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
    try {
        const userExist = await User.findOne({
            where: { email: req.body.email },
        });
        if (userExist) {
            return res.status(400).json({ message: "Email has been used" });
        }
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Error hashing password" });
            }
            const user = await User.create({
                email: req.body.email,
                password: hash,
            });
            res.json(user);
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Email not found" });
        }
        bcrypt.compare(password, user.password, async (err, result) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Error comparing password" });
            }
            if (!result) {
                return res.status(400).json({ message: "Password incorrect" });
            }
            const payload = {
                id: user.id,
                email: user.email,
                role: user.role,
            };
            const accessToken = jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_SECRET
            );
            await User.update(
                { token: accessToken },
                { where: { id: user.id } }
            );
            res.status(200).json({ ...payload, token: accessToken });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const logout = async (req, res) => {
    await User.update({ token: null }, { where: { email: req.user.email } });
    return res.status(200).json({ message: "Logout berhasil" });
};

const read = async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const user = await User.findByPk(id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: "User not found" });
            }
            return;
        }
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const update = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const destroy = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.json({ message: "User deleted" });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { create, read, update, destroy, login, logout };
