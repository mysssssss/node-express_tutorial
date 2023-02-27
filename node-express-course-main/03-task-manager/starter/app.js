const express = require('express');
const app = express();
const tasks = require('./routes/tasks');

// middleware
app.use(express.json());
app.use(express.static('./public'));

// routes
app.get('/', (req, res) => {
  res.send(index);
});

app.use('/api/v1/tasks', tasks);

const port = 5000;

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
