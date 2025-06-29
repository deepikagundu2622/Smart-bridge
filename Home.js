import React, { useState } from 'react';
import SearchBar from './SearchBar';
import AboutUs from './AboutUs';
import './Home.css';

function Home() {
  const [results, setResults] = useState([]);

  return (
    <div className="home">
      <div className="hero">
        <div className="overlay">
          <h1>Welcome to FlightFinder ✈️</h1>
          <p>Search & Book Your Flight Instantly</p>
          <SearchBar setResults={setResults} /> {/* ✅ show search inputs */}
        </div>
      </div>

      <AboutUs />

      {results.length > 0 && (
        <div className="container mt-5">
          <h3 className="text-center">Matching Flights</h3>
          <table className="table table-bordered table-hover text-center mt-3 shadow">
            <thead className="table-dark">
              <tr>
                <th>Airline</th>
                <th>From</th>
                <th>To</th>
                <th>Departure</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {results.map((flight) => (
                <tr key={flight._id}>
                  <td>{flight.airline}</td>
                  <td>{flight.source}</td>
                  <td>{flight.destination}</td>
                  <td>{new Date(flight.departureTime).toLocaleString()}</td>
                  <td>₹{flight.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Home;
