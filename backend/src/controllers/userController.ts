import { Request, Response } from "express";
import UserModel from "../models/userModel";

const createUser = async (req: Request, res: Response) => {
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
      msg: "User route is working",
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

export default createUser;
