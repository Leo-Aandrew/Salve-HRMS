import React, { useState } from "react";
import * as XLSX from "xlsx";
import Navbar from "../Components/Navbar";
import "../Styles/Employee.css";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const EmployeeData = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Leo Aandrew", jobRole: "Frontend Developer", department: "Development", email: "andrewleo173@gmail.com" },
    { id: 2, name: "Azar", jobRole: "Designer", department: "Designing", email: "azar@example.com" },
    { id: 3, name: "Gokul", jobRole: "Tester", department: "Testing", email: "gokul@gmail.com" },
    { id: 4, name: "Raja", jobRole: "Backend Developer", department: "Development", email: "raja@example.com" }
  ]);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    jobRole: "",
    department: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const departmentCount = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setEmployees(employees.map((emp) => (emp.id === formData.id ? formData : emp)));
    } else {
      setEmployees([...employees, { ...formData, id: employees.length + 1 }]);
    }
    setFormData({ id: "", name: "", jobRole: "", department: "", email: "" });
    setIsEditing(false);
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };


  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = (e) => {
      const binaryData = e.target.result;
      const workbook = XLSX.read(binaryData, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; 
      const sheet = workbook.Sheets[sheetName];


      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const formattedData = jsonData.map((emp, index) => ({
        id: employees.length + index + 1,
        name: emp.Name,
        jobRole: emp["Job Role"],
        department: emp.Department,
        email: emp.Email
      }));

      setEmployees([...employees, ...formattedData]);
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };


  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(employees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    XLSX.writeFile(workbook, "EmployeeData.xlsx"); 
  };


  const pieData = {
    labels: Object.keys(departmentCount),
    datasets: [
      {
        data: Object.values(departmentCount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <div>
      <nav className="item1"><Navbar /></nav>
      <div className="employee-container">
        <div className="item2">
          <h2>Employee Management</h2>
          <p>Total Count Of the Employees Based on Department</p>
          <div className="pie"><Pie data={pieData} /></div>
        </div>

        <div className="item3">
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Employee Name" value={formData.name} onChange={handleChange} required />
            <input type="text" name="jobRole" placeholder="Job Role" value={formData.jobRole} onChange={handleChange} required />
            <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <button type="submit">{isEditing ? "Update" : "Add"} Employee</button>
          </form>

     

          <label htmlFor="file-upload" className="import-button">
            IMPORT
            <input
              type="file"
              id="file-upload"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </label>

         

          <label htmlFor="file-upload" className="import-button">
            EXPORT
            <input
              type="file"
              id="file-upload"
              accept=".xlsx, .xls"
              onChange={handleExport}
              style={{ display: "none" }}
            />
          </label>
        

        </div>

        <div className="item4">
          <h2>Employee List</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Job Role</th>
                <th>Department</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.jobRole}</td>
                  <td>{employee.department}</td>
                  <td>{employee.email}</td>
                  <td>
                    <button onClick={() => handleEdit(employee)}>✏️ Edit</button>
                    <button onClick={() => handleDelete(employee.id)}>🗑️ Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeData;
