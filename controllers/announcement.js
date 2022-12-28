const Announcement = require("../models/announcement");
const Student = require("../models/student");

const getAllAnnouncementByEmail = (req, res, next) => {
    Announcement.find({offereremail : req.query.email}, (err, data) => {
        if(err || !data) return res.status(404).json({message : "NOT OK"});
        return res.status(200).json(data);
    })
}

const newAnnouncement = (req, res, next) => {
    var hour1 = req.body.hour1;
    var hour2 = req.body.hour2;
    var minutes1 = req.body.minutes1;
    var minutes2 = req.body.minutes2;
    var day = req.body.day;
    var month = req.body.month;
    var year = req.body.year;
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
    Announcement.findOne({typeofwork : req.body.typeofwork, offereremail : req.body.offereremail}, (err, data) => {
        if(!data){
            const newAnnouncement = new Announcement({
                typeofwork : req.body.typeofwork,
                city : req.body.city,
                date : {
                    day : req.body.day,
                    month : req.body.month,
                    year : req.body.year
                },
                starttime : {
                    hour : req.body.hour1,
                    minutes : req.body.minutes1
                },
                endttime : {
                    hour : req.body.hour2,
                    minutes : req.body.minutes2
                },
                typeofpayment : req.body.typeofpayment,
                description : req.body.description,
                offereremail : req.body.offereremail
            })
            newAnnouncement.save((err, data) => {
                if(err || !data) return res.status(404).json({message : "NOT OK"});
                return res.status(200).json({message : "OK"});
            })
        }else{
            if(err || !data) return res.json({message : "NOT OK"});
            return res.json({message : "NOT OK"});
        }
    })
};


const deleteAllAnnouncementByEmail = (req, res, next) => {
    Announcement.deleteMany({offereremail : req.query.email}, (err, data) => {
        if(err) return res.status(404).json({message : "NOT OK"});
        return res.status(200).json({message : "OK"});
    })
};


const getOneAnnouncement = (req, res, next) => {
    let typeofwork = req.query.typeofwork;
    let email = req.query.email;

    Announcement.findOne({typeofwork : typeofwork, offereremail : email}, (err, data) => {
        if(err || !data) return res.json({message : "Announcement doesn't exist"});
        return res.json(data);
    })
};

const printSetOfCandidates = (req, res, next) => {
    let typeofwork = req.query.typeofwork;
    let email = req.query.email;

    Announcement.findOne({typeofwork : typeofwork, offereremail : email}, (err, data) => {
        if(err || !data) return res.json({message : "Announcement doesn't exist"});
        return res.json(data.candidates);
    })
}

const addCandidate = (req, res, next) => {
    let typeofwork = req.query.typeofwork;

    let email = req.query.email;

    Student.findOne({email : email}, (err, data) => {
        if(err || !data) return res.json({message : "Student doesn't exist"});
    })

    Announcement.findOne({typeofwork : typeofwork, offereremail : email}, (err, data) => {
        if(err || !data) return res.json({message : "Announcement doesn't exist"});
        data.candidates.push({emailcandidate : email});
        data.save();
        return res.json(data);
    })
}

module.exports = {
    getAllAnnouncementByEmail,
    newAnnouncement, 
    deleteAllAnnouncementByEmail,
    getOneAnnouncement,
    printSetOfCandidates,
    addCandidate
};