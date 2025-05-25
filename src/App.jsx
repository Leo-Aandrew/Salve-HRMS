import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import EmployeeData from "./Pages/EmployeeData";
import Dashboard from "./Pages/Dashboard";
import PayrollPage from "./Pages/Payroll";
import LeaveManagement from "./Pages/LeaveManagement";
import LegalFramework from "./Pages/LegalFramework";
import UserSupport from "./Pages/UserSupport";

const App = () => {
  return (
    <Router basename="/Salve-HRMS">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employee-data" element={<EmployeeData />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/payroll" element={<PayrollPage/>}/>
        <Route path="/legal" element={<LegalFramework/>}/>
        <Route path="/leave" element={<LeaveManagement/>}/>
        <Route path="/support" element={<UserSupport/>}/>
      </Routes>
    </Router>
  );
};

export default App;
