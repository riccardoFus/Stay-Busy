const express = require('express');
const router  = express.Router();
const studentController = require('../controllers/student');
const offererController = require('../controllers/offerer');
const announcementController = require('../controllers/announcement');
const referenceoffererController = require('../controllers/referenceofferer');
const referencestudentController = require('../controllers/referencestudent');
const availabilityController = require('../controllers/availability');
const registrationoffererController = require('../controllers/offererregistration');
const loginOffererController = require('../controllers/offererlogin');

const multer = require("multer");
const upload = multer();

//API - STUDENTE (CREATE MA NON USATE NELLA WEB APP)
router.get('/api/student', studentController.getAllStudent);
router.post('/api/student', upload.none(), studentController.newStudent);
router.delete('/api/student', studentController.deleteAllStudent);
router.get('/api/student/email', studentController.getOneStudent);
router.delete('/api/student/email', studentController.deleteOneStudent);
router.post('/api/student/countdoneservices/email', studentController.incrementCountDoneServices);
router.post('/api/student/countdeclinedservices/email', studentController.incrementCountDeclinedServices);
router.post('/api/student/countdeclinedservices24h/email', studentController.incrementCountDeclinedServices24h);
router.get('/api/student/availabilities/email', studentController.printAvailabilities);
router.get('/api/student/references/email', studentController.printReferences);
router.post('/api/student/idtelegram/email', studentController.setIdTelegram);
router.post('/api/student/description/email', studentController.setDescription);

//API - OFFERENTE
router.post('/api/offerer', upload.none(), registrationoffererController.newOfferer);
router.get('/api/offerer/emailO', offererController.getOneOfferer);
router.post('/api/offerer/login', loginOffererController.loginOfferer);
router.delete('/api/offerer/email', offererController.deleteOneOfferer);
router.post('/api/offerer/idtelegram', offererController.setIdTelegram);
router.post('/api/offerer/description', offererController.setDescription);
router.post('/api/offerer/name', offererController.setName);
router.post('/api/offerer/surname', offererController.setSurname);
router.post('/api/offerer/password', offererController.setPassword);
router.post('/api/offerer/emailO', offererController.addRelatedStudents);

//API - ANNUNCIO
router.get('/api/announcement/email', announcementController.getAllAnnouncementByEmail);
router.post('/api/announcement', upload.none(), announcementController.newAnnouncement);
router.delete('/api/announcementD', announcementController.deleteAllAnnouncementByEmail);
/*CREATE MA NON USATE NELLA WEB APP*/
router.get('/api/announcement/typeofwork', announcementController.getOneAnnouncement);
router.get('/api/announcement/candidates/typeofwork', announcementController.printSetOfCandidates);
router.post('/api/announcement/typeofwork', announcementController.addCandidate);

//API - REFERENZA OFFERENTE (CREATE MA NON USATE NELLA WEB APP)
router.get('/api/referenceofferer', referenceoffererController.getAllReferenceOfferer);
router.post('/api/referenceofferer', upload.none(), referenceoffererController.newReferenceOfferer);
router.delete('/api/referenceofferer', referenceoffererController.deleteAllReferenceOfferer);
router.get('/api/referenceofferer/emailO', referenceoffererController.getOneReferenceOfferer);
router.delete('/api/referenceofferer/emailO', referenceoffererController.deleteOneReferenceOfferer);

//API - REFERENZA STUDENTE (CREATE MA NON USATE NELLA WEB APP)
router.get('/api/referencestudent', referencestudentController.getAllReferenceStudent);
router.post('/api/referencestudent', upload.none(), referencestudentController.newReferenceStudent);
router.delete('/api/referencestudent', referencestudentController.deleteAllReferenceStudent);
router.get('/api/referencestudent/emailS', referencestudentController.getOneReferenceStudent);
router.delete('/api/referencestudent/emailS', referencestudentController.deleteOneReferenceStudent);

//API - DISPONIBILITA' (CREATE MA NON USATE NELLA WEB APP)
router.get('/api/availability', availabilityController.getAllAvailability);
router.post('/api/availability', upload.none(), availabilityController.newAvailability);
router.delete('/api/availability', availabilityController.deleteAllAvailability);
router.get('/api/availability/id', availabilityController.getOneAvailability);
router.delete('/api/availability/id', availabilityController.deleteOneAvailability);
router.post('/api/availability/date/id', availabilityController.setDate);
router.post('/api/availability/starttime/id', availabilityController.setStartTime);
router.post('/api/availability/endttime/id', availabilityController.setEndTime);
router.post('/api/availability/frequency/id', availabilityController.setFrequency);
router.post('/api/availability/change/id', availabilityController.changeAvailability);

module.exports = router;