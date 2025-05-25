import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../Services/Auth";
import "../Styles/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      alert(data.message);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed: " + error);
    }
  };

  return (
    <div className="auth-container">

      <div className="welcome-section">
        <img src="SalveHR_LOGO.jpeg" alt="SalveHRMS Logo" className="logo" />
        <h2>WELCOME BACK TO SALVE HRMS</h2>
        <p>Expert HR and Legal services for all businesses</p>
      </div>

      <div className="line"> </div>

      <div className="form-section">
        <h2>LOGIN</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">LOGIN</button>
        </form>

        <div className="links">
          <p>Don't have an account?<Link to="/register">Register Now</Link></p>
        </div>
        <Link to="/dashboard">Dashboard</Link>
      </div>

    </div>
  );
};

export default Login;
