const express = require('express')
const router = express.Router()
const userFriendsCtrl = require("../controllers/userFriends-ctrl")


router.post('/friend-add', userFriendsCtrl.getSearchedUser) //add friend to database, but should also grab the credentials by username from another database/table of existing users. Need a table of users worldwide. My user account will need a table of my own users that have been added
//router.get('/get-friends', userFriendsCtrl.getUsers)
router.post('/add-friend', userFriendsCtrl.addFriend)

module.exports = router