import { Request, Response } from "express";
import RestaurantModel from "../models/restaurantModel";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

export const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await RestaurantModel.findOne({
      user: req.userId,
    });

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
        success: false,
      });
    }

    return res.json(restaurant);
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).json({ message: "Error while fecthing restaurant" });
  }
};

export const createMyRestaurant = async (req: Request, res: Response) => {
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

    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required",
        success: false,
      });
    }

    // const image = req.file as Express.Multer.File;
    // const base64Image = Buffer.from(image.buffer).toString("base64");
    // const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    // const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const restaurant = new RestaurantModel(req.body);
    restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
    if (restaurant) {
      console.log("Restaurant created successfully:", restaurant);
    }
    await restaurant.save();

    return res.status(200).json({
      message: "Restaurant created successfully",
      success: true,
      restaurant,
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await RestaurantModel.findOne({
      user: req.userId,
    });

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
        success: false,
      });
    }

    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();

    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      restaurant.imageUrl = imageUrl;
    }

    await restaurant.save();
    res.status(200).json(restaurant);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

  return uploadResponse.url;
};
