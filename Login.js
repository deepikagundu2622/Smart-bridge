import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data._id);
      alert('Login Success ✅');
      navigate('/flights');
    } catch (err) {
      alert('Login Failed ❌');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2>Login ✈️</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary w-100 rounded">
          Login
        </button>
      </form>
      <p className="mt-3 text-center">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}

export default Login;
