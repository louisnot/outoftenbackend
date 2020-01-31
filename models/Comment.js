const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    idUser:{ //Id of user that message is delivered too
        type: String,
        require: true
    },
    messageContent:{ // Message written
        type:String,
        require : true,
    },

})


module.exports = mongoose.model('Comment', commentSchema)