const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const authenticateToken = require("../controllers/filter.controller");

router.post("/login", controller.login);
router.post("/", controller.create);
router.get("/", controller.read);
router.get("/:id", controller.read);
router.put("/:id", controller.update);
router.delete("/:id", controller.destroy);
router.post("/logout", authenticateToken, controller.logout);

module.exports = router;
