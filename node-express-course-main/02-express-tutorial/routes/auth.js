const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name == '') {
    res.status(200).send(`welcome ${name}`);
  } else {
    res
      .status(401)
      .send(
        'did not provide a valid name, <a href="/">please go back to login</a>'
      );
  }
});

module.exports = router;
