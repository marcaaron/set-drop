const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SetListSchema = new Schema(
  {
    username: String,
    date: {
      type:Date,
      default: Date.now
    },
    location: {
      venue: String,
      address: {
        address_line: String,
        city: String,
        state: String,
        country: String,
        postal_code: Number
      },
      coords: {
        lng: Number,
        lat: Number
      }
    },
    list: [
      {
        artist: {
          name: String,
          local_url: {type:String, default: 'http://example.com'},
          ext_url: {type:String, default:'http://example.com'}
        },
        title: {
          name: String,
          local_url: {type:String, default: 'http://example.com'},
          ext_url: {type:String, default:'http://example.com'}
        },
        genre: String
      }
    ]
  }
);

module.exports = mongoose.model('SetList', SetListSchema);
