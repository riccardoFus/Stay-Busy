const request = require('supertest');
const app = require("../server");

describe('Announcement test suite', () => {
    test('tests /api/announcement/email not present', async() => {
        const response = await request(app).get("/api/announcement/email?email=emailnonpresente@gmail.com");
        expect(response.body).toEqual([]);
    });
    test('tests /api/announcement with wrong email', async() => {
        await request(app).delete("/api/announcementD?email=prova@gmail.com");
        const newAnnouncement = {
            hour1 : 18,
            hour2 : 19,
            minutes1 : 20,
            minutes2 : 20,
            day : 15,
            month : 12,
            year : 2023,
            typeofwork : "Prova",
            typeofpayment : "contanti",
            description : "",
            offereremail : "prova@gmail.com"
        }
        const response = await request(app).post("/api/announcement").send(newAnnouncement);
        expect(response.body).toEqual({message : "NOT OK"});
    });
})

app.close();