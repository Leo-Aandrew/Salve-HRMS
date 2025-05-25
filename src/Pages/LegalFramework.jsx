import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import "../Styles/LegalFramework.css";

const LegalFramework = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyId: "",
    address: "",
    businessType: "",
    legalState: "",
    document: null,
    documentDate: "", 
  });

  const [documents, setDocuments] = useState([
    {
      name: "Business registration document",
      type: "Legal",
      date: "22-02-2025",
    },
  ]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmitInfo = () => {
    alert("Company Info Submitted Successfully!");
  };

  const handleUploadDocument = () => {
    if (formData.document) {
      const formattedDate = formData.documentDate
        ? new Date(formData.documentDate).toLocaleDateString("en-GB")
        : new Date().toLocaleDateString("en-GB");

      const newDoc = {
        name: formData.document.name,
        type: "Legal",
        date: formattedDate,
      };
      setDocuments([...documents, newDoc]);

   
      setFormData({
        ...formData,
        document: null,
        documentDate: "",
      });
    }
  };

  const handleDelete = (index) => {
    const updatedDocs = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocs);
  };

  const handleRegistration = () => {
    alert("Registration Submitted Successfully!");
  };

  return (
    <div>
      <Navbar />
      <div className="legal-framework-container">
        <div className="company-registration">
          <h3>Company Registration</h3>
          <form>
            <label>Company Name:</label>
            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />

            <label>Company ID:</label>
            <input type="text" name="companyId" value={formData.companyId} onChange={handleChange} />

            <label>Company Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />

            <label>Business type:</label>
            <input type="text" name="businessType" value={formData.businessType} onChange={handleChange} />

            <label>Legal State:</label>
            <input type="text" name="legalState" value={formData.legalState} onChange={handleChange} />

            <label>Upload Documents:</label>
            <input type="file" name="document" onChange={handleChange} />

            <label>Document Date:</label>
            <input type="date" name="documentDate" value={formData.documentDate} onChange={handleChange} />

            <button type="button" className="submit-info" onClick={handleSubmitInfo}>Submit Info</button>
          </form>
        </div>

        <div className="document-management">
          <h3>Document Management</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Document Type</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={index}>
                  <td>{doc.name}</td>
                  <td>{doc.type}</td>
                  <td>{doc.date}</td>
                  <td>
                    <button className="delete-btn1" onClick={() => handleDelete(index)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="actions">
            <button className="upload-btn" onClick={handleUploadDocument}>
              Upload Document
            </button>
            <button className="submit-reg-btn" onClick={handleRegistration}>
              Submit Registration
            </button>
          </div>

          <div className="legal-support">
            <h3>Legal Support</h3>
            <button className="faq-btn">View FAQ's</button>
            <button className="contact-btn">Contact Legal Expert</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalFramework;
