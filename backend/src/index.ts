import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { confidential } from "./secret/confidential";
import { v2 as cloudinary } from "cloudinary";
import restaurantRouter from "./routes/MyRestaurantRoute";
import userRouter from "./routes/UserRoute";
import MyRestaurantRoute from "./routes/MyRestaurantRoute";
import UserRoute from "./routes/UserRoute";
import RestaurantRoute from "./routes/RestaurantRoute";

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

app.use("/api/v1/user", UserRoute.userRouter);
app.use("/api/v1/restaurant", MyRestaurantRoute.restaurantRouter);
app.use("/api/v1/restaurant", RestaurantRoute.restaurantRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
