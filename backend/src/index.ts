import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { confidential } from "./secret/confidential";
import { v2 as cloudinary } from "cloudinary";
import restaurantRouter from "./routes/restaurantRouter";
import userRouter from "./routes/userRouter";

const { mongodbConnectionString, port } = confidential();

mongoose
  .connect(mongodbConnectionString as string)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.error("Error connecting to Database:", err);
  });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req: Request, res: Response) => {
  res.send({ message: "Health ok!" });
});

app.use("/api/v1/user", userRouter.userRouter);
app.use("/api/v1/restaurant", restaurantRouter.restaurantRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
