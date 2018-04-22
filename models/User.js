const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {type:String, default:'Anonymous'},
    description: {type: String, default: 'Enter a description...'},
    location: {
      city: {type: String, default: 'Enter City...'},
      state: {type: String, default: 'Enter State...'},
      country: {type: String, default: 'Enter Country...'}
    },
    avatar: {type: String, default:'https://placeimg.com/100/100/people'},
    links: {
      twitter: {type:String, default:'http://twitter.com/'},
      soundcloud: {type:String, default:'http://soundcloud.com/'},
      instagram: {type:String, default:'http://instagram.com/'}
    },
    following:{type:Array, default: []}
  }
);

module.exports = mongoose.model('User', UserSchema);
