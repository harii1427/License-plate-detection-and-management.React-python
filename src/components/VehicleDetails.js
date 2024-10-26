// src/components/VehicleDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';

function VehicleDetails() {
  const { id } = useParams(); // Get the document ID from the URL
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      const docRef = doc(db, "Vehicle", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setVehicle(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchVehicle();
  }, [id]);

  return (
    <div>
      {vehicle ? (
        <div>
          <h2>Vehicle Details for {vehicle.name}</h2>
          <p><strong>Roll No:</strong> {vehicle.rollNo}</p>
          <p><strong>Department:</strong> {vehicle.dept}</p>
          <p><strong>Year:</strong> {vehicle.year}</p>
          <p><strong>Primary Vehicle:</strong> {vehicle.primaryVehicle}</p>
          <p><strong>Secondary Vehicle:</strong> {vehicle.secondaryVehicle}</p>
          <p><strong>User ID:</strong> {vehicle.user_id}</p>
        </div>
      ) : (
        <p>Loading vehicle details...</p>
      )}
    </div>
  );
}

export default VehicleDetails;
