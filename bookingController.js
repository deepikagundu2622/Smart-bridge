const Booking = require('../models/Booking');

// ✅ Create new booking
const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    console.error('Booking creation failed:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get bookings of the current user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('flight');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'Cancelled' },
      { new: true }
    );
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Export all functions
module.exports = {
  createBooking,
  getUserBookings,
  cancelBooking,
};
