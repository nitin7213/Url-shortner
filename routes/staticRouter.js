const express = require("express");
const router = express.Router();
const urlModel = require("../model/url");

router.get("/", async (req, res) => {
  const allUrls = await urlModel.find({});
  return res.render("../view/home.ejs", { urls: allUrls });
});

module.exports = router;
