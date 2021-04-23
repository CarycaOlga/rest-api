const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const okMessage = {message: 'OK!'};

router.route('/seats').get ((req, res) => {
  res.json(db.seats);
});
  
router.route('/seats/:id').get ((req, res) => {
  res.json(db.seats[`${req.params.id}`-1]);
});
  
router.route('/seats').post ((req, res) => {
  const {day, seat, client, email, id} = req.body;
  const postData = {
    id: uuidv4(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email
  };
  db.seats.push(postData);
  res.json(okMessage);
});
  
router.route('/seats/:id').put ((req, res) => {
  const {day, seat, client, email, id} = req.body;
  const editRecord = db.seats.find(item => item.id == `${req.params.id}`);
  editRecord.day = req.body.day,
  editRecord.seat = req.body.seat,
  editRecord.client = req.body.client,
  editRecord.email = req.body.email
  res.json(okMessage);
});
  
router.route('/seats/:id').delete ((req, res) => {
  db.seats.splice(`${req.params.id}`-1, 1);
  res.json(okMessage);
});

module.exports = router;