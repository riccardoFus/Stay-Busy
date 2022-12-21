const mongoose = require("mongoose");

const referenceoffererSchema = new mongoose.Schema({
    vote : {type : Number, required : true},
    review : {type : String},
    studentemail : {type : String, required : true},
    offereremail : {type : String, required : true}
});

const Referenceofferer = mongoose.model('Referenceofferer', referenceoffererSchema);
module.exports = Referenceofferer;