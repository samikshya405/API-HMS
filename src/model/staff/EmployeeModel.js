import EmployeeSchema from "./EmployeeSchema.js"

export const onBoardEmployee=(employeeDetails)=>{
    return EmployeeSchema(employeeDetails).save()
}

export const getEmployeeList=()=>{
    return EmployeeSchema.find()
}
export const deleteEmployee=(id)=>{
    return EmployeeSchema.findByIdAndDelete(id)
}
export const updateProfile=(id, updates)=>{
    return EmployeeSchema.findByIdAndUpdate(id, updates, { new: true })
}