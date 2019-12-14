const mongoose = require('mongoose');
const Module = require('module');
const fs = require('fs')


const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        max :255,
        min:10
    },
    name: {
        type: String,
        required:true,
        max : 225,
        min:3,

    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1024
    },
    age: {
        type:Number,
        required: true   
    },
    Date:{
        type: Date,
        default: Date.now
    },
    Score:{
        type: Number,
        required:true,
        default: 1500
    },
    permissionLevel:{
        type:Number,
        required: true,
        default: 0
    },
    voteAverage:{
        type:Number,
        required:true,
        default:0
    },
    userImage:{ type : String, required: false, default: null
    },
    sexe:{
        required:true,
        type:String
    }

});

module.exports = mongoose.model('Users', userSchema);