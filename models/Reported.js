const mongoose = require('mongoose');

const repoterSchema = mongoose.Schema({
    idReporter:{ //Id of user that issue the report
        type: String,
        require: true
    },
    idReportedUser:{ //Id of the user that is being reported
        type:String,
        require : true,
    },

})


module.exports = mongoose.model('Reported', repoterSchema)