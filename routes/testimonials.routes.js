const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

const okMessage = {message: 'OK!'};

router.route('/testimonials').get ((req, res) => {
  res.json(db.testimonials);
});
  
router.route('/testimonials/:id').get ((req, res) => {
  res.json(db.testimonials[`${req.params.id}`-1]);
});
  
router.route('/random').get ((req, res) => {
  const template = db.testimonials[Math.floor(Math.random() * db.length)];
  res.json(template);
});
  
router.route('/testimonials').post ((req, res) => {
  const {author, text, id} = req.body;
  const postData = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text
  };
  db.testimonials.push(postData);
  res.json(okMessage);
});
  
router.route('/testimonials/:id').put ((req, res) => {
  const { author, text} = req.body;
  const editRecord = db.testimonials.find(item => item.id == `${req.params.id}`);
  editRecord.author = req.body.author,
  editRecord.text = req.body.text,
  res.json(okMessage);
});
  
router.route('/testimonials/:id').delete ((req, res) => {
  db.testimonials.splice(`${req.params.id}`-1, 1);
  res.json(okMessage);
});

module.exports = router;