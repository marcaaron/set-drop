const express = require('express');
const app = express();
const router = express.Router();

const User = require('../models/User');

// CREATE A NEW USER
router.route('/add').post(function (req, res) {
    const user = new User(req.body);
    user.save()
      .then(user => {
      res.status(200).json({'user': 'User added successfully'});
      })
      .catch(err => {
      res.status(400).send("unable to save the User into database");
      });
  });

// GET ALL USERS
router.route('/').get(function (req, res) {
  User.find(function (err, users){
    if(err){
      console.log(err);
    }
    else {
      return res.json(users);
    }
  });
});

//GET A USER BY USERNAME
router.route('/:username').get(function (req, res) {
  User.find({username:`${req.params.username}`}, function (err, users)
  {
    if(err){
      console.log(err);
    }
    else {
      console.log('User Located');
      return res.json(users);
    }
  });
});

// UPDATE
router.route('/update/:id').put(function (req, res) {
  User.findByIdAndUpdate(req.params.id,{$set:req.body})
    .then(user=> {
      res.status(200).json({'set': 'User updated successfully'});
    }).catch(err => {
      res.status(400).send('unable to update user');
    });
});

// DELETE
router.route('/delete/:id').get(function (req, res) {
    User.findByIdAndRemove({_id: req.params.id}, function(err, set){
          if(err) res.json(err);
          else res.json('Successfully removed');
      });
});

module.exports = router;
