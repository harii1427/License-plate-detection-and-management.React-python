// src/components/LoginPage.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/LoginPage.css';  // Import the CSS file

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get the user's role from Firestore
      const userDoc = await getDoc(doc(db, "Users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        toast.success('Login successful!');
        if (userData.role === "admin") {
          navigate('/admin-dashboard'); // Navigate to admin dashboard
        } else {
          navigate('/user-form'); // Navigate to user form
        }
      } else {
        toast.error("No user data found");
      }
    } catch (error) {
      console.error("Error logging in", error);
      toast.error("Failed to log in. Please check your credentials and try again.");
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-form-container">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
          </form>
          <div>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
            <p>
              Forgot your password? <Link to="/forgot-password">Reset Password</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="login-image-container">
        {/* Optionally include an image here or rely on the background image */}
      </div>
    </div>
  );
}

export default LoginPage;
