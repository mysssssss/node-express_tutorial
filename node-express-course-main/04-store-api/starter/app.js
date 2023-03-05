const express = require('express');
const app = express();
require('dotenv').config();
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleWare = require('./middleware/error-handler');

// async errors

// routes
app.get('/', (req, res) => {
  res.send(
    '<h1>home page</h1> <br>  <a href="/api/v1/products">go here for products page</a>'
  );
});

// products route

app.use(notFoundMiddleware);
app.su;

const port = process.env.PORT || 5000;

const start = async () => {
  // connect db
  try {
    app.listen(port, () => {
      console.log(`app listening on port: ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
