import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.error("Error connecting to Database:", err);
  });

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRoute.userRoute);

app.listen(7000, () => {
  console.log("Server is running on http://localhost:7000");
});
