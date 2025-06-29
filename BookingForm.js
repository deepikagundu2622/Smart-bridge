import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function BookingForm() {
  const { flightId } = useParams();
  const [flight, setFlight] = useState(null);
  const [passengers, setPassengers] = useState([{ name: '', age: '' }]);
  const [travelClass, setTravelClass] = useState('Economy');
  const [basePrice, setBasePrice] = useState(3000); // default fallback
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
  console.log('Flight ID:', flightId); // 🟡 Confirm the ID in console

  const fetchFlight = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/flights/${flightId}`);
      console.log('Flight Data:', res.data); // 🟢 Confirm response
      setFlight(res.data);
      setBasePrice(res.data.price || 3000);
    } catch (err) {
      console.error('Error fetching flight:', err.response?.data || err.message);
    }
  };

  fetchFlight();
}, [flightId]);


  const handlePassengerChange = (index, e) => {
    const updated = [...passengers];
    updated[index][e.target.name] = e.target.value;
    setPassengers(updated);
  };

  const addPassenger = () => {
    setPassengers([...passengers, { name: '', age: '' }]);
  };

  const totalPrice = () => {
    const multiplier = travelClass === 'Business' ? 1.5 : 1;
    return passengers.length * basePrice * multiplier;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/bookings',
        {
          user: userId,
          flight: flightId,
          passengers,
          class: travelClass,
          totalPrice: totalPrice(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Booking confirmed ✅');
      navigate('/bookings');
    } catch (err) {
      console.error('Booking error:', err);
      alert('Booking failed ❌');
    }
  };

  if (!flight) return <p className="text-center mt-5">Loading flight info...</p>;

  return (
    <div className="container mt-4" style={{ maxWidth: '700px' }}>
      <h2 className="text-center mb-4">Book Flight ✈️</h2>
      <h5>Flight: {flight.airline}</h5>
      <p>
        From: <strong>{flight.source}</strong> → To: <strong>{flight.destination}</strong>
      </p>
      <p>Base Price: ₹{basePrice}</p>

      <form onSubmit={handleSubmit}>
        {passengers.map((passenger, idx) => (
          <div key={idx} className="mb-3">
            <label>Passenger {idx + 1}</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={passenger.name}
              onChange={(e) => handlePassengerChange(idx, e)}
              className="form-control mb-2"
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={passenger.age}
              onChange={(e) => handlePassengerChange(idx, e)}
              className="form-control"
              required
            />
          </div>
        ))}

        <button type="button" className="btn btn-secondary mb-3" onClick={addPassenger}>
          ➕ Add Passenger
        </button>

        <select
          className="form-select mb-3"
          value={travelClass}
          onChange={(e) => setTravelClass(e.target.value)}
        >
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
        </select>

        <h5>Total Price: ₹{totalPrice()}</h5>

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Book Now
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
