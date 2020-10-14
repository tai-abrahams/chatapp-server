const mongoose = require('mongoose')

mongoose
    .connect(process.env.MONGODB_URL, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .catch(e=>{
        console.error('Connection Error:', e.message)
    })

const db = mongoose.connection

module.exports = db
