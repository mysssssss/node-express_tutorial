const express = require('express');
const app = express();
let { people } = require('./data');

// static assets
app.use(express.static('./methods-public'));

// parse form data
app.use(express.urlencoded({ extended: false }));

// parse json
app.use(express.json());

app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post('/api/people', (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      success: false,
      msg: `provide a name`,
    });
  }
  res.status(201).json({ success: true, person: name });
});

app.post('/login', (req, res) => {
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

app.listen(5000, () => {
  console.log('app listening on port: 5000');
});
