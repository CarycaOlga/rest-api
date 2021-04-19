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

app.get('/concerts', (req, res) => {
  res.json(db.concerts);
});

app.get('/concerts/:id', (req, res) => {
  res.json(db.concerts[`${req.params.id}`-1]);
});

app.post('/concerts', (req, res) => {
  const {author, text, id} = req.body;
  const postData = {
    id: uuidv4(),
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image
  };
  db.concerts.push(postData);
  res.json(okMessage);
});

app.put('/concerts/:id', (req, res) => {
  const { author, text} = req.body;
  const editRecord = db.concerts.find(item => item.id == `${req.params.id}`);
  editRecord.performer = req.body.performer,
  editRecord.genre = req.body.genre,
  editRecord.price = req.body.price,
  editRecord.day = req.body.day,
  editRecord.image = req.body.image
  res.json(okMessage);
});

app.delete('/concerts/:id', (req, res) => {
  db.concerts.splice(`${req.params.id}`-1, 1);
  res.json(okMessage);
});

/*
app.get('/seats', (req, res) => {
  res.json(db.seats);
});

app.get('/seats/:id', (req, res) => {
  res.json(db.seats);
});

app.post('/seats', (req, res) => {
  const {author, text, id} = req.body;
  const postData = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text
  };
  db.seats.push(postData);
  res.json(okMessage);
});

app.put('/seats/:id', (req, res) => {
  const { author, text} = req.body;
  const editRecord = db.seats.find(item => item.id == `${req.params.id}`);
  editRecord.author = req.body.author,
  editRecord.text = req.body.text,
  res.json(okMessage);
});

app.delete('/seats/:id', (req, res) => {
  db.seats.splice(`${req.params.id}`-1, 1);
  res.json(okMessage);
});*/

app.use((req, res) => {
    res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});