const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('../swagger.json');

const routes = require('./routes/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/html/"), routes);
//app.use("/", routes);
/*
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);*/

app.use((req, res, next) => {
    console.log("called: " + req.method + ' ' + req.url)
    next()
})

//app.use(express.static(path.join(__dirname, '/html/style.css')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/html/login.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '/html/login.html'));
});

app.get('/loginStudente', function(req, res){
    res.sendFile(path.join(__dirname, '/html/loginStudente.html'));
})

app.get('/registrationStudente', function(req, res){
    res.sendFile(path.join(__dirname, '/html/registrationStudente.html'));
})

app.get('/modify', function(req, res){
    res.sendFile(path.join(__dirname, '/html/profileModify.html'));
})

app.get('/modifypsw', function(req, res){
    res.sendFile(path.join(__dirname, '/html/modificaPassword.html'));
})

app.get('/homepage', function(req, res) {
    res.sendFile(path.join(__dirname, '/html/homepage.html'));
});

app.get('/registration', function(req, res) {
    res.sendFile(path.join(__dirname, '/html/registration.html'));
});

app.get('/create', function(req, res) {
    res.sendFile(path.join(__dirname, '/html/create.html'));
});

app.get('/profile', function(req, res) {
    res.sendFile(path.join(__dirname, '/html/profile.html'));
});

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');


app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

/* Default 404 handler */
app.use((req, res) => {
    res.status(404);
    res.json({error: 'Not found'});
});

const listener = app.listen(process.env.PORT || 3000 , () =>{
    console.log("Your app is listening on port: " + listener.address().port);
});

//import mongoose
const { default: mongoose } = require("mongoose");
const Offerer = require('./models/offerer');

//establish connection to database
mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);

module.exports = listener;