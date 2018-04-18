require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const MONGO_URI = process.env.MONGO_URI;
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

app.use('/', express.static(`${__dirname}/client/build`));

app.get('/api/', (req, res) => {
  res.json();
});

MongoClient.connect(MONGO_URI, function (err, db) {
  console.log(MONGO_URI);
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', MONGO_URI);
    // do some work here with the database.

    //Close connection
    db.close();
  }
});


app.listen(port, () => console.log(`Listening on port ${port}`));
