const User = require('../models/credentials-model.js')
const Friend = require('../models/friend-model.js')
const mongoose = require('mongoose')

const getSearchedUser = async (req, res)=>{

    const searchedUser = req.body.query
    console.log(searchedUser)
    const reg = new RegExp(`\\b${searchedUser}`)
   
    await User.find({username: {$regex:reg}}, {_id:1, username:1}, (err, result)=>{
        console.log(reg)
        console.log(req.body)
        if(result){
            return res.status(200).json({
                foundUsers: result,
                success: true
            })
            
        }

        if(!result){

           res.status(404).json({
              foundUsers: null,
              success: true,
              err: 'No users found'
           })
        }

        console.log(result)

    }).catch((err)=>{  
        console.log(err)

    })

}




//UNFINISHED
const addFriend = async (req, res)=>{
    //const friend= req.body //bbody should contain both username and user id
   
    const newFriend = new Friend({
        user: req.body.addUser._id,
        
    })
    //console.log(req.body)
    //getloggedUser from state send to node save in variable
    const loggedUserID= req.body.loggedUserID




await User.updateOne({username: "insta"}, {$unwind: "$friends"}, {$push: {"$friends.user":mongoose.Types.ObjectId("5f22297a5c7b4828440ba816      ")}}, (err, friend)=>{
console.log(friend)
})
    
}


module.exports={
    getSearchedUser,
    //getUsers,
    addFriend
}
