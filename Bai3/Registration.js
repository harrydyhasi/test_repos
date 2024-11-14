import React, { useState, useEffect } from "react";
import axios from "axios";
import './Registration.css'; // Import CSS for styling

const Registration = () => {
  const [registrations, setRegistrations] = useState([]);
  const [form, setForm] = useState({ eventName: "", participantName: "", email: "" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    const response = await axios.get("http://localhost:5000/registrations");
    setRegistrations(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form._id) {
      await axios.put(`http://localhost:5000/registrations/${form._id}`, form);
    } else {
      await axios.post("http://localhost:5000/registrations", form);
    }
    fetchRegistrations();
    setForm({ eventName: "", participantName: "", email: "" });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/registrations/${id}`);
    fetchRegistrations();
  };

  const handleEdit = (registration) => {
    setForm(registration);
  };

  const handleSearch = () => {
    const filtered = registrations.filter((registration) =>
      registration.participantName.toLowerCase().includes(search.toLowerCase()) ||
      registration.eventName.toLowerCase().includes(search.toLowerCase())
    );
    setRegistrations(filtered);
  };

  return (
    <div>
      <h1>Event Registration Management</h1>

      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search by participant name or event name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Form for Adding/Editing Registration */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={form.eventName}
          onChange={(e) => setForm({ ...form, eventName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Participant Name"
          value={form.participantName}
          onChange={(e) => setForm({ ...form, participantName: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <button type="submit">{form._id ? "Update" : "Add"} Registration</button>
      </form>

      {/* Registration List Table */}
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Participant Name</th>
            <th>Email</th>
            <th>Registration Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration) => (
            <tr key={registration._id}>
              <td>{registration.eventName}</td>
              <td>{registration.participantName}</td>
              <td>{registration.email}</td>
              <td>{new Date(registration.registrationDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(registration)}>Edit</button>
                <button onClick={() => handleDelete(registration._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Registration;
