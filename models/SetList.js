const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SetListSchema = new Schema(
  {
    slug: String,
    username: String,
    date: String,
    location: {
      venue: String,
      address: {
        street_number: Number,
        street: String,
        city: String,
        state: String,
        country: String,
        postal_code: Number
      },
      coords: {
        lng: Number,
        lat: Number
      },
      website:String,
      phone:String,
      placeId: String
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
