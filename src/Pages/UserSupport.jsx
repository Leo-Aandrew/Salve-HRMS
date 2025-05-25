import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import "../Styles/UserSupport.css";

const UserSupport = () => {
  const [leaveType, setLeaveType] = useState("");
  const [description, setDescription] = useState("");
  const [faqExpanded, setFaqExpanded] = useState([false, false, false]);

  const ticketData = [
    {
      id: "12120012",
      issue: "document",
      status: "cleared",
    },
  ];

  const faqs = [
    { question: "question 1", answer: "?" },
    { question: "question 2", answer: "?" },
    { question: "question 3", answer: "?" },
  ];

  const handleFaqToggle = (index) => {
    const updated = faqExpanded.map((val, i) => (i === index ? !val : val));
    setFaqExpanded(updated);
  };

  const handleSubmit = () => {
    if (leaveType && description) {
      alert("Support request submitted successfully!");
      setLeaveType("");
      setDescription("");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div>
        <Navbar/>
    <div className="support-container">
      <div className="support-left">
        <h3>Support Portal</h3>
        <div className="form-group">
          <label>Leave Type:</label>
          <input
            type="text"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Submit Request
        </button>

        <div className="contact-info">
          <h4>Contact Info</h4>
          <p>Feel free to contact us,</p>
          <p>Email: company33@gmail.com</p>
          <p>Phone: +00 1221 1211 12</p>
        </div>
      </div>

      <div className="support-right">
        <div className="faq-section">
          <h4>Frequently Asked Questions ( FAQ's )</h4>
          {faqs.map((faq, index) => (
            <div key={index} className="faq">
              <div
                className="faq-question"
                onClick={() => handleFaqToggle(index)}
              >
                {faq.question}
                <span>{faqExpanded[index] ? "▲" : "▼"}</span>
              </div>
              {faqExpanded[index] && <div className="faq-answer">{faq.answer}</div>}
            </div>
          ))}
        </div>

        <div className="ticketing-section">
          <h4>Ticketing System</h4>
          <table>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Issue Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ticketData.map((ticket, i) => (
                <tr key={i}>
                  <td>{ticket.id}</td>
                  <td>{ticket.issue}</td>
                  <td>{ticket.status}</td>
                  <td>👁️</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserSupport;
