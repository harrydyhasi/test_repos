import React, { useState, useEffect } from "react";
import axios from "axios";
import './Employee.css';
const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", position: "", department: "", salary: 0 });
  const [search, setSearch] = useState("");

  // Fetch all employees
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Handle form submission for adding/updating an employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form._id) {
        await axios.put(`http://localhost:5000/employees/${form._id}`, form);
      } else {
        await axios.post("http://localhost:5000/employees", form);
      }
      fetchEmployees();
      setForm({ name: "", position: "", department: "", salary: 0 });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle delete employee
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Handle edit button click
  const handleEdit = (employee) => {
    setForm(employee);
  };

  // Handle search input and filter results
  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employees");
      const filtered = response.data.filter(
        (employee) =>
          employee.name.toLowerCase().includes(search.toLowerCase()) ||
          employee.position.toLowerCase().includes(search.toLowerCase())
      );
      setEmployees(filtered);
    } catch (error) {
      console.error("Error searching employees:", error);
    }
  };

  return (
    <div>
      <h1>Employee Management</h1>

      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search by name or position"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Form for Adding/Editing Employees */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Position"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Salary"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: Number(e.target.value) })}
          required
        />
        <button type="submit">{form._id ? "Update" : "Add"} Employee</button>
      </form>

      {/* Employee Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>
              <td>
                <button onClick={() => handleEdit(employee)}>Edit</button>
                <button onClick={() => handleDelete(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
