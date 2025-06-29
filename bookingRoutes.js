const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  cancelBooking
} = require('../controllers/bookingController');

// POST - Book a flight
router.post('/', createBooking);

// GET - Fetch user’s bookings
router.get('/', getUserBookings);

// PATCH - Cancel a booking
router.patch('/:id/cancel', cancelBooking);

module.exports = router;
