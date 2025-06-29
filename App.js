import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import FlightList from './components/FlightList';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AddFlight from './components/AddFlight';
import EditFlight from './components/EditFlight';
import UserApproval from './components/UserApproval';
import AdminDashboard from './components/AdminDashboard';
import AdminRoute from './components/AdminRoute';

import './styles.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Pages */}
          <Route
            path="/flights"
            element={
              <PrivateRoute>
                <FlightList />
              </PrivateRoute>
            }
          />
          <Route
            path="/book/:flightId"
            element={
              <PrivateRoute>
                <BookingForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <PrivateRoute>
                <BookingList />
              </PrivateRoute>
            }
          />
          <Route
            path="/book/:flightId"
            element={
              <PrivateRoute>
                <BookingForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-flight"
            element={
                <PrivateRoute>
                  <AddFlight />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-flight/:id"
              element={
                <PrivateRoute>
                  <EditFlight />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <UserApproval />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/users"
              element={
                <AdminRoute>
                  <UserApproval />
                </AdminRoute>
              }  
            />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
