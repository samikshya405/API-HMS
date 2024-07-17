import express from "express";
import "dotenv/config.js";
import cors from "cors";
import { connectMongo } from "./src/config/connectMongo.js";
import userRouter from "./src/router/userRouter.js";
import departmentRouter from "./src/router/departmentRouter.js";
import employeeRouter from "./src/router/employeeRouter.js";

const app = express();

app.use(cors());

connectMongo();

const PORT = process.env.PORT || 8002;

import morgan from "morgan";
console.log(process.env.EMAIL_USER);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/department", departmentRouter);
app.use("/api/v1/employees", employeeRouter);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log("server is running in port", PORT);
});
