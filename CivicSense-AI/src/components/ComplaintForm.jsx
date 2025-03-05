import React, { useState } from "react";
import axios from "axios";
import { officialsData } from "../data/official";
import { useNavigate } from "react-router-dom";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    complaint_text: "",
    location: "",
  });

  const [loading,isLoading]=useState(false)

  const navigate=useNavigate()

  const [complaints, setComplaints] = useState(null);
  const [message, setMessage] = useState("");

  // ✅ Fix: Corrected `name="location"` in `select`
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.complaint_text.trim()) {
      setMessage("Complaint text cannot be empty.");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/complaints`, {
        complaint_text: formData.complaint_text,
        location: formData.location,
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Send token in header
        }
    });
      if (res.status === 201) {
        setComplaints(res.data.complaint);

        // ✅ Fix: Ensure official exists before accessing email
        const official = officialsData.find((official) => official.location === formData.location).email;
        console.log(official);
        
        // if (official && official.email) {
          console.log("Sending email to:", official.email);
          
          await axios.post(`${import.meta.env.VITE_BASE_URL}/send-email`, {
            email: official.email,
            complaint_text: formData.complaint_text,
          }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Send token in header
            }
        });
        // }

        setMessage(res.data.message);
        navigate("/")
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Submit a Complaint</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            name="complaint_text"
            placeholder="Enter your complaint..."
            value={formData.complaint_text}
            onChange={handleChange}
          ></textarea>

          {/* ✅ Fix: Correct `name` attribute from "Location" to "location" */}
          <select
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="location"
            value={formData.location}
            onChange={handleChange}
          >
            <option value="">Select Location</option>
            {officialsData.map((official) => (
              <option key={official.location} value={official.location}>
                {official.location}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="mt-4 w-full bg-[#10B981] text-white py-2 rounded-md hover:bg-[#059669] transition"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
        {message && <p className="text-center text-sm text-gray-600 mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default ComplaintForm;
