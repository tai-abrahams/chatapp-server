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



// user.pre('save', async function(){
//     //pre is middleware for mongoose. There are 4 types of middleware, document middleware being one. 'Save' is a document middleware function. So when using 'this' with a document middleware function such as 'save' or 'remove'. 'This' refers to the document.
//     //There are also query middleware functions, aggregate and model middleware functions.
//     const user = this; 
// //bcrypt.hash used to hash/encode the password for security reasons
  
//    async function hashPassword(user){
//        const password = user.password
//        const saltRounds = 10;

//        const hashedPassword = await new Promise((resolve, reject)=>{
//            bcrypt.hash(password, saltRounds, (err, hash)=>{
//                if(err) reject(err)
//                resolve(hash)
//            });
//        })
//        return hashedPassword
//    } 
// })