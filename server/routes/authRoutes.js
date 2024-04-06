const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/signup',authController.signup);
router.post('/login', authController.login);
router.post('/admin',authController.adminLogin);
router.post ('/event',authController.createEvent)
router.post ('/EditEvent',authController.EditEvent);
router.post ('/user',authController.Userfetch);
router.get('/eventfetch',authController.Eventfetch);
router.post('/eventreg',authController.UserEventReg);
router.post('/userprofile',authController.UserProfile);
router.get('/eventRegFetch',authController.getEventReg);
router.get('/getuser',authController.getUser);
router.post("/announcement",authController.announcement);
router.get("/viewannouncement",authController.ViewAnnounce);
router.post("/complaint",authController.complaint);
router.get("/viewcomplaint",authController.ViewComplaint);

module.exports = router;