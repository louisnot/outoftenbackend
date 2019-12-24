const router = require('express').Router();
const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const verify = require('../tokenverification/verifyToken')



router.get('/:userId', async (req,res)=>{
    try{
        const user = await Users.findOne(
            {_id : req.params.userId}
        )
        res.send(user)
    }
    catch(err){
        res.json(err)
    }
});


//+1 Current voteAverage
router.patch('/upvote/:userId', async (req,res) =>{
    try{
        const userVote = await Users.updateOne(
            {_id : req.params.userId},
            { $inc : {voteAverage: 1}
        });
        res.json(userVote);
    }catch(err){
        res.json(err)
    };
});

//-1 Current voteAverage
router.patch('/downvote/:userId', async (req,res)=>{
    try{
        const userVote = await Users.updateOne(
            {_id : req.params.userId},
            { $inc : { voteAverage: -1}
        });
        res.json(userVote);
    }catch(err){
        res.json(err)
    };
})

// Add user to history
router.patch('/historyvote/:userId', async(req,res)=>{
    console.log(req.body)
    try{
        const historyUser= await Users.updateOne(
            { _id : req.params.userId},
            {$push : {historyVote: req.body.userId}
        });
        res.json(historyUser)
    } catch(err){
        res.json(err)
    };
})

// Return all users from history aray of the specific user
router.get('/array/:userId',async(req,res)=>{
    try{
        const user = await Users.find(
            {_id: req.params.userId}, {historyVote : 1, _id : 0}
        );
        res.json(user)
    } catch(err){
        res.json(err)
    }
})

module.exports = router;