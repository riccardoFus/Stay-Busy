const request = require('supertest');
const app = require("../server");

const newOfferer = {
    typeofuser : "false",
    termsaccepted : "true",
    name : "Prova Nome",
    surname : "Prova Cognome",
    email : "emailcorretta@gmail.com",
    password : "passwordCorretta-02",
    confirmationpassword : "passwordCorretta-02",
    idtelegram : "",
    description : ""
};

describe('Offerer test suite', () => {
    test('tests /api/offerer correct', async() => {
        await request(app).delete("/api/offerer/email?email=emailcorretta@gmail.com");
        const response = await request(app).post("/api/offerer").send(newOfferer);
        expect(response.body).toEqual({message : "OK"});
        await request(app).delete("/api/offerer/email?email=emailcorretta@gmail.com");
    });
    test('tests /api/offerer wrong password', async() => {
        const newOfferer = {
            typeofuser : "false",
            termsaccepted : "true",
            name : "Prova Nome",
            surname : "Prova Cognome",
            email : "emailcorretta@gmail.com",
            password : "passwordsbagliata",
            confirmationpassword : "passwordsbagliata",
            idtelegram : "",
            description : ""
        }
        const response = await request(app).post("/api/offerer").send(newOfferer);
        expect(response.body).toEqual({message : "Wrong password"});
    });
    test('tests /api/offerer wrong type of user', async() => {
        const newOfferer = {
            typeofuser : "true",
            termsaccepted : "true",
            name : "Prova Nome",
            surname : "Prova Cognome",
            email : "emailcorretta@gmail.com",
            password : "passwordCorretta-02",
            confirmationpassword : "passwordCorretta-02",
            idtelegram : "",
            description : ""
        }
        const response = await request(app).post("/api/offerer").send(newOfferer);
        expect(response.body).toEqual({message : "Wrong type of user"});
    });
    test('tests /api/offerer terms accepted not accepted', async() => {
        const newOfferer = {
            typeofuser : "false",
            termsaccepted : "false",
            name : "Prova Nome",
            surname : "Prova Cognome",
            email : "emailcorretta@gmail.com",
            password : "passwordCorretta-02",
            confirmationpassword : "passwordCorretta-02",
            idtelegram : "",
            description : ""
        }
        const response = await request(app).post("/api/offerer").send(newOfferer);
        expect(response.body).toEqual({message : "You need to accept the Terms & Conditions"});
    });
    test('tests /api/offerer two password not equal', async() => {
        const newOfferer = {
            typeofuser : "false",
            termsaccepted : "true",
            name : "Prova Nome",
            surname : "Prova Cognome",
            email : "emailcorretta@gmail.com",
            password : "passwordCorretta-02",
            confirmationpassword : "passwordNonCorretta-02",
            idtelegram : "",
            description : ""
        }
        const response = await request(app).post("/api/offerer").send(newOfferer);
        expect(response.body).toEqual({message : "Two inserted password are not equal"});
    });
    test('tests /api/offerer/emailO correct', async() => {
        await request(app).post("/api/offerer").send(newOfferer);
        const response = await request(app).get("/api/offerer/emailO?email=emailcorretta@gmail.com");
        expect(response.body.email).toEqual("emailcorretta@gmail.com");
        await request(app).delete("/api/offerer/email?email=emailcorretta@gmail.com");
    });
    test('tests /api/offerer/emailO account not present', async() => {
        const response = await request(app).get("/api/offerer/emailO?email=emailcorretta@gmail.com");
        expect(response.body).toEqual({messagge : "Offerer doesn't exist"});
    });
    test('tests /api/offerer/login correct', async() => {
        await request(app).post("/api/offerer").send(newOfferer);
        const response = await request(app).post("/api/offerer/login").send(newOfferer);
        expect(response.body.message).toEqual("OK");
        await request(app).delete("/api/offerer/email?email=emailcorretta@gmail.com");
    });
    test('tests /api/offerer/login not correct', async() => {
        await request(app).post("/api/offerer").send(newOfferer);
        const response = await request(app).post("/api/offerer/login").send({email : "emailcorretta@gmail.com", password : "passwordsbagliata"});
        expect(response.body.message).toEqual("Wrong credentials");
        await request(app).delete("/api/offerer/email?email=emailcorretta@gmail.com");
    });
    test('tests /api/offerer/email correct', async() => {
        await request(app).post("/api/offerer").send(newOfferer);
        const response = await request(app).delete("/api/offerer/email?email=emailcorretta@gmail.com");
        expect(response.body.message).toEqual("OK");
        await request(app).delete("/api/offerer/email?email=emailcorretta@gmail.com");
    });
    test('tests /api/offerer/email not correct', async() => {
        await request(app).post("/api/offerer").send(newOfferer);
        const response = await request(app).delete("/api/offerer/email?email=emailnoncorretta@gmail.com");
        expect(response.body.message).toEqual("NOT OK");
        await request(app).delete("/api/offerer/email?email=emailcorretta@gmail.com");
    });
    test('tests /api/offerer/idtelegram correct', async() => {
        await request(app).post("/api/offerer").send(newOfferer);
        const response = await request(app).post("/api/offerer/idtelegram?email=emailcorretta@gmail.com").send({idtelegram : "Prova"});
        expect(response.body.message).toEqual("OK");
        await request(app).delete("/api/offerer/email?email=emailcorretta@gmail.com");
    });
    test('tests /api/offerer/idtelegram not correct', async() => {
        await request(app).post("/api/offerer").send(newOfferer);
        const response = await request(app).post("/api/offerer/idtelegram?email=emailnoncorretta@gmail.com").send({idtelegram : "Prova"});
        expect(response.body.message).toEqual("NOT OK");
        await request(app).delete("/api/offerer/email?email=emailcorretta@gmail.com");
    });
    test('tests /api/offerer/description correct', async() => {
        await request(app).post("/api/offerer").send(newOfferer);
        const response = await request(app).post("/api/offerer/description?email=emailcorretta@gmail.com").send({description : "Prova"});
        expect(response.body.message).toEqual("OK");
        await request(app).delete("/api/offerer/email?email=emailcorretta@gmail.com");
    });
    test('tests /api/offerer/description not correct', async() => {
        await request(app).post("/api/offerer").send(newOfferer);
        const response = await request(app).post("/api/offerer/description?email=emailnoncorretta@gmail.com").send({description : "Prova"});
        expect(response.body.message).toEqual("NOT OK");
        await request(app).delete("/api/offerer/email?email=emailcorretta@gmail.com");
    });
    test('tests /api/offerer/name correct', async() => {
        await request(app).post("/api/offerer").send(newOfferer);
        const response = await request(app).post("/api/offerer/name?email=emailcorretta@gmail.com").send({name : "Prova"});
        expect(response.body.message).toEqual("OK");
        await request(app).delete("/api/offerer/email?email=emailcorretta@gmail.com");
    });
    test('tests /api/offerer/name not correct', async() => {
        await request(app).post("/api/offerer").send(newOfferer);
        const response = await request(app).post("/api/offerer/name?email=emailnoncorretta@gmail.com").send({name : "Prova"});
        expect(response.body.message).toEqual("NOT OK");
        await request(app).delete("/api/offerer/email?email=emailcorretta@gmail.com");
    });
    test('tests /api/offerer/surname correct', async() => {
        await request(app).post("/api/offerer").send(newOfferer);
        const response = await request(app).post("/api/offerer/surname?email=emailcorretta@gmail.com").send({surname : "Prova"});
        expect(response.body.message).toEqual("OK");
        await request(app).delete("/api/offerer/email?email=emailcorretta@gmail.com");
    });
    test('tests /api/offerer/surname not correct', async() => {
        await request(app).post("/api/offerer").send(newOfferer);
        const response = await request(app).post("/api/offerer/surname?email=emailnoncorretta@gmail.com").send({surname : "Prova"});
        expect(response.body.message).toEqual("NOT OK");
        await request(app).delete("/api/offerer/email?email=emailcorretta@gmail.com");
    });
    test('tests /api/offerer/password correct', async() => {
        await request(app).post("/api/offerer").send(newOfferer);
        const response = await request(app).post("/api/offerer/password?email=emailcorretta@gmail.com").send({old : "passwordCorretta-02", new : "Prova-1999", newnew : "Prova-1999"});
        expect(response.body.message).toEqual("OK");
        await request(app).delete("/api/offerer/email?email=emailcorretta@gmail.com");
    });
    test('tests /api/offerer/password not correct passwords', async() => {
        await request(app).post("/api/offerer").send(newOfferer);
        const response = await request(app).post("/api/offerer/password?email=emailcorretta@gmail.com").send({new : "Prova-1999", newnew : "Prova-1998"});
        expect(response.body.message).toEqual("Two new password are not equal");
        await request(app).delete("/api/offerer/email?email=emailcorretta@gmail.com");
    });
    test('tests /api/offerer/password not correct email', async() => {
        await request(app).post("/api/offerer").send(newOfferer);
        const response = await request(app).post("/api/offerer/password?email=emailnoncorretta@gmail.com").send({new : "Prova-1999", newnew : "Prova-1999"});
        expect(response.body.message).toEqual("NOT OK");
        await request(app).delete("/api/offerer/email?email=emailcorretta@gmail.com");
    });
});

app.close();