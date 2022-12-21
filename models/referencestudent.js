const mongoose = require("mongoose");

const referencestudentSchema = new mongoose.Schema({
    vote : {type : Number, required : true},
    review : {type : String},
    offereremail : {type : String, required : true},
    studentemail : {type : String, required : true}
});

const Referencestudent = mongoose.model('Referencestudent', referencestudentSchema);
module.exports = Referencestudent;