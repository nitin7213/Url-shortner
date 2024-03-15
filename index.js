const express = require('express');
const fs = require('fs');
//imports
const { handleMongoDB } = require('./connection/connect');
const urlRouter = require('./routes/url');

//localhost server
const app = express();
const PORT = 8000;

//Connection via Mongo
handleMongoDB('mongodb://127.0.0.1:27017/short-url')
  .then(() => {
    console.log('Mongo Connected');
  })
  .catch((err) => console.log(err));

//middleware
app.use(express.json());
app.use((req, res, next) => {
  fs.appendFile(
    'log.txt',
    `Date:${Date.now()}\tREQ Method:${req.method}\tIp:${req.ip}\t path: ${
      req.path
    }\n`,
    () => {
      next();
    }
  );
});
app.use('/url', urlRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
