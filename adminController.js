const User = require('../models/User');
const Flight = require('../models/Flight');
const Booking = require('../models/Booking');

// @desc Get dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const flightCount = await Flight.countDocuments();
    const bookingCount = await Booking.countDocuments();
    const totalRevenue = await Booking.aggregate([
      { $match: { status: 'Booked' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    res.json({
      users: userCount,
      flights: flightCount,
      bookings: bookingCount,
      revenue: totalRevenue[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
