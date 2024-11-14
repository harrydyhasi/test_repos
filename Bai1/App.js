import React, { useState, useEffect } from 'react';
import './App.css';
import EmployeeForm from './hr_management/client/components/EmployeeForm';
import EmployeeList from './hr_management/client/components/EmployeeList';
import { getEmployees, updateEmployee } from './hr_management/server/api';

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchEmployees() {
      const data = await getEmployees();
      setEmployees(data);
    }
    fetchEmployees();
  }, []);

  const handleAddEmployee = async (employee) => {
    if (editingEmployee) {
      const updatedEmployee = await updateEmployee(editingEmployee._id, employee);
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) => (emp._id === updatedEmployee._id ? updatedEmployee : emp))
      );
      setEditingEmployee(null);
    } else {
      setEmployees((prevEmployees) => [...prevEmployees, employee]);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp._id !== id));
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>HR Management System</h1>
      <input
        type="text"
        placeholder="Search by name or ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '8px', width: '100%' }}
      />
      <div className="form-container">
        <EmployeeForm onAdd={handleAddEmployee} editingEmployee={editingEmployee} />
      </div>
      <EmployeeList employees={filteredEmployees} onEdit={handleEditEmployee} onDelete={handleDeleteEmployee} />
    </div>
  );
}

export default App;
