const express = require("express");
const router = express.Router();
const controller = require("../controllers/article.controller");
const multer = require("multer");
const path = require("path");
const authenticateToken = require("../controllers/filter.controller");
const fs = require("fs");

const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});

const upload = multer({ storage: storage });

router.get("/admin", authenticateToken, controller.readAdmin);
router.get("/admin/:id", authenticateToken, controller.readAdmin);
router.get("/", controller.read);
router.get("/:path", controller.read);
router.post("/", upload.single("gambar"), controller.create);
router.put("/:id", upload.single("gambar"), controller.update);
router.delete("/:id", controller.destroy);

module.exports = router;
