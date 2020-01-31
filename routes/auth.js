// modules
const router = require('express').Router();
const { loginValidation } = require('../validation');
const  Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const verify = require('../tokenverification/verifyToken')
const jwt = require('jsonwebtoken');
const {voteValidation} = require('../validation')
const Comment = require('../models/Comment')
// LOGIN

router.get('/log', (req,res)=>{
    res.send("Welcome Home")
})

// Login
router.post('/login', async (req,res)=>{
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message); // 400 =bad request
    // Check if the account exist
    const user = await Users.findOne({email: req.body.email});
    if(!user) return res.status(401).send("Email is not registered or password is wrong");
    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(402).send("Password wrong");
    // Create and Assing login token
    const token = jwt.sign({_id : user._id, admin : user.permissionLevel}, process.env.TOKEN_SECRET)
    res.header('authorization', token).send(token);
});

// vote


router.post('/vote',verify, async(req,res)=>{
    // Validation updating info
    console.log(req.body)
    //const {error} = voteValidation(req.body);
    //if(error) return res.status(400).send(error.details[0].message) // Bad request 
    try{
    const userUpdate = await Users.updateOne(
        { _id: req.body.userId },
        { $set: { Score : req.body.Score} 
        });
        res.json(userUpdate);
    }catch(err){
        res.json(err)
    }

});

// Get comment for users
router.post('/comment', async(req,res) =>{
    const Userexist = await Users.findOne({_id: req.body.idUser})
    if(!Userexist) return res.status(400).send('invalid request');
    const message = new Comment({
        idUser : req.body.idUser,
        messageContent : req.body.message
    });
    try{
        savedReport = message.save()
        res.json({user : message.messageContent})
    }
    catch(err){
        res.json(err)
    }
})

// Post comment for users
router.get('/commentlist/:idUser' , async(req,res) =>{
    const Userexist = await Users.findOne({_id:req.params.idUser})
    if(!Userexist)  return res.status(400).send('User does not exist')
    try{
        commentUser = await Comment.find({idUser : req.params.idUser})
        res.json(commentUser)
    }
    catch(err){
        res.json(err)
    }

})






module.exports = router;