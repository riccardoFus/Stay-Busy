const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
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
    frequencytype: {
        type: String,
        enum : ["ogni giorno","ogni settimana","ogni mese", "ogni anno", ""]
    },
    studentemail : {type : String, required : true}
});

const Availability = mongoose.model('Availability', availabilitySchema);
module.exports = Availability;