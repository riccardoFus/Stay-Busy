const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
    typeofwork : {type : String, required : true},
    city : {type : String, required : true},
    date : {
        day : {type : Number, required : true},
        month : {type : Number, required : true},
        year : {type : Number, required : true}
    },
    starttime : {
        hour : {type : Number, required : true},
        minutes : {type : Number, required : true}
    },
    endttime : {
        hour : {type : Number, required : true},
        minutes : {type : Number, required : true}
    },
    typeofpayment: {
        type: String,
        enum : ["contanti","paypal"]
    },
    description : String, 
    candidates : [{
                emailcandidate : {type : String},
                outcometype: {
                    type: String,
                    enum : ["accettato","respinto","in attesa"],
                    default: "in attesa"
                }
                }],
    offereremail : {type : String, required : true},
    workerstudent : String
});

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;