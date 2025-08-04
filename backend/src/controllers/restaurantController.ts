import { Request, Response } from "express";
import RestaurantModel from "../models/restaurantModel";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await RestaurantModel.findOne({
      user: req.userId,
    });

    if (existingRestaurant) {
      return res.status(409).json({
        message: "Restaurant already exists for this user",
        success: false,
      });
    }

    const image = req.file as Express.Multer.File;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    const restaurant = new RestaurantModel(req.body);
    restaurant.imageUrl = uploadResponse.url;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
    await restaurant.save();
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
