const mongoose = require('mongoose');
const FriendSchema = mongoose.Schema
const MessageSchema = './message-model'

const friend = new FriendSchema({
    user: {type: mongoose.Types.ObjectId, ref: 'User'},//or just have the username in string format
    outgoingMessages: [MessageSchema],
    incomingMessages: [MessageSchema]
})

module.exports = mongoose.model('Friend', friend);
