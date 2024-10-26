// src/components/VehicleInformation.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function VehicleInformation() {
  const navigate = useNavigate();

  const handleAuthorizedClick = () => {
    navigate('/authorized-vehicles');
  };

  const handleUnauthorizedClick = () => {
    navigate('/unauthorized-vehicles');
  };

  return (
    <div>
      <h1>Vehicle Information</h1>
      <ul>
        <li>
          <span>Authorized Vehicles:</span>
          <a onClick={handleAuthorizedClick}>click here</a>
        </li>
        <li>
          <span>Unauthorized Vehicles:</span>
          <a onClick={handleUnauthorizedClick}>click here</a>
        </li>
      </ul>
    </div>
  );
}

export default VehicleInformation;
