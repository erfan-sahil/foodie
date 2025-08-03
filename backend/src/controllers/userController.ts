import { Request, Response } from "express";
import UserModel from "../models/userModel";

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await UserModel.findOne({ _id: req.userId });

    if (!currentUser) {
      res.status(404).json({
        msg: "User not found",
      });
    }

    res.send(currentUser);
  } catch (error) {
    console.error("Something error in getCurrentUser", error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await UserModel.findOne({ auth0Id });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const newUser = new UserModel(req.body);
    await newUser.save();

    res.status(200).json({
      msg: "User created successfully",
      newUser: newUser,
    });
  } catch (error) {
    console.error("Something error in userRoute", error);
    res.status(500).json({
      msg: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, city, country } = req.body;
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(400).json({
        msg: "User not found",
      });
    }
    console.log("Updating user:", user);
    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();
    res.send(user);
    return res.status(200).json(user);
  } catch (error) {
    console.error("Something error in updateCurrentUser", error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};
