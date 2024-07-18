import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    mName: {
      type: String,
    },
    lName: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },
    employmentType: {
      type: String,
      reqired: true,
    },
    employeeId:{
      type:String,
      required:true
    },
    isPasswordReset:{
        type:Boolean,
        required:true
    }
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Employee", EmployeeSchema);
