import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../Services/Auth";
import "../Styles/Auth.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(firstName, lastName, email, password);
      alert(data.message);
      navigate("/login");
    } catch (error) {
      alert("Registration failed: " + error);
    }
  };

  return (
    <div className="auth-container">

      <div className="welcome-section">
        <img src="SalveHR_LOGO.jpeg" alt="SalveHRMS Logo" className="logo" />
        <h2>WELCOME TO SALVE HRMS</h2>
        <p>Expert HR and Legal services for all businesses</p>
      </div>

      <div className="line"> </div>

      <div className="form-section">
        <h2>REGISTER</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Sign Up</button>
        </form>

        <div className="links">
          <p>Already have an account?<Link to="/login">Log in</Link></p>
        </div>

      </div>

    </div>

  );
};

export default Register;
