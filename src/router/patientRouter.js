import express from "express";
import { insertPatient, getPatients } from "../model/patient/PatientModel.js";

const router = express.Router();

// Route to handle posting a new patient
router.post("/", async (req, res) => {
    try {
        const result = await insertPatient(req.body);

        if (result?._id) {
            return res.status(201).json({
                status: "success",
                message: "Patient added to the database",
            });
        } else {
            return res.status(500).json({
                status: "error",
                message: "Something went wrong, please try again later",
            });
        }
    } catch (error) {
        console.error("Error inserting patient:", error);
        return res.status(500).json({
            status: "error",
            message:
                "An error occurred while adding the patient. Please try again later.",
        });
    }
});

// Route to fetch all patients
router.get("/", async (req, res) => {
    try {
        const patients = await getPatients();
        if (patients && patients.length > 0) {
            return res.status(200).json({
                status: "success",
                patients,
            });
        } else {
            return res.status(404).json({
                status: "error",
                message: "No patients found",
            });
        }
    } catch (error) {
        console.error("Error fetching patients:", error);
        return res.status(500).json({
            status: "error",
            message:
                "An error occurred while fetching patients. Please try again later.",
        });
    }
});

export default router;