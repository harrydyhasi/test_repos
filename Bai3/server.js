const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/eventRegistrationDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Registration Schema
const registrationSchema = new mongoose.Schema({
  eventName: String,
  participantName: String,
  email: String,
  registrationDate: { type: Date, default: Date.now },
});

const Registration = mongoose.model("Registration", registrationSchema);

// CRUD Routes
app.get("/registrations", async (req, res) => {
  const registrations = await Registration.find();
  res.send(registrations);
});

app.post("/registrations", async (req, res) => {
  const registration = new Registration(req.body);
  await registration.save();
  res.status(201).send(registration);
});

app.put("/registrations/:id", async (req, res) => {
  const registration = await Registration.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(registration);
});

app.delete("/registrations/:id", async (req, res) => {
  await Registration.findByIdAndDelete(req.params.id);
  res.send({ message: "Registration deleted" });
});

// Start Server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
