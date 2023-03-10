const { products } = require('../../../02-express-tutorial/data');
const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $lt: 30 } }).sort('price');
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, name, company, sort, fields, numericFilters } = req.query;
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
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '<': '$lt',
      '>=': '$gte',
      '=': 'eq',
      '<=': 'lte',
    };
    const regEx = /\b(<|>|>=|=|<-)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.replace(',', ' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }
  if (fields) {
    const fieldsList = fields.replace(',', ' ');
    result = result.select(fieldsList);
  }

  console.log(queryObject);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.limit(limit).skip(skip);

  const product = await result;
  res.status(200).json({ nbHits: product.length, product });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
