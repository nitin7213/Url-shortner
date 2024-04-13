const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
//path module for showing ejs file
const path = require("path");
//imports
const { handleMongoDB } = require("./connection/connect");
const urlRouter = require("./routes/url");
const staticRoute = require("./routes/staticRouter");

//localhost server
const app = express();

//Connection via Mongo
const Server = "mongodb://127.0.0.1:27017/short-url";
handleMongoDB(Server)
  .then(() => {
    console.log("Mongo Connected");
  })
  .catch((err) => console.log(err));

//views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //Form data via home
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `Date:${Date.now()}\tREQ Method:${req.method}\tIp:${req.ip}\t path: ${
      req.path
    }\n`,
    () => {
      next();
    }
  );
});

//client
app.use("/", staticRoute);
//server
app.use("/url", urlRouter);

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
