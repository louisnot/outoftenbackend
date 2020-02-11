const express = require('express');
const router = express.Router();
const fs = require('fs')
const Users = require('../models/Users');
const { registerValidation, editValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path')
const verify = require('../tokenverification/verifyToken')


const storage = multer.diskStorage({
    destination : function(req, file, cb ){
        cb(null,'./uploads/');
    },
    filename : function(req,file,cb){
        cb(null, Date.now() + file.originalname);
    }
})
const upload = multer({ storage : storage,
    //filer only valide file == image
fileFilter: function(req,file,cb){
    let ext = path.extname(file.originalname);
    if(ext != '.png' && ext != '.jpg' && ext !='jpeg'){
        return cb('Only images are allowed ')
    }
    cb(null, true)
},
    limits:{fieldSize: 25*1024*1024}
})
// GET BACK ALL THE users
router.get('/users', async (req,res) => {
    try{
        const user = await Users.find();
        res.json(user);
    }catch(err){
        res.json({message: err})
    }
});


// route for photo TEST
router.post('/uploads/:userId',upload.single('photo'), async (req,res)=> {
    
    console.log('file',req.file);
    console.log(req.params.userId,req.body)
    const photoUpdate = await Users.updateOne(
        {_id : req.params.userId},
        {$set : {userImage : req.file.path, imageCaterogy : req.body}}
    )
    res.status(200).send(req.file)
});

router.post('/cat/:userId',async(req,res)=>{
    console.log(req.body)
    const catUpdate = await Users.updateOne(
        {_id:req.params.userId},
        {$set : { imageCategory : req.body.imageCategory}}
    )
    res.status(200).send(catUpdate)
})

// CREATE AN ACCOUNT
router.post('/register',async (req,res)=>{
    const {error} = registerValidation(req.body);
    console.log("le body",req.body)
    if (error) return res.status(400).json(error.details[0].message);
    //Check if user is already registered with email
    const emailExist = await Users.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send("Email is already registered")
    // HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
     const user = new Users({
        email : req.body.email,
        password : hashedPassword,
        name : req.body.name,
        age : req.body.age,
        //userImage: req.file.path
    });
    try{
   const savedUser = await user.save();
   res.json({user : user._id});
   

    } catch(err){
        res.status(400).send(err);
        console.log("non ca marche pas")
    }
});

// Function to update the profil pic after registration to default


// GET A SPECIFIC USER WITH ID

router.get('/privacy', async(req,res) =>{
    res.redirect('https://www.privacypolicygenerator.info/live.php?token=vx2u7OnoAjOEMRwFQ8UwXRuCca4wPjmD')
})

router.get('/:userId',verify, async (req,res)=>{
    try{
    const user = await Users.findById(req.params.userId);
    res.json(user);
    }catch(err){
        res.json(err)
    }
});


// Delete a user with a SPECIFIC ID
// A sécuriser
router.delete('/:userId', async (req,res)=>{
    try{
    const removedUser = await Users.deleteOne({_id : req.params.userId})
    res.json(removedUser);
    } catch(err){
        res.json(err)
    }
});

// Update a USER PROFILE NAME UPDATE
router.patch('/:userId', async(req,res)=>{
    // Validation updating info
    const {error} = editValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message) // Bad request 
    try{
    const userUpdate = await Users.updateOne(
        { _id: req.params.userId },
        { $set: { age : req.body.age, name : req.body.name, email:req.body.email } 
        });
        res.json(userUpdate);
    }catch(err){
        res.json(err)
    }

});


module.exports = router;