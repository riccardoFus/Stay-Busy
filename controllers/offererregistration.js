Offerer = require("../models/offerer");

const checkPasswordRequirements = (password) => {
    const test = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
    if(test) return true;
    return false;
}

const newOfferer = (req, res, next) => {
    var typeofuser = req.body.typeofuser;
    var termsaccepted = req.body.termsaccepted;
    var name = req.body.name;
    var surname = req.body.surname;
    var email = req.body.email;
    var password = req.body.password;
    var confirmationpassword = req.body.confirmationpassword;
    var idtelegram = req.body.idtelegram;
    var description = req.body.description;

    if(typeofuser == "true"){
        return res.json({message : "Wrong type of user"});
    }
    if(termsaccepted == "false"){
        return res.json({message : "You need to accept the Terms & Conditions"})
    }
    if(password != confirmationpassword){
        return res.json({message : "Two inserted password are not equal"});
    }
    
    if(!checkPasswordRequirements(password)){
        return res.json({message : "Wrong password"});
    }

    Offerer.findOne({email : req.body.email}, (err, data) => {
        if(!data){
            const newOfferer = new Offerer({
                name : name,
                surname : surname,
                confirmedaccount : "true",
                email : email,
                idtelegram : idtelegram, 
                description : description,
                password : password,
                relatedStudents : []
            })
            newOfferer.save((err, data) => {
                if(err) return res.json({Error : err});
                return res.json({message : "OK"});
            })
        }else{
            if(err) return res.json("Something went wrong, please try again: " + err);
            return res.json({message: "Offerer already exists"});
        }
    })
};

module.exports = {
    newOfferer
}