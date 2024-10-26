// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import UserFormPage from './components/UserFormPage';
import AdminDashboard from './components/AdminDashboard';
import AuthorizedVehicles from './components/AuthorizedVehicles';
import UnauthorizedVehicles from './components/UnauthorizedVehicles';
import VehicleDetails from './components/VehicleDetails';
import StudentList from './components/StudentList';
import VehicleInformation from './components/VehicleInformation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/user-form" element={<UserFormPage />} />
        <Route path="/vehicle-details/:id" element={<VehicleDetails />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/authorized-vehicles" element={<AuthorizedVehicles />} />
        <Route path="/unauthorized-vehicles" element={<UnauthorizedVehicles />} />
        <Route path="/student-list" element={<StudentList />} />
        <Route path="/vehicle-information" element={<VehicleInformation />} />
        <Route path="/" element={<LoginPage />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;
