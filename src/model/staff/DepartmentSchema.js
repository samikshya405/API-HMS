import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
  department: {
    type: String,
  },
});

export default mongoose.model("Department", DepartmentSchema);
