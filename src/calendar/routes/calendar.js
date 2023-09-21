const express = require('express');
const router = new express.Router();
const { getEventsByDate } = require('../controllers/calendar.controller');
const validateRequest = require('../middlewares/calendar.middleware');
router.post('/get-calendar-slots', validateRequest, getEventsByDate);

module.exports = router;
