const express = require('express');

const { v4: uuidv4 } = require('uuid');

const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

const okMessage = {message: 'OK!'};

const v4options = {
  random: [1, 2, 3, 4, 5]
};

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.testimonials[`${req.params.id}`-1]);
});

app.get('/random', (req, res) => {
  const template = db.testimonials[Math.floor(Math.random() * db.length)];
  res.json(template);
});

app.post('/testimonials', (req, res) => {
  const {author, text, id} = req.body;
  const postData = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text
  };
  db.testimonials.push(postData);
  res.json(okMessage);
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text} = req.body;
  const editRecord = db.testimonials.find(item => item.id == `${req.params.id}`);
  editRecord.author = req.body.author,
  editRecord.text = req.body.text,
  res.json(okMessage);
});

app.delete('/testimonials/:id', (req, res) => {
  db.testimonials.splice(`${req.params.id}`-1, 1);
  res.json(okMessage);
});
/*
app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.post('/testimonials', (req, res) => {
  const {author, text, id} = req.body;
  const postData = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text
  };
  db.testimonials.push(postData);
  res.json(okMessage);
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text} = req.body;
  const editRecord = db.testimonials.find(item => item.id == `${req.params.id}`);
  editRecord.author = req.body.author,
  editRecord.text = req.body.text,
  res.json(okMessage);
});

app.delete('/testimonials/:id', (req, res) => {
  db.testimonials.splice(`${req.params.id}`-1, 1);
  res.json(okMessage);
});

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.post('/testimonials', (req, res) => {
  const {author, text, id} = req.body;
  const postData = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text
  };
  db.testimonials.push(postData);
  res.json(okMessage);
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text} = req.body;
  const editRecord = db.testimonials.find(item => item.id == `${req.params.id}`);
  editRecord.author = req.body.author,
  editRecord.text = req.body.text,
  res.json(okMessage);
});

app.delete('/testimonials/:id', (req, res) => {
  db.testimonials.splice(`${req.params.id}`-1, 1);
  res.json(okMessage);
});*/

app.use((req, res) => {
    res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});