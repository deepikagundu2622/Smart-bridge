import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [form, setForm] = useState({
    source: '',
    destination: '',
    departureDate: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // ✅ optional: verify flights exist
      const res = await axios.get('http://localhost:5000/api/flights/search', {
        params: form
      });

      // ✅ Navigate with query params
      navigate(`/flights?source=${form.source}&destination=${form.destination}&departureDate=${form.departureDate}`);
    } catch (err) {
      alert('Search failed ❌');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSearch} className="d-flex flex-wrap justify-content-center gap-2 mt-3">
      <input
        type="text"
        name="source"
        placeholder="From"
        className="form-control"
        style={{ width: '150px' }}
        value={form.source}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="destination"
        placeholder="To"
        className="form-control"
        style={{ width: '150px' }}
        value={form.destination}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="departureDate"
        className="form-control"
        style={{ width: '160px' }}
        value={form.departureDate}
        onChange={handleChange}
        required
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
