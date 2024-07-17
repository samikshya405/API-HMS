import express from "express";
import { onBoardEmployee } from "../model/staff/EmployeeModel.js";
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

export default router;
