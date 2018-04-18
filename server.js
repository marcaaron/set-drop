require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./db');
const Sets = require('./models/Sets');
const SetsRoute = require('./routes/SetsRoute');

app.use('/', express.static(`${__dirname}/client/build`));

app.get('/api/get', (req, res, next)=>{
  console.log('Data Received');
  res.send('Data Received');
});

app.post('/api/post', (req, res, next)=>{
  console.log('Data Posted');
  res.send('Data Posted');
});

mongoose.connect(config.db)
.then(
  ()=>{console.log('Connected to MongoDB via Mongoose') },
  err => {console.log('There was an error connecting to the database')}
 );


app.listen(port, () => console.log(`Listening on port ${port}`));
