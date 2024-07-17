import EmployeeSchema from "./EmployeeSchema.js"

export const onBoardEmployee=(employeeDetails)=>{
    return EmployeeSchema(employeeDetails).save()
}