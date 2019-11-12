// modules
const router = require('express').Router();
const { loginValidation } = require('../validation');
const  Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    if(!user) return res.status(400).send("Email is not registered or password is wrong");
    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Password wrong");
    // Create and Assing login token
    const token = jwt.sign({_id : user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token);
});


// logout
router.post('/logout', async(req,res) => {
    res.send("Succesfully logged out")
})




module.exports = router;