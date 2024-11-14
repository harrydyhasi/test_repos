const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/hr_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Employee Model
const EmployeeSchema = new mongoose.Schema({
    employeeId: String,
    name: String,
    position: String,
    salary: Number,
    startDate: Date,
    department: String,
    allowances: Number
});
const Employee = mongoose.model('Employee', EmployeeSchema);

// CRUD Routes
app.post('/employees', async (req, res) => {
    const employee = new Employee(req.body);
    await employee.save();
    res.send(employee);
});

app.get('/employees', async (req, res) => {
    const { name, employeeId } = req.query;
    let filter = {};
    if (name) filter.name = new RegExp(name, 'i');
    if (employeeId) filter.employeeId = employeeId;
    const employees = await Employee.find(filter);
    res.send(employees);
});

app.put('/employees/:id', async (req, res) => {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(employee);
});

app.delete('/employees/:id', async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.send({ message: 'Employee deleted' });
});

// Calculate Monthly Salary
app.get('/employees/:id/salary', async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
        const monthlySalary = employee.salary + (employee.allowances || 0);
        res.send({ monthlySalary });
    } else {
        res.status(404).send({ message: 'Employee not found' });
    }
});

// Start Server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
