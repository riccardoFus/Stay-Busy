const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name : {type : String, required : true},
    surname : {type : String, required : true},
    email : {type : String, required : true},
    city : {type : String, required : true},
    idtelegram : String, 
    confirmedaccount : {type : Boolean, default : false},
    university : {
        nameuni : {type : String, required : true},
        cityuni : {type : String, required : true},
        regionuni : {type : String, required : true}
    },
    countdoneservices : {type : Number, default : 0},
    countdeclinedservices : {type : Number, default : 0},
    countdeclinedservicesbefore24h : {type : Number, default : 0},
    averagevotes : {type : Number, default : 0},
    servicetodo : [String],
    servicecandidate : [String],
    servicecronology : [String],
    description : String
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;