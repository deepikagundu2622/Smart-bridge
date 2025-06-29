const Flight = require('../models/Flight');

// @desc    Add new flight (Admin)
const addFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json(flight);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all flights
const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find({});
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Search flights by filters (Home Page)
const searchFlights = async (req, res) => {
  const { source, destination, departureDate } = req.query;

  try {
    const flights = await Flight.find({
      source: new RegExp(source, 'i'),
      destination: new RegExp(destination, 'i'),
      departureDate: new Date(departureDate)
    });
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// @desc    Get single flight by ID
const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.json(flight);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update flight by ID
const updateFlight = async (req, res) => {
  try {
    const updated = await Flight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Flight not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete flight by ID
const deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (!flight) return res.status(404).json({ message: 'Flight not found' });
    res.json({ message: 'Flight deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Export all
module.exports = {
  addFlight,
  getAllFlights,
  searchFlights,
  getFlightById,
  updateFlight,
  deleteFlight,
};
