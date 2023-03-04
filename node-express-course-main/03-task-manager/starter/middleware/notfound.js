const notFound = (req, res) =>
  res
    .status(400)
    .send('page not found, please return to <a href="/">home page</a>');

module.exports = notFound;
