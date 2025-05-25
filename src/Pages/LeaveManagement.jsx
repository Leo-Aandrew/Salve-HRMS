import React, { useState } from "react";
import Navbar from "../Components/Navbar"
import "../Styles/LeaveManagement.css";

const LeaveManagement = () => {
 
  const [leaveData, setLeaveData] = useState({
    employeeId: "",
    department: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    status: "Pending",
  });


  const [leaveBalance, setLeaveBalance] = useState({
    annualLeave: 12,
    sickLeave: 12,
    casualLeave: 12,
  });


  const [leaveRequests, setLeaveRequests] = useState([]);


  const [leaveHistory, setLeaveHistory] = useState([]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = () => {
    setLeaveRequests([...leaveRequests, leaveData]);
    setLeaveData({
      employeeId: "",
      department: "",
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
      status: "Pending",
    });
  };

 
  const handleStatusChange = (index, newStatus) => {
    const updatedRequests = [...leaveRequests];
    const approvedLeave = updatedRequests[index];

    if (newStatus === "Approved") {
   
      setLeaveBalance((prevBalance) => {
        const updatedBalance = { ...prevBalance };
        if (approvedLeave.leaveType === "Annual Leave") {
          updatedBalance.annualLeave -= 1;
        } else if (approvedLeave.leaveType === "Sick Leave") {
          updatedBalance.sickLeave -= 1;
        } else if (approvedLeave.leaveType === "Casual Leave") {
          updatedBalance.casualLeave -= 1;
        }
        return updatedBalance;
      });

    
      setLeaveHistory([...leaveHistory, { ...approvedLeave, status: "Approved" }]);
    }


    updatedRequests.splice(index, 1);
    setLeaveRequests(updatedRequests);
  };

  return (
    <div>
      <Navbar />
      <div className="leave-container">
     

        <div className="leave-form">
          <h2>Leave Application</h2>
          <label>Employee ID:</label>
          <input type="text" name="employeeId" value={leaveData.employeeId} onChange={handleInputChange} />

          <label>Department:</label>
          <input type="text" name="department" value={leaveData.department} onChange={handleInputChange} />

          <label>Leave Type:</label>
          <select name="leaveType" value={leaveData.leaveType} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="Annual Leave">Annual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
          </select>

          <label>Start Date:</label>
          <input type="date" name="startDate" value={leaveData.startDate} onChange={handleInputChange} />

          <label>End Date:</label>
          <input type="date" name="endDate" value={leaveData.endDate} onChange={handleInputChange} />

          <label>Reason:</label>
          <textarea name="reason" value={leaveData.reason} onChange={handleInputChange}></textarea>

          <button className="submit-btn" onClick={handleSubmit}>Submit Application</button>
        </div>


        <div className="leave-summary">
          <h3>Leave Balance</h3>
          <p>Annual Leave: 20 Days ({leaveBalance.annualLeave} Remains)</p>
          <p>Sick Leave: 20 Days ({leaveBalance.sickLeave} Remains)</p>
          <p>Casual Leave: 20 Days ({leaveBalance.casualLeave} Remains)</p>

          <h3>Manager's Leave Approval</h3>
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request, index) => (
                <tr key={index}>
                  <td>{request.employeeId}</td>
                  <td>{request.startDate}</td>
                  <td>{request.endDate}</td>
                  <td>
                    <button className="approve-btn" onClick={() => handleStatusChange(index, "Approved")}>✔️</button>
                    <button className="reject-btn" onClick={() => handleStatusChange(index, "Rejected")}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Leave History</h3>
          <table>
            <thead>
              <tr>
                <th>Sno</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveHistory.map((leave, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{leave.leaveType}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
