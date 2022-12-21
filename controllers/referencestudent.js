const Referencestudent = require("../models/referencestudent");
const getAllReferenceStudent = (req, res, next) => {
    Referencestudent.find({}, (err, data) => {
        if(err) return res.json({Error : err});
        return res.json(data);
    })
};


const newReferenceStudent = (req, res, next) => {
    Referencestudent.findOne({studentemail : req.body.emailS, offereremail : req.body.emailO}, (err, data) => {
        if(!data){
            const newReferencestudent = new Referencestudent({
                vote : req.body.vote,
                review : req.body.review,
                studentemail : req.body.emailS,
                offereremail : req.body.emailO
            })
            newReferencestudent.save((err, data) => {
                if(err) return res.json({Error : err});
                return res.json(data);
            })
        }else{
            if(err) return res.json("Something went wrong, please try again: " + err);
            return res.json({message: "Reference already exists"});
        }
    })
};


const deleteAllReferenceStudent = (req, res, next) => {
    Referencestudent.deleteMany({}, (err, data) => {
        if(err) return res.json({message : "Complete delete failed"});
        return res.json({message : "Complete delete successful"});
    })
};


const getOneReferenceStudent = (req, res, next) => {
    let emailO = req.query.emailO;
    let emailS = req.query.emailS;

    Referencestudent.findOne({studentemail : emailS, offereremail : emailO}, (err, data) => {
        if(err || !data) return res.json({message : "Reference doesn't exist"});
        return res.json(data);
    })
};


const deleteOneReferenceStudent = (req, res, next) => {
    let emailO = req.query.emailO;
    let emailS = req.query.emailS;

    Referencestudent.deleteOne({offereremail : emailO, studentemail : emailS}, (err, data) => {
        if(err || !data) return res.json({message : "Student doesn't exist"});
        return res.json(data);
    })
};

module.exports = {
    getAllReferenceStudent,
    newReferenceStudent, 
    deleteAllReferenceStudent,
    getOneReferenceStudent, 
    deleteOneReferenceStudent
};