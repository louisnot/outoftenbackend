// import modules
const express =require('express');
const Joi = require('@hapi/joi');
const app =express()
const https = require('https');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs')

require('dotenv/config');


// Import Routes
const usersRoute = require('./routes/register');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post') // route de test
const voteRoute = require('./routes/vote');
const reportRoute = require('./routes/report');

//Middleware
app.use(cors())
app.use(express.json());
app.use('/uploads',express.static('uploads'))

// Routes
app.use('/api/new', usersRoute);
app.use('/api/home',authRoute);
app.use('/api/posts', postRoute);
app.use('/api/vote', voteRoute);
app.use('/api/report', reportRoute);


// Connect to DB 
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true },() =>{
  console.log("connected to DB")
});

// CREATE HTTPS SERVER
const httpsOptions= {
  cert : fs.readFileSync('cert.pem'),
  key : fs.readFileSync('key.pem')
}
/*
https.createServer(httpsOptions,app)
  .listen(5050,function(){
    console.log('Server secured running')
  })
*/

app.get('/', (req,res)=> {
  res.send("Welcome to the Out of Ten API!")
})


//PORT 

const PORT = process.env.PORT || 80;
app.listen(PORT, ()=>{
  console.log(`Now listening on ${PORT}`);
})