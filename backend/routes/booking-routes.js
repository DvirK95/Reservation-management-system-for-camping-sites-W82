const express = require("express");
const bookingController = require("../controllers/booking-controller");
const { clearBookingSession } = require("../controllers/booking-controller");

const router = express.Router();

router.post("/session", bookingController.createBookingSession);
router.post("/session/clear", bookingController.clearBookingSession);
router.get("/session", bookingController.getBookingSession);

module.exports = router;
