import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Admin Dashboard 📊</h2>
      <div className="row text-center">
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm border-success">
            <div className="card-body">
              <h5>Total Users</h5>
              <h3>{stats.users}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm border-info">
            <div className="card-body">
              <h5>Total Flights</h5>
              <h3>{stats.flights}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm border-warning">
            <div className="card-body">
              <h5>Total Bookings</h5>
              <h3>{stats.bookings}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm border-danger">
            <div className="card-body">
              <h5>Total Revenue ₹</h5>
              <h3>{stats.revenue}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
