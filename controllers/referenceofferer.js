const Referenceofferer = require("../models/referenceofferer");
const getAllReferenceOfferer = (req, res, next) => {
    Referenceofferer.find({}, (err, data) => {
        if(err) return res.json({Error : err});
        return res.json(data);
    })
};


const newReferenceOfferer = (req, res, next) => {
    Referenceofferer.findOne({studentemail : req.body.emailS, offereremail : req.body.emailO}, (err, data) => {
        if(!data){
            const newReferenceofferer = new Referenceofferer({
                vote : req.body.vote,
                review : req.body.review,
                studentemail : req.body.emailS,
                offereremail : req.body.emailO
            })
            newReferenceofferer.save((err, data) => {
                if(err) return res.json({Error : err});
                return res.json(data);
            })
        }else{
            if(err) return res.json("Something went wrong, please try again: " + err);
            return res.json({message: "Reference already exists"});
        }
    })
};


const deleteAllReferenceOfferer = (req, res, next) => {
    Referenceofferer.deleteMany({}, (err, data) => {
        if(err) return res.json({message : "Complete delete failed"});
        return res.json({message : "Complete delete successful"});
    })
};


const getOneReferenceOfferer = (req, res, next) => {
    let emailO = req.query.emailO;
    let emailS = req.query.emailS;

    Referenceofferer.findOne({studentemail : emailS, offereremail : emailO}, (err, data) => {
        if(err || !data) return res.json({message : "Reference doesn't exist"});
        return res.json(data);
    })
};


const deleteOneReferenceOfferer = (req, res, next) => {
    let emailO = req.query.emailO;
    let emailS = req.query.emailS;

    Referenceofferer.deleteOne({offereremail : emailO, studentemail : emailS}, (err, data) => {
        if(err || !data) return res.json({message : "Student doesn't exist"});
        return res.json(data);
    })
};

module.exports = {
    getAllReferenceOfferer,
    newReferenceOfferer, 
    deleteAllReferenceOfferer,
    getOneReferenceOfferer, 
    deleteOneReferenceOfferer
};