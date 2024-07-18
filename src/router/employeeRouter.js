import express from "express";
import {
  deleteEmployee,
  getEmployeeList,
  onBoardEmployee,
  updateProfile,
} from "../model/staff/EmployeeModel.js";
import { sendEmail } from "../middleware/sendMail.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const userDetails = req.body;
  try {
    const result = await onBoardEmployee({
      ...userDetails,
      isPasswordReset: false,
    });
    result._id &&
      (await sendEmail(userDetails.fName, userDetails.email).catch(
        console.error
      ));
    result._id
      ? res.json({
          status: "success",
          message: "employee added to the database",
        })
      : res.json({
          status: "error",
          message: "Failed adding employee. Something went wrong",
        });
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const employeeList = await getEmployeeList();

    if (employeeList) {
      res.json({
        status: "success",
        employeeList,
      });
    } else {
      res.json({
        status: "error",
        message: "Something went wrong. Couldn't fetch data",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteEmployee(id);
    console.log(response);
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
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await updateProfile(id, req.body);
    if (!response) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({
      message: "Profile information  updated successfully",
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
