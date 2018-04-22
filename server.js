require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./db');
const SetList = require('./models/SetList');
const SetListRoute = require('./routes/SetListRoute');
const UsersRoute = require('./routes/UsersRoute');
const User = require('./models/User');

const cors = require('cors');

// Serve React Front-End to Root
app.use('/', express.static(`${__dirname}/client/build`));

// Enable Cors So React Dev Server Can Interact with API
app.use(cors());

// Connect to MongoDB
mongoose.connect(config.db).then(
  ()=>{console.log('Connected to MongoDB via Mongoose') },
  err => {console.log('There was an error connecting to the database')}
);

// Set Up API Post Route for Individual Set Lists
app.use(bodyParser.json());
app.use('/api/setlists', SetListRoute);
app.use('/api/users', UsersRoute);


app.listen(port, () => console.log(`Listening on port ${port}`));
