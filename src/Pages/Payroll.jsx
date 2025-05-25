import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "../Styles/Payroll.css";

const PayrollPage = () => {
  const [payrollData, setPayrollData] = useState({
    employeeId: "001",
    name: "Leo Aandrew",
    hoursWorked: 192,
    overtime: 0,
    taxDeductions: 1800,
    otherDeductions: 218,
    baseSalary: 25098,
    netSalary: 23000,
    deduction: 0,
  });

  const [processedList, setProcessedList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayrollData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCalculate = () => {
    const baseSalary = Number(payrollData.baseSalary);
    const totalDeductions = Number(payrollData.taxDeductions) + Number(payrollData.otherDeductions);
    const netSalary = baseSalary - totalDeductions;

    setPayrollData((prev) => ({
      ...prev,
      baseSalary,
      deduction: totalDeductions,
      netSalary,
    }));
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      const updatedList = [...processedList];
      updatedList[editIndex] = payrollData;
      setProcessedList(updatedList);
      setEditIndex(null);
    } else {
      setProcessedList([...processedList, payrollData]);
    }

    resetForm();
  };

  const handleEdit = (index) => {
    setPayrollData(processedList[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedList = processedList.filter((_, i) => i !== index);
    setProcessedList(updatedList);
    if (editIndex === index) {
      resetForm();
      setEditIndex(null);
    }
  };

  const handleExportXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(processedList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payroll Data");
    XLSX.writeFile(workbook, "PayrollData.xlsx");
  };

  const resetForm = () => {
    setPayrollData({
      employeeId: "",
      name: "",
      hoursWorked: 0,
      overtime: 0,
      taxDeductions: 0,
      otherDeductions: 0,
      baseSalary: 0,
      netSalary: 0,
      deduction: 0,
    });
  };

  const handleGeneratePayslip = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Salve HRMS", 80, 20);
    doc.setFontSize(14);
    doc.text("Payroll Payslip", 85, 30);
    doc.setFontSize(12);
    doc.text(`Employee ID: ${payrollData.employeeId}`, 15, 50);
    doc.text(`Employee Name: ${payrollData.name}`, 15, 60);
    doc.text(`Hours Worked: ${payrollData.hoursWorked}`, 15, 70);
    doc.text(`Overtime Hours: ${payrollData.overtime}`, 15, 80);
    doc.text(`Base Salary: ₹${payrollData.baseSalary}`, 15, 90);
    doc.text(`Deductions: ₹${payrollData.deduction}`, 15, 100);
    doc.text(`Net Salary: ₹${payrollData.netSalary}`, 15, 110);
    doc.text("Thank you for your service!", 75, 130);
    doc.save(`Payslip_${payrollData.employeeId}.pdf`);
  };

  return (
    <div>
      <nav className="item1"><Navbar /></nav>
      <div className="payroll-container">
        <h2>Payroll Management</h2>

        <div className="summary-box">
          <div><h3>Payroll</h3><p>29 Calendar Days</p></div>
          <div><h3>Total Employees</h3><p>148 <span className="increase">+2</span></p></div>
          <div><h3>Working Days</h3><p>24</p></div>
          <div><h3>Payroll Processed</h3><p>132 / 150</p></div>
        </div>

        <div className="payroll-form">
          <div className="left-section">
            <label>Employee ID:</label>
            <input type="text" name="employeeId" value={payrollData.employeeId} onChange={handleInputChange} />
            <label>Employee Name:</label>
            <input type="text" name="name" value={payrollData.name} onChange={handleInputChange} />
            <label>Hours Worked:</label>
            <input type="number" name="hoursWorked" value={payrollData.hoursWorked} onChange={handleInputChange} />
            <label>Overtime:</label>
            <input type="number" name="overtime" value={payrollData.overtime} onChange={handleInputChange} />
            <label>Base Salary:</label>
            <input type="number" name="baseSalary" value={payrollData.baseSalary} onChange={handleInputChange} />
            <label>Tax Deductions:</label>
            <input type="number" name="taxDeductions" value={payrollData.taxDeductions} onChange={handleInputChange} />
            <label>Other Deductions:</label>
            <input type="number" name="otherDeductions" value={payrollData.otherDeductions} onChange={handleInputChange} />

            <button className="calculate-btn" onClick={handleCalculate}>CALCULATE</button>
            <button className="calculate-btn" onClick={handleSubmit}>
              {editIndex !== null ? "UPDATE" : "PROCESS"}
            </button>
          </div>

          <div className="right-section">
            <h2>Salary Breakdown</h2>
            <p>Base Salary: ₹{payrollData.baseSalary}</p>
            <p>Deduction: ₹{payrollData.deduction}</p>
            <p>Net Salary: ₹{payrollData.netSalary}</p>
            <button className="generate-payslip" onClick={handleGeneratePayslip}>Generate Payslip</button>
          </div>
        </div>

        <h2>Processed List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Deduction</th>
              <th>Net Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {processedList.map((data, index) => (
              <tr key={index}>
                <td>{data.employeeId}</td>
                <td>{data.name}</td>
                <td>{data.baseSalary}</td>
                <td>{data.deduction}</td>
                <td>{data.netSalary}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(index)}>✏️ Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(index)}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="export-btn" onClick={handleExportXLSX}>EXPORT</button>
      </div>
    </div>
  );
};

export default PayrollPage;
