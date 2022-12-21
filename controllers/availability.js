const Availability = require("../models/availability");

const getAllAvailability = (req, res, next) => {
    Availability.find({}, (err, data) => {
        if(err) return res.json({Error : err});
        return res.json(data);
    })
};

const newAvailability = (req, res, next) => {
    var hour1 = req.body.hour1;
    var hour2 = req.body.hour2;
    var minutes1 = req.body.minutes1;
    var minutes2 = req.body.minutes2;
    var day = req.body.day;
    var month = req.body.month;
    var year = req.body.year;
    var email = req.body.email;
    if(hour1 < 0 || hour1 > 23){
        return res.json({message : "Wrong hour start time inserted"});
    }
    if(hour2 < 0 || hour2 > 23){
        return res.json({message : "Wrong hour end time inserted"});
    }
    if(minutes1 < 0 || minutes1 > 59){
        return res.json({message : "Wrong minute start time inserted"});
    }
    if(minutes2 < 0 || minutes2 > 59){
        return res.json({message : "Wrong hour end time inserted"});
    }
    if(hour1 > hour2){
        return res.json({message : "Wrong hours inserted"});
    }else if(hour1 == hour2 && minutes1 > minutes2){
        return res.json({message : "Wrong minutes inserted"});
    }
    if(year < 1850){
        return res.json({message : "Wrong year inserted"});
    }
    if(month < 1 || month > 12){
        return res.json({message : "Wrong month inserted"});
    }
    if(day < 1 || day > 31){
        return res.json({message : "Wrong day inserted"});
    }
    Availability.findOne({
        'date.day' : day,
        'date.month' : month,
        'date.year' : year,
        'starttime.hour' : hour1,
        'starttime.minutes' : minutes1,
        'endttime.hour' : hour2,
        'endttime.minutes' : minutes2,
        studentemail : email
    }, 
                          (err, data) => {
        if(!data){
            const newAvailability = new Availability({
                date : {
                    day : day,
                    month : month,
                    year : year
                },
                starttime : {
                    hour : hour1,
                    minutes : minutes1
                },
                endttime : {
                    hour : hour2,
                    minutes : minutes2
                },
                frequencytype : req.body.frequencytype,
                studentemail : email
            })
            newAvailability.save((err, data) => {
                if(err) return res.json({Error : err});
                return res.json(data);
            })
        }else{
            if(err) return res.json("Something went wrong, please try again: " + err);
            return res.json({message: "Availability already exists"});
        }
    })
};


const deleteAllAvailability = (req, res, next) => {
    Availability.deleteMany({}, (err, data) => {
        if(err) return res.json({message : "Complete delete failed"});
        return res.json({message : "Complete delete successful"});
    })
};


const getOneAvailability = (req, res, next) => {
    var id = req.query.id;

    Availability.findOne({_id : id}, (err, data) => {
        if(err || !data) return res.json({message : "Availability doesn't exist"});
        return res.json(data);
    })
};


const deleteOneAvailability = (req, res, next) => {
    var id = req.query.id;

    Availability.deleteOne({_id : id}, (err, data) => {
        if(err || !data) return res.json({message : "Availability doesn't exist"});
        return res.json(data);
    })
};

const setDate = (req, res, next) => {
    let id = req.query.id;

    var day = req.body.day;
    var month = req.body.month;
    var year = req.body.year;
    if(year < 1850){
        return res.json({message : "Wrong year inserted"});
    }
    if(month < 1 || month > 12){
        return res.json({message : "Wrong month inserted"});
    }
    if(day < 1 || day > 31){
        return res.json({message : "Wrong day inserted"});
    }

    Availability.findOneAndUpdate({_id : id}, {
        date : {
            day : day,
            month : month,
            year : year
        }
    }, {new: true}, function(err, response) {
    if (err) {
        return res.json({message : "Availability doesn't exist"});
    } else {
        return res.json(response);
    }});
}

const setStartTime = (req, res, next) => {
    let id = req.query.id;

    var hour = req.body.hour;
    var minutes = req.body.minutes;


    if(hour < 0 || hour > 23){
        return res.json({message : "Wrong hour start time inserted"});
    }
    if(minutes < 0 || minutes > 59){
        return res.json({message : "Wrong minute start time inserted"});
    }
    Availability.findOneAndUpdate({_id : id}, {
        starttime : {
            hour : hour,
            minutes : minutes
        }
    }, {new: true}, function(err, response) {
    if (err) {
        return res.json({message : "Availability doesn't exist"});
    } else {
        return res.json(response);
    }});
}

const setEndTime = (req, res, next) => {
    let id = req.query.id;

    var hour = req.body.hour;
    var minutes = req.body.minutes;


    if(hour < 0 || hour > 23){
        return res.json({message : "Wrong hour end time inserted"});
    }
    if(minutes < 0 || minutes > 59){
        return res.json({message : "Wrong minute end time inserted"});
    }
    Availability.findOneAndUpdate({_id : id}, {
        endttime : {
            hour : hour,
            minutes : minutes
        }
    }, {new: true}, function(err, response) {
    if (err) {
        return res.json({message : "Availability doesn't exist"});
    } else {
        return res.json(response);
    }});
}

const setFrequency = (req, res, next) => {
    let id = req.query.id;

    var frequency = req.query.frequency;
    if(frequency != "ogni giorno" ||
    frequency != "ogni settimana" ||
    frequency != "ogni mese" ||
    frequency != "ogni anno" ||
    frequency != ""){
        return res.json({message : "Wrong frequency inserted"});
    }

    Availability.findOneAndUpdate({_id : id}, {
        frequencytype : frequency
    }, {new: true}, function(err, response) {
    if (err) {
        return res.json({message : "Availability doesn't exist"});
    } else {
        return res.json(response);
    }});
}

const changeAvailability = (req, res, next) => {
    let id = req.query.id;

    var hour1 = req.query.hour1;
    var hour2 = req.query.hour2;
    var minutes1 = req.query.minutes1;
    var minutes2 = req.query.minutes2;
    var day = req.query.day;
    var month = req.query.month;
    var year = req.query.year;
    var frequency = req.query.frequency;
    if(hour1 < 0 || hour1 > 23){
        return res.json({message : "Wrong hour start time inserted"});
    }
    if(hour2 < 0 || hour2 > 23){
        return res.json({message : "Wrong hour end time inserted"});
    }
    if(minutes1 < 0 || minutes1 > 59){
        return res.json({message : "Wrong minute start time inserted"});
    }
    if(minutes2 < 0 || minutes2 > 59){
        return res.json({message : "Wrong hour end time inserted"});
    }
    if(hour1 > hour2){
        return res.json({message : "Wrong hours inserted"});
    }else if(hour1 == hour2 && minutes1 > minutes2){
        return res.json({message : "Wrong minutes inserted"});
    }
    if(year < 1850){
        return res.json({message : "Wrong year inserted"});
    }
    if(month < 1 || month > 12){
        return res.json({message : "Wrong month inserted"});
    }
    if(day < 1 || day > 31){
        return res.json({message : "Wrong day inserted"});
    }
    if(frequency != "ogni giorno" &&
    frequency != "ogni settimana" &&
    frequency != "ogni mese" &&
    frequency != "ogni anno" &&
    frequency != ""){
        return res.json({message : "Wrong frequency inserted"});
    }
    Availability.findOneAndUpdate({_id : id}, {
        date : {
            day : day,
            month : month,
            year : year
        },
        starttime : {
            hour : hour1,
            minutes : minutes1
        },
        endttime : {
            hour : hour2,
            minutes : minutes2
        },
        frequencytype : frequency
    }, {new: true}, function(err, response) {
    if (err) {
        return res.json({message : "Availability doesn't exist"});
    } else {
        return res.json(response);
    }});
}

module.exports = {
    getAllAvailability,
    newAvailability, 
    deleteAllAvailability,
    getOneAvailability, 
    deleteOneAvailability,
    setDate,
    setStartTime,
    setEndTime,
    setFrequency,
    changeAvailability
};