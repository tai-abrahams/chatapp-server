const User = require('../models/credentials-model.js')
const Friend = require('../models/friend-model.js')
const mongoose = require('mongoose')

const getSearchedUser = async (req, res)=>{

    const searchedUser = req.body.query
    console.log(searchedUser)
    const reg = new RegExp(`\\b${searchedUser}`)//regex, the \\ escapes the special character 'b', so adds a backslash in front of the special character. Here ive escaped the first \b
   
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


/*const getUsers = async (req, res)=>{

    const searchedUser = req.body.query
    const reg = new RegExp(`\\b${searchedUser}`)//regex, the \\ escapes the special character 'b', so adds a backslash in front of the special character. Here ive escaped the first \b
   
    await User.find({username: {$regex:reg}}, {username:1}, (err, result)=>{
        if(result.length>=1){
            res.status(200).json({
                foundUsers: result,
                success: true
            })
            console.log(result.length)
        }

        if(result.length<1){

           res.status(404).json({
              foundUsers: null,
              success: true,
              err: 'No users found'
           })
        }

    }).catch((err)=>{  
        console.log(err)

    })

} */

//UNFINISHED
const addFriend = async (req, res)=>{
    //const friend= req.body //bbody should contain both username and user id
   
    const newFriend = new Friend({
        user: req.body.addUser._id,
        
    })
    //console.log(req.body)
    //getloggedUser from state send to node save in variable
    const loggedUserID= req.body.loggedUserID



    //in findOne, maybe try to search for addedUser within friends bracket


// await User.find({ username:"peter"}, {$unwind: "$friends"}, {friends: 1}, (err, friend)=>{
//     console.log("hi" + friend.length)
// })


   // await User.aggregate([{$match:{username:"insta"}}, {$unwind: "$friends"}, {$unwind: "$friends.user"}, {$match: {"friends.user":mongoose.Types.ObjectId("")}}], (err, friends)=>{
    //     const friend= new Friend()
    //     friend.user = mongoose.Types.ObjectId("5f1ffb60d7c2a51c50b7b129")
    //     friend.save()
    //  })

await User.updateOne({username: "insta"}, {$unwind: "$friends"}, {$push: {"$friends.user":mongoose.Types.ObjectId("5f22297a5c7b4828440ba816      ")}}, (err, friend)=>{
console.log(friend)
})
    
}


module.exports={
    getSearchedUser,
    //getUsers,
    addFriend
}
