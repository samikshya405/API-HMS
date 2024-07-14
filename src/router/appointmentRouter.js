import express from "express";

const router = express.Router()

// Fetch doctors
app.get('/api/doctors', (req, res) => {
    Doctor.find()
        .then(doctors => res.json(doctors))
        .catch(err => res.status(400).json(err));
});

// Check appointment availability
app.post('/api/check-availability', (req, res) => {
    const { doctorId, date, time } = req.body;

    Appointment.find({ doctorId, date })
        .then(appointments => {
            const timeSlotTaken = appointments.some(appointment => appointment.time === time);
            if (timeSlotTaken) {
                res.json({ available: false });
            } else {
                res.json({ available: true });
            }
        })
        .catch(err => res.status(400).json(err));
});

export default router