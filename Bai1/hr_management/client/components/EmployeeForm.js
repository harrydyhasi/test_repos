import React, { useState, useEffect } from 'react';

function EmployeeForm({ onAdd, editingEmployee }) {
    const [employee, setEmployee] = useState({
        employeeId: '', name: '', position: '', salary: '', startDate: '', department: '', allowances: ''
    });

    useEffect(() => {
        if (editingEmployee) {
            setEmployee(editingEmployee);
        }
    }, [editingEmployee]);

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onAdd(employee);
        setEmployee({ employeeId: '', name: '', position: '', salary: '', startDate: '', department: '', allowances: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="employeeId" placeholder="Employee ID" onChange={handleChange} value={employee.employeeId || ''} />
            <input name="name" placeholder="Name" onChange={handleChange} value={employee.name || ''} />
            <input name="position" placeholder="Position" onChange={handleChange} value={employee.position || ''} />
            <input name="salary" placeholder="Salary" type="number" onChange={handleChange} value={employee.salary || ''} />
            <input name="startDate" placeholder="Start Date" type="date" onChange={handleChange} value={employee.startDate || ''} />
            <input name="department" placeholder="Department" onChange={handleChange} value={employee.department || ''} />
            <input name="allowances" placeholder="Allowances" type="number" onChange={handleChange} value={employee.allowances || ''} />
            <button type="submit">{editingEmployee ? 'Update Employee' : 'Add Employee'}</button>
        </form>
    );
}

export default EmployeeForm;
