const express = require('express');
const app = express();
const router = express.Router();

const SetList = require('../models/SetList');

// CREATE
router.route('/add').post(function (req, res) {
    const set = new SetList(req.body);
    set.save()
      .then(set => {
      res.status(200).json({'set': 'Set added successfully'});
      })
      .catch(err => {
      res.status(400).send("unable to save the set into database");
      });
  });

// READ
router.route('/').get(function (req, res) {
  SetList.find(function (err, setlists){
    if(err){
      console.log(err);
    }
    else {
      console.log(res);
      return res.json(setlists);
    }
  });
});

// UPDATE
router.route('/update/:id').post(function (req, res) {
  SetList.findById(req.params.id, function(err, set) {
    if (!set){
      return next(new Error('Could not load Document'));
    }
    else {
      console.log('Set Found');
      console.log(set);

      // Edit set params via the front-end req body ajax
      // set.location = ...
      // set.setlist = ...
      // etc ...

      set.save().then(set => {
          res.json('Successfully Updated');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// DELETE
router.route('/delete/:id').get(function (req, res) {
    SetList.findByIdAndRemove({_id: req.params.id}, function(err, set){
          if(err) res.json(err);
          else res.json('Successfully removed');
      });
});


module.exports = router;
