import express from "express";
import {
  deleteEmployee,
  getEmployeeList,
  onBoardEmployee,
  updateProfile,
} from "../model/staff/EmployeeModel.js";
import { sendEmail } from "../middleware/sendMail.js";
import { decrypt, encrypt } from "../utilis/encrypt.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const userDetails = req.body;

  try {
    // Encrypt sensitive fields
    userDetails.email = encrypt(userDetails.email);
    userDetails.fName = encrypt(userDetails.fName);
    userDetails.lName = encrypt(userDetails.lName);
    userDetails.phone = encrypt(userDetails.phone); // If you have a phone field

    const result = await onBoardEmployee({
      ...userDetails,
      isPasswordReset: false,
    });

    // Decrypt the email before sending it in the response (if needed)
    const decryptedEmail = decrypt(userDetails.email);

    result._id &&
      (await sendEmail(userDetails.fName, decryptedEmail).catch(console.error));
    
    result._id
      ? res.json({
          status: "success",
          message: "Employee added to the database",
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
    let employeeList = await getEmployeeList();

    if (employeeList) {
      // Decrypt sensitive fields for each employee
      employeeList = employeeList.map((employee) => ({
        ...employee,
        email: decrypt(employee.email),
        fName: decrypt(employee.fName),
        lName: decrypt(employee.lName),
        phone: decrypt(employee.phone), // If you have a phone field
      }));
      console.log(employeeList, "this is employeelist");
      

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
  const updateData = req.body;

  try {
    // Encrypt any sensitive fields being updated
    if (updateData.email) updateData.email = encrypt(updateData.email);
    if (updateData.fName) updateData.fName = encrypt(updateData.fName);
    if (updateData.lName) updateData.lName = encrypt(updateData.lName);
    if (updateData.phone) updateData.phone = encrypt(updateData.phone); // If you have a phone field

    const response = await updateProfile(id, updateData);
    if (!response) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({
      message: "Profile information updated successfully",
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});


export default router;
