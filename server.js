const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

const okMessage = {message: 'OK!'};

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
  //res.json('index');
});

app.get('/testimonials/random', (req, res) => {
  //res.render('index');
});

app.post('/testimonials', (req, res) => {
  res.json(okMessage);
});

app.put('/testimonials/:id', (req, res) => {
  res.json(okMessage);
});

app.delete('/testimonials/:id', (req, res) => {
  res.json(okMessage);
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});