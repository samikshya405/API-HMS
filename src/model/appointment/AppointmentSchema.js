import mongoose from "mongoose";
const AppointmentSchema = new mongoose.Schema({
  patientName: String,
  doctorName: String,
  doctorId: String, // New field to link to doctor
  date: Date,
  time: String,
  reason: String,
});
export default mongoose.model("Appointment", AppointmentSchema);
