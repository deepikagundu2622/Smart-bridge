import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert('Registration successful ✅');
      navigate('/');
    } catch (err) {
      alert('Registration failed ❌');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2>Register 👤</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Password"
          required
        />
        <button type="submit" className="btn btn-success w-100 rounded">
          Register
        </button>
      </form>
      <p className="mt-3 text-center">
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
}

export default Register;
