// import modules
const express =require('express');
const Joi = require('@hapi/joi');
const app = express()
const https = require('https');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const Users = require('./models/Users');
const cors = require('cors');
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

const privateKey = fs.readFileSync('/etc/letsencrypt/live/outoften.fr/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/outoften.fr/fullchain.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/outoften.fr/chain.pem', 'utf8');


const httpsOptions = {
  key : privateKey,
  cert : certificate,
  ca : ca
}
https.createServer(httpsOptions,app).listen(443)

http.createServer(app).listen(80)

//reset historyVote every day
setInterval(()=>resetHistory(), 432000)

async function resetHistory(){
  try{
      const user =  await Users.updateMany(
            {$set : { "historyVote" : [] }}
      );
      console.log("good")
  }catch(err){
      res.json({message: err})
      console.log(err)
  }
}

app.get('/', (req,res)=> {
  res.send("Welcome to the Out of Ten API!")
})


