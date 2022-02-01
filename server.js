const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost/blog");
const articleRouter = require("./routes/articles");
app.set("view engine", "ejs");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  const articles = [
    {
      title: "test article",
      createdAt: new Date(),
      description: "Just test for now",
    },
  ];
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

app.listen(5000);
