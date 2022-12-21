const Offerer = require("../models/offerer");
const jwt = require('jsonwebtoken');

const loginOfferer = (req, res, next) => {
    
    let email = req.body.email;
    let password = req.body.password;

    Offerer.findOne({email : email, password : password}, (err, data) => {
        if(!data){
            return res.json({message : "Wrong credentials"});
        }else{
            var payload = {
                email: data.email,
                id: data._id
            }
            var options = {
                expiresIn: 86400
            }
            var token = jwt.sign(payload, process.env.SUPER_SECRET, options);
        
            return res.json({
                message: 'OK',
                token: token,
                email: data.email
            });
        }
    })
};

module.exports = {
    loginOfferer
}