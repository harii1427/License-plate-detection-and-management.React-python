// src/components/UnauthorizedVehicles.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';

function UnauthorizedVehicles() {
  const [unauthorized, setUnauthorized] = useState([]);

  useEffect(() => {
    const fetchUnauthorized = async () => {
      const querySnapshot = await getDocs(collection(db, "Unauthorized"));
      setUnauthorized(querySnapshot.docs.map(doc => doc.data()));
    };

    fetchUnauthorized();
  }, []);

  return (
    <div>
      <h1>Unauthorized Vehicles</h1>
      <table>
        <thead>
          <tr>
            <th>Vehicle Number</th>
          </tr>
        </thead>
        <tbody>
          {unauthorized.map((item, index) => (
            <tr key={index}>
              <td>{item.vehicle_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UnauthorizedVehicles;
