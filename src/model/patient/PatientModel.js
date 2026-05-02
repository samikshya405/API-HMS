import mongoose from "mongoose";
import PatientSchema from "./PatientSchema.js";

// Create the Patient model
const Patient = mongoose.model("Patient", PatientSchema);

// Function to insert a new patient
export const insertPatient = (patientDetails) => {
    return Patient(patientDetails).save();
};

// Function to get a list of all patients
export const getPatients = () => {
    return Patient.find(); // This will return a promise that resolves to the list of all patients
};

export default Patient;