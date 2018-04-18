const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sets = new Schema({
  date:{
    type: String
  },
  location:{
    type: Array
  },
  set:{
    type: Array
  }
},{
  collection: 'public'
});

module.exports = mongoose.model('Sets', Sets);
