import mongoose from "mongoose";

const rosterSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  staffName: {
    type: String,
    required: true
  }
});

export default mongoose.model("Roster", rosterSchema);
