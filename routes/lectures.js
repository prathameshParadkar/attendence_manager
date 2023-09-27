const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware'); // Import your isLoggedIn middleware
const LectureController = require('../controllers/lectures'); // Import your LectureController

// GET /
router.get('/', isLoggedIn, LectureController.getIndex);

// GET /lectures/:id
router.get('/:id', isLoggedIn, LectureController.getShow);

// POST /lectures/:id/markAttendance
router.post('/:id/markPresence', isLoggedIn, LectureController.postMarkPresence);
router.post('/:id/markAbsence', isLoggedIn, LectureController.postMarkAbsence);

module.exports = router;
