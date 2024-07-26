import express from "express";
import { getAppointment } from "../model/appointment/AppointmentModel.js";

const router = express.Router()



router.get('/',async(req,res)=>{
    try {
        const resposne = await getAppointment()
        res.json({
            status:"success",
            resposne
        })
        
    } catch (error) {
        console.log(error);
    }
})

export default router