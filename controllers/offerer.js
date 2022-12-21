const Offerer = require("../models/offerer");
const Announcement = require("../models/announcement");
const deleteOneOfferer = (req, res, next) => {
    let email = req.query.email;

    Announcement.deleteMany({offereremail : email}, (err, data1) => {
    })

    Offerer.deleteOne({email : email}, (err, data) => {
        if(data.deletedCount === 0) return res.status(404).json({message : "NOT OK"});
        return res.status(200).json({message : "OK"});
    })
    
};

const getOneOfferer = (req, res, next) => {
    let email = req.query.email;

    Offerer.findOne({email : email}, (err, data) => {
        if(err || !data) return res.status(404).json({messagge : "Offerer doesn't exist"});
        return res.status(200).json(data);
    })
}

const setIdTelegram = (req, res, next) => {
    let email = req.query.email;

    Offerer.findOneAndUpdate({email : email}, {idtelegram : req.body.idtelegram}, {new: true}, function(err, response) {
    if (err || !response) {
        return res.status(404).json({message : "NOT OK"});
    } else {
        return res.status(200).json({message : "OK"});
    }});
}

const setDescription = (req, res, next) => {
    let email = req.query.email;

    Offerer.findOneAndUpdate({email : email}, {description : req.body.description}, {new: true}, function(err, response) {
    if (err || !response) {
        return res.status(404).json({message : "NOT OK"});
    } else {
        return res.status(200).json({message : "OK"});
    }});
}

const setName = (req, res, next) => {
    let email = req.query.email;

    Offerer.findOneAndUpdate({email : email}, {name : req.body.name}, {new: true}, function(err, response) {
    if (err || !response) {
        return res.status(404).json({message : "NOT OK"});
    } else {
        return res.status(200).json({message : "OK"});
    }});
}

const setSurname = (req, res, next) => {
    let email = req.query.email;

    Offerer.findOneAndUpdate({email : email}, {surname : req.body.surname}, {new: true}, function(err, response) {
    if (err || !response) {
        return res.status(404).json({message : "NOT OK"});
    } else {
        return res.status(200).json({message : "OK"});
    }});
}

const setPassword = (req, res, next) => {
    let email = req.query.email;
    let oldPassword = req.body.old;
    let newPassword = req.body.new;
    let newPasswordConfirm = req.body.newnew;

    if(newPassword !== newPasswordConfirm){
        return res.json({message : "Two new password are not equal"});
    }

    Offerer.findOneAndUpdate({email : email, password : oldPassword},{password : newPassword}, {new: true}, function(err, response) {
        if (err || !response) {
            return res.json({message : "NOT OK"});
        } else {
            return res.json({message : "OK"});
        }});
}

const addRelatedStudents = (req, res, next) => {
    let email = req.query.emailO;

    Offerer.findOne({email : email}, (err, data) => {
        if(err || !data) return res.status(404).json({message : "Offerer doesn't exist"});
        data.relatedStudentsEmail.push(req.query.emailS);
        data.save();
        res.status(200).json(data);
    })
}

module.exports = {
    getOneOfferer,
    deleteOneOfferer,
    setIdTelegram,
    setDescription,
    setName, 
    setSurname,
    setPassword,
    addRelatedStudents
};