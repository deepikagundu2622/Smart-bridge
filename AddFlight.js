import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddFlight() {
  const [form, setForm] = useState({
    airline: '',
    source: '',
    destination: '',
    departureDate: '',
    departureTime: '',
    price: ''
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/flights', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Flight Added ✅');
      navigate('/flights');
    } catch (err) {
      alert('Failed to Add Flight ❌');
      console.error(err);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">Add New Flight 🛫</h2>
      <form onSubmit={handleSubmit}>
        <input name="airline" value={form.airline} onChange={handleChange} placeholder="Airline Name" className="form-control mb-3" required />
        <input name="source" value={form.source} onChange={handleChange} placeholder="From City" className="form-control mb-3" required />
        <input name="destination" value={form.destination} onChange={handleChange} placeholder="To City" className="form-control mb-3" required />
        <input type="date" name="departureDate" value={form.departureDate} onChange={handleChange} className="form-control mb-3" required />
        <input type="time" name="departureTime" value={form.departureTime} onChange={handleChange} className="form-control mb-3" required />
        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price ₹" className="form-control mb-3" required />
        <button type="submit" className="btn btn-success w-100">Add Flight</button>
      </form>
    </div>
  );
}

export default AddFlight;
