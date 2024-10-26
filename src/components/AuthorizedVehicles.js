// src/components/AuthorizedVehicles.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';

function AuthorizedVehicles() {
  const [authorized, setAuthorized] = useState([]);

  useEffect(() => {
    const fetchAuthorized = async () => {
      const querySnapshot = await getDocs(collection(db, "Authorized"));
      setAuthorized(querySnapshot.docs.map(doc => doc.data()));
    };

    fetchAuthorized();
  }, []);

  return (
    <div>
      <h1>Authorized Vehicles</h1>
      <table>
        <thead>
          <tr>
            <th>Vehicle Number</th>
          </tr>
        </thead>
        <tbody>
          {authorized.map((item, index) => (
            <tr key={index}>
              <td>{item.vehicle_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuthorizedVehicles;
