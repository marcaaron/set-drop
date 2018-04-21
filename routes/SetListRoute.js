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
      return res.json(setlists);
    }
  });
});

//GET BY ID
router.route('/edit/:id').get(function (req, res) {
  SetList.findById(req.params.id, function (err, setlists)
  {
    if(err){
      console.log(err);
    }
    else {
      console.log('Set Located');
      return res.json(setlists);
    }
  });
});

// UPDATE
router.route('/update/:id').put(function (req, res) {
  SetList.findByIdAndUpdate(req.params.id,{$set:req.body})
    .then(set=> {
      res.status(200).json({'set': 'Set updated successfully'});
    }).catch(err => {
      res.status(400).send('unable to update set');
    });
});

// DELETE
router.route('/delete/:id').get(function (req, res) {
    SetList.findByIdAndRemove({_id: req.params.id}, function(err, set){
          if(err) res.json(err);
          else res.json('Successfully removed');
      });
});

// RETURN SETS FOR GIVEN USER
router.route('/:username').get(function (req, res) {
  SetList.find({username:`${req.params.username}`},function (err, setlists){
    if(err){
      console.log(err);
    }
    else {
      console.log(`located ${req.params.username}`);
      // console.log(res);
      return res.json(setlists);
    }
  });
});


module.exports = router;
