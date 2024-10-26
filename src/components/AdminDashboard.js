// src/components/AdminDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleStudentListClick = () => {
    navigate('/student-list');
  };

  const handleVehicleInfoClick = () => {
    navigate('/vehicle-information');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h1>
          <span className="admin-dashboard-title-large">A</span>
          <span className="admin-dashboard-title-small">dmin</span>
          <span className="admin-dashboard-title-large">D</span>
          <span className="admin-dashboard-title-small">ashboard</span>
        </h1>
      </div>
      <div className="admin-dashboard-content">
        <ul>
          <li>
            <span>Student List:</span>
            <a onClick={handleStudentListClick}>click here</a>
          </li>
          <li>
            <span>Vehicle Count:</span>
            <a onClick={handleVehicleInfoClick}>click here</a>
          </li>
        </ul>
        <div className="admin-dashboard-image">
          <img src={require('../assets/admin.jpg')} alt="Admin" />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
