// modules
const router = require('express').Router();
const Users = require('../models/Users');
const Reported = require('../models/Reported');
const verify = require('../tokenverification/verifyToken');
const jwt = require('jsonwebtoken');




router.get('/reports' , async(req,res)=>{
    try{
        const reported = await Reported.find();
        res.json(reported)
    }
    catch(err){
        res.json(err)
    }
})


router.post('/submit/:idUser',verify, async (req,res)=>{
    const UserExist = await Users.findOne({_id:req.params.idUser});
    if(!UserExist) return res.status(400).send("User does not exist!")
    const report = new Reported({
        idReporter : req.params.idUser,
        idReportedUser : req.body._id
    });
    try{
        savedReport = report.save()
        res.json({user : report.idReportedUser})
    }
    catch(err){
        res.json(err)
    }
})


module.exports = router;