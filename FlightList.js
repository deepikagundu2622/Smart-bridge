import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function FlightList() {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const query = useQuery();

  const fetchFlights = async () => {
    try {
      const source = query.get('source');
      const destination = query.get('destination');
      const departureDate = query.get('departureDate');

      let res;
      if (source && destination && departureDate) {
        res = await axios.get('http://localhost:5000/api/flights/search', {
          params: { source, destination, departureDate }
        });
      } else {
        res = await axios.get('http://localhost:5000/api/flights');
      }

      setFlights(res.data);
    } catch (err) {
      console.error('Error fetching flights:', err);
      alert('Failed to load flights ✖️');
    }
  };

  useEffect(() => {
    fetchFlights();
  }, [query]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Available Flights ✈️</h2>
      {/* ... your table rendering code ... */}
    </div>
  );
}

export default FlightList;
