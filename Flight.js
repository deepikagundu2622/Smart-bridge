const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: String,
  source: String, // ✅ changed
  destination: String, // ✅ changed
  departureDate: Date,
  returnDate: Date,
  departureTime: String,
  arrivalTime: String,
  duration: String,
  price: Number,
  class: {
    type: String,
    enum: ['Economy', 'Business', 'First'],
    default: 'Economy',
  },
  availableSeats: Number,
}, { timestamps: true });

module.exports = mongoose.model('Flight', flightSchema);
