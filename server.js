const express = require('express');

const db = require('./db');

const cors = require('cors');

const app = express();

const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const testRoutes = require('./routes/testimonials.routes');

app.use(cors())
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/', concertsRoutes);
app.use('/', seatsRoutes);
app.use('/', testRoutes);

app.use((req, res) => {
    res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});