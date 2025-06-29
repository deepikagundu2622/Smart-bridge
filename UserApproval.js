import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserApproval() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleApproval = async (id, approve) => {
    try {
      await axios.patch(`http://localhost:5000/api/users/${id}/approval`, {
        isApproved: approve
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      console.error('Approval update failed:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Operator Approvals 👤</h2>
      <table className="table table-bordered shadow text-center">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Approved</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name || '—'}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isApproved ? '✅ Yes' : '⏳ No'}</td>
              <td>
                {user.role === 'operator' && (
                  <>
                    {!user.isApproved ? (
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleApproval(user._id, true)}>
                        Approve
                      </button>
                    ) : (
                      <button className="btn btn-danger btn-sm" onClick={() => handleApproval(user._id, false)}>
                        Reject
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserApproval;
