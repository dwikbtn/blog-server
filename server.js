const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const methodOverride = require("method-override");
const app = express();

mongoose.connect("mongodb://localhost/blog");
const articleRouter = require("./routes/articles");
const apiRouter = require("./routes/api");
app.set("view engine", "ejs");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({
    date: "desc",
  });
  try {
    res.render("articles/index", { articles });
  } catch (error) {
    console.log(error, "here");
  }
});

// this router wiill redirect all to /router and function articleRouter
app.use("/articles", articleRouter);
app.use("/api", apiRouter);

//port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running on ${port}`);
});
