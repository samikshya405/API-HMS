import express from "express";
import {
  deleteDepartment,
  getDepartment,
  insertDepartment,
  updateDepartment,
} from "../model/staff/DepartmentModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const result = await insertDepartment(req.body);

    result._id
      ? res.json({
          message: "Department has been added",
          status: "success",
        })
      : res.json({
          message: "failed to add department",
          status: "failed",
        });
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const department = await getDepartment();
   
    if (department) {
      res.json({
        status: "success",
        department,
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "Failed to load department",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedDepartment = await updateDepartment(id, updates);

    if (!updatedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json({ message: "Department updated successfully", status: "success" });
  } catch (error) {
    console.error("Error updating department:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteDepartment(id);

    if (response) {
      res.json({
        status: "success",
        message: "Department has been deleted successfully",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Department not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
export default router;
