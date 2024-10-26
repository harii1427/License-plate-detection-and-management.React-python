// src/components/UserFormPage.js
import React, { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from '../firebase';

function UserFormPage() {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    dept: '',
    year: '',
    primaryVehicle: '',
    secondaryVehicle: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      await addDoc(collection(db, "Vehicle"), {
        user_id: user.uid,
        ...formData
      });
      alert('Form submitted successfully');
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Vehicle Information</h2>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input name="rollNo" value={formData.rollNo} onChange={handleChange} placeholder="Roll No" required />
      <input name="dept" value={formData.dept} onChange={handleChange} placeholder="Department" required />
      <input name="year" value={formData.year} onChange={handleChange} placeholder="Year" required />
      <input name="primaryVehicle" value={formData.primaryVehicle} onChange={handleChange} placeholder="Primary Vehicle Number" required />
      <input name="secondaryVehicle" value={formData.secondaryVehicle} onChange={handleChange} placeholder="Secondary Vehicle Number" required />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserFormPage;
