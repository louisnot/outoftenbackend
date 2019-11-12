const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    email:{
        type: String,
        require: true
    },
    admin:{
        type:Boolean,
        require : true,
        default : true
    },

})


module.exports = mongoose.model('Admin', adminSchema)