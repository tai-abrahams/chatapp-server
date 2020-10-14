const mongoose = require('mongoose')
const UserSchema = mongoose.Schema
const FriendSchema = './friend-model'
const mongooseUniqueValidator = require('mongoose-unique-validator')

const bcrypt = require('bcrypt')
const Friend = require('./friend-model')

const user = new UserSchema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, require: true, unique: true, trim: true }, 
    password: { type: String, required: true },
    friends: [FriendSchema]
},
{ timestamps: true }
)

user.plugin(mongooseUniqueValidator)

user.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

const User =  mongoose.model('User', user) 

module.exports = User
