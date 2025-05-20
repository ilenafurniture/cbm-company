require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./config/database");
const userRoutes = require("./routes/user.routes");
const articleRoutes = require("./routes/article.routes");
const tagRoutes = require("./routes/tag.routes");
const imageRoutes = require("./routes/image.routes");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ message: "API CBM Company" });
});
app.use("/user", userRoutes);
app.use("/article", articleRoutes);
app.use("/tag", tagRoutes);
app.use("/image", imageRoutes);

sequelize.sync().then(() => {
    console.log("Database synced");
});

app.listen(4001, () => {
    console.log(`Server running on ${process.env.BASE_URL}`);
});
