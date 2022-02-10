const express = require("express");
const router = express.Router();
const Article = require("./../models/article");

router.get("/", (req, res) => {
  res.send("API for article Late me blog");
});

router.get("/articles", async (req, res) => {
  const articles = await Article.find().sort({
    date: "desc",
  });
  try {
    res.send({ articles });
  } catch (error) {
    console.log(error, "here");
  }
});

router.get("/article/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  try {
    res.send({ article });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
