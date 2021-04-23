const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const okMessage = {message: 'OK!'};

router.route('/concerts').get ((req, res) => {
  res.json(db.concerts);
});
  
router.route('/concerts/:id').get ((req, res) => {
  res.json(db.concerts[`${req.params.id}`-1]);
});
  
router.route('/concerts').post ((req, res) => {
  const {performer, genre, price, day, image} = req.body;
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
  
router.route('/concerts/:id').put ((req, res) => {
  const {performer, genre, price, day, image} = req.body;
  const editRecord = db.concerts.find(item => item.id == `${req.params.id}`);
  editRecord.performer = req.body.performer,
  editRecord.genre = req.body.genre,
  editRecord.price = req.body.price,
  editRecord.day = req.body.day,
  editRecord.image = req.body.image
  res.json(okMessage);
});
  
router.route('/concerts/:id').delete ((req, res) => {
  db.concerts.splice(`${req.params.id}`-1, 1);
  res.json(okMessage);
});

module.exports = router;