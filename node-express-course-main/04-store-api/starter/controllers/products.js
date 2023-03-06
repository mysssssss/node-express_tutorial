const { products } = require('../../../02-express-tutorial/data');
const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const search = 'ab';
  const products = await Product.find({
    name: { $regex: search, $options: 'i' },
  });
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, name, company } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }
  if (company) {
    queryObject.company = company;
  }
  console.log(queryObject);
  const product = await Product.find(queryObject);
  res.status(200).json({ nbHits: product.length, product });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
