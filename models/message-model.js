const mongoose = require('mongoose');
const MessageSchema = mongoose.Schema

const message = new MessageSchema({
    //user: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    body: [{type: String, required: true}],
    image_url:{type: String, },
}, { timestamps: true , required: true}
)

module.exports = mongoose.model('Message', message);