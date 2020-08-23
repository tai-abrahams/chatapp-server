const express = require('express')
const app = express()
const env = require("dotenv").config(__dirname + '/.env')
const bodyParser = require('body-parser')
const db = require('./db')
const cors = require('cors')
const server = require('http').createServer(app)
const session = require('express-session')
//const socket = require('socket.io')
//const io = socket(server)
const credRouter = require('./routes/credential-router')
const friendsRouter = require("./routes/friends-router")
app.use(session({
    secret: 'potterpapes',
    resave: true,
    saveUninitialized: false
}));
// app.use((req, res, next)=>{
//     res.header('Access-Control-Allow-Origin', '*')
//     next()
// })

//app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//app.use(bodyParser.json())
app.use(credRouter)
app.use(friendsRouter)




db.on('error', ()=>{
    console.error.bind(console, 'MongoDB connection error:')
})

app.get('/', (req, res)=>{
    res.send('Hello World')
})



server.listen(process.env.PORT || 8080, function(err){
    if(err){throw err}
    console.log('listening onn', process.env.PORT)
})
// create a algorithm that will use maybe google maps or just show list of users that are closest to you from a databse of user locations
