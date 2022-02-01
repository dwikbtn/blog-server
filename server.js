const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const app = express();

mongoose.connect("mongodb://localhost/blog");
const articleRouter = require("./routes/articles");
app.set("view engine", "ejs");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false }));
app.get("/", async (req, res) => {
  const articles = await Article.find().sort({
    date: "desc",
  });
  res.render("articles/index", { articles: articles });
});

// this router wiill redirect all to /router and function articleRouter
app.use("/articles", articleRouter);

app.listen(5000);
