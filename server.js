const express = require('express');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

const okMessage = {message: 'OK!'};

const v4options = {
  random: [1, 2, 3, 4, 5]
};

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db[`${req.params.id}`-1]);
});

app.get('/testimonials/random', (req, res) => {
  const template = db[Math.floor(Math.random() * db.length)];
  res.json(template);
});

app.post('/testimonials', (req, res) => {
  const {author, text, id} = req.body;
  const postData = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text
  };
  db.push(postData);
  res.json(okMessage);
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text} = req.body;
  const editRecord = db.find(item => item.id == `${req.params.id}`);
  editRecord.author = req.body.author,
  editRecord.text = req.body.text,
  res.json(okMessage);
});

app.delete('/testimonials/:id', (req, res) => {
  db.splice(`${req.params.id}`-1, 1);
  res.json(okMessage);
})

app.use((req, res) => {
    res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});