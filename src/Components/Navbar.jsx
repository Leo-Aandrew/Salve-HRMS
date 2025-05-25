import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>SalveHRMS</h2>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/employee-data">Employee Data</Link></li>
        <li><Link to="/payroll">Payroll</Link></li>
        <li><Link to="/legal">Legal Framework</Link></li>
        <li><Link to="/leave">Leave Management</Link></li>
        <li><Link to="/support">User Support</Link></li>
      </ul>
      <div className="profile-icon">
        <Link to="/login"> 👤 </Link>
      </div>
    </nav>
  );
};

export default Navbar;
     







