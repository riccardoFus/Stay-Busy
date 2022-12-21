const Student = require("../models/student");
const Availability = require("../models/availability");
const Referencestudent = require("../models/referencestudent");
const getAllStudent = (req, res, next) => {
    Student.find({}, (err, data) => {
        if(err) return res.json({Error : err});
        return res.json(data);
    })
};


const newStudent = (req, res, next) => {
    Student.findOne({email : req.body.email}, (err, data) => {
        if(!data){
            const newStudent = new Student({
                name : req.body.name,
                surname : req.body.surname,
                email : req.body.email,
                city : req.body.city,
                idtelegram : req.body.idtelegram, 
                confirmedaccount : req.body.confirmedaccount,
                university : {
                    nameuni : req.body.nameuni, 
                    cityuni : req.body.cityuni,
                    regionuni : req.body.regionuni
                },
                description : req.body.description
            })
            newStudent.save((err, data) => {
                if(err) return res.json({Error : err});
                return res.json(data);
            })
        }else{
            if(err) return res.json("Something went wrong, please try again: " + err);
            return res.json({message: "Student already exists"});
        }
    })
};


const deleteAllStudent = (req, res, next) => {
    Student.deleteMany({}, (err, data) => {
        if(err) return res.json({message : "Complete delete failed"});
        return res.json({message : "Complete delete successful"});
    })
};


const getOneStudent = (req, res, next) => {
    let email = req.query.email;

    Student.findOne({email : email}, (err, data) => {
        if(err || !data) return res.json({message : "Student doesn't exist"});
        return res.json(data);
    })
};


const deleteOneStudent = (req, res, next) => {
    let email = req.query.email;

    Student.deleteOne({email : email}, (err, data) => {
        if(err || !data) return res.json({message : "Student doesn't exist"});
        return res.json(data);
    })
};


const incrementCountDoneServices = (req, res, next) => {
    let email = req.query.email;

    Student.findOneAndUpdate({email : email}, {$inc: {countdoneservices : 1}}, {new: true},function(err, response) {
    if (err) {
        return res.json({message : "Student doesn't exist"});
    } else {
        return res.json({message : "Student modified"});
    }});
}

const incrementCountDeclinedServices = (req, res, next) => {
    let email = req.query.email;

    Student.findOneAndUpdate({email : email}, {$inc: {countdeclinedservices : 1}}, {new: true},function(err, response) {
    if (err) {
        return res.json({message : "Student doesn't exist"});
    } else {
        return res.json({message : "Student modified"});
    }});
}

const incrementCountDeclinedServices24h = (req, res, next) => {
    let email = req.query.email;

    Student.findOneAndUpdate({email : email}, {$inc: {countdeclinedservicesbefore24h : 1}}, {new: true},function(err, response) {
    if (err) {
        return res.json({message : "Student doesn't exist"});
    } else {
        return res.json({message : "Student modified"});
    }});
}

const printReferences = (req, res, next) => {
    let email = req.query.email;

    Referencestudent.find({studentemail : email}, (err, data) => {
        if(err) return res.json({Error : err});
        return res.json(data);
    })
}

const printAvailabilities = (req, res, next) => {
    let email = req.query.email;

    Availability.find({studentemail : email}, (err, data) => {
        if(err) return res.json({Error : err});
        return res.json(data);
    })
}

const setIdTelegram = (req, res, next) => {
    let email = req.query.email;

    Student.findOneAndUpdate({email : email}, {idtelegram : req.query.id}, {new: true}, function(err, response) {
    if (err) {
        return res.json({message : "Student doesn't exist"});
    } else {
        return res.json(response);
    }});
}

const setDescription = (req, res, next) => {
    let email = req.query.email;

    Student.findOneAndUpdate({email : email}, {description : req.query.description}, {new: true}, function(err, response) {
    if (err) {
        return res.json({message : "Student doesn't exist"});
    } else {
        return res.json(response);
    }});
}

module.exports = {
    getAllStudent,
    newStudent, 
    deleteAllStudent,
    getOneStudent, 
    deleteOneStudent, 
    incrementCountDoneServices,
    incrementCountDeclinedServices,
    incrementCountDeclinedServices24h,
    printReferences, 
    printAvailabilities,
    setIdTelegram,
    setDescription
};