const router = require('express').Router();
const Users = require('../models/Users');
const jwt = require('jsonwebtoken');



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



module.exports = router;