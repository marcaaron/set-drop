const express = require('express');
const app = express();
const router = express.Router();

const Course = require('../models/Sets');

router.route('/add').post(function (req, res) {
    const set = new Sets(req.body);
    set.save()
      .then(set => {
      res.status(200).json({'set': 'Set added successfully'});
      })
      .catch(err => {
      res.status(400).send("unable to save the set into database");
      });
  });

module.exports = router;
