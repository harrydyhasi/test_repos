const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/employeeDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Employee Schema
const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  department: String,
  salary: Number,
});

const Employee = mongoose.model("Employee", employeeSchema);

// CRUD Routes
app.get("/employees", async (req, res) => {
  const employees = await Employee.find();
  res.send(employees);
});

app.post("/employees", async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.status(201).send(employee);
});

app.put("/employees/:id", async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(employee);
});

app.delete("/employees/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.send({ message: "Employee deleted" });
});

// Start Server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
