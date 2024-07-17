import DepartmentSchema from "./DepartmentSchema.js";

export const insertDepartment = (obj) => {
  return DepartmentSchema(obj).save();
};

export const getDepartment = () => {
  return DepartmentSchema.find();
};

export const updateDepartment=(id,updates)=>{
    return DepartmentSchema.findByIdAndUpdate(id, updates, { new: true });
}
export const deleteDepartment=(id)=>{
  return DepartmentSchema.findByIdAndDelete(id)
}