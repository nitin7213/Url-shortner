const express = require("express");

const urlRouter = express.Router();
const {
  handlePostReq,
  handleGetReq,
  handleAnalytics,
  handleDelete,
} = require("../controllers/url");

//Routes
urlRouter.post("/", handlePostReq);

urlRouter.get("/:id", handleGetReq);

urlRouter.get("/analytics/:id", handleAnalytics);

urlRouter.delete("/:id", handleDelete);

module.exports = urlRouter;
