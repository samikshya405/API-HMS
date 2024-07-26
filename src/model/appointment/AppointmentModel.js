import AppointmentSchema from "./AppointmentSchema.js"

export const insertAppointment=(appointmentDetails)=>{
    return AppointmentSchema.save()

}
export const getAppointment=()=>{
    return AppointmentSchema.find()
}