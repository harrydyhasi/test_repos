import React from 'react';

function EmployeeList({ employees, onEdit, onDelete }) {
    return (
        <div>
            <h3>Employee List</h3>
            <ul className="employee-list">
                {employees.map(emp => (
                    <li key={emp._id} className="employee-item">
                        <div className="employee-info">
                            <p>{emp.name} - {emp.position} - {emp.department}</p>
                            <p>Monthly Salary: ${parseFloat(emp.salary) + parseFloat(emp.allowances || 0)}</p>
                        </div>
                        <div>
                            <button className="edit-btn" onClick={() => onEdit(emp)}>Edit</button>
                            <button className="delete-btn" onClick={() => onDelete(emp._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EmployeeList;
