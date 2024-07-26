import rosterSchema from "./rosterSchema.js";

export const insertRoster = (rosterDetails) => {
  return rosterSchema(rosterDetails).save();
};

export const getRosterforAllstaff = () => {
  return rosterSchema.find();
};

export const getRosterBydeptAndDate = (department, date) => {
  return rosterSchema.find({
    department,
    $or: [{ startDate: date }, { endDate: date }],
  });
};

export const updateRoster = (id, changedRoster) => {
  return rosterSchema.findByIdAndUpdate(id, changedRoster);
};

export const deleteRosterByID = (id) => {
  return rosterSchema.findByIdAndDelete(id);
};
