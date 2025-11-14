//import dtenv file
const dotenv = require('dotenv')
dotenv.config()//load envirnment variables


//import express library
const express = require('express')

//import cors
const cors = require('cors')
//import route
const route = require('./routes')

//import db connection file
require('./databaseconnection')


//create the server using express ()
const amountServer = express()

//server using cors
amountServer.use(cors())

//parse json data from frontend.its middleware(it break request response cycle).
amountServer.use(express.json())
amountServer.use(route)
amountServer.use('/serverupload',express.static('./uploads'))

//port creation
PORT = 5000 || process.env.PORT

amountServer.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
})
