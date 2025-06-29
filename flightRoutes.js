const express = require('express');
const router = express.Router();
const {
  addFlight,
  getAllFlights,
  searchFlights,
  getFlightById,
  updateFlight,        // ✅ make sure this is imported
  deleteFlight
} = require('../controllers/flightController');

// Routes
router.post('/', addFlight);
router.get('/', getAllFlights);
router.get('/search', searchFlights);
router.get('/:id', getFlightById);
router.put('/:id', updateFlight);   // ✅ edit route
router.delete('/:id', deleteFlight); // ✅ delete route

module.exports = router;
