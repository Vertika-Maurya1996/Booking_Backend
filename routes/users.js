var express = require('express');
var router = express.Router();
const UserController = require("../controllers/UserController")
const BookingController = require("../controllers/BookingController")

router.post('/register',UserController.userRegister);
router.post('/getUserDetails',UserController.getUserDetails)
router.post('/confirmBooking',BookingController.confirmBookingUser)
router.get('/getBooking/:userID',BookingController.getBooking)
router.post('/price-booking',BookingController.bookingPrice)


module.exports = router;
