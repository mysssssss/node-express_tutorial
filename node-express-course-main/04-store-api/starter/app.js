// required
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
require('dotenv').config();
const productsRouter = require('./routes/products');
require('express-async-errors');

// home routes
app.get('/', (req, res) => {
  res.send(
    '<h1>home page</h1> <br>  <a href="/api/v1/products">go here for products page</a>'
  );
});
// products route

app.use('/api/v1/products', productsRouter);

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleWare = require('./middleware/error-handler');
app.use(express.json());
app.use(notFoundMiddleware);
app.use(errorMiddleWare);

// starting server
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // connect to DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server listening on port: ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
