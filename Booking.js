const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flight',
      required: true,
    },
    passengers: [
      {
        name: { type: String, required: true },
        age: { type: Number, required: true },
      },
    ],
    class: {
      type: String,
      enum: ['Economy', 'Business'],
      default: 'Economy',
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    seatNumber: {
      type: String, // optional if you want per-passenger seats later
    },
    status: {
      type: String,
      enum: ['Booked', 'Cancelled'],
      default: 'Booked',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid'],
      default: 'Paid',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
