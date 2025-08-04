import { create } from "domain";
import express from "express";
import multer from "multer";
import { createRestaurant } from "../controllers/restaurantController";

const restaurantRoute = express.Router();

restaurantRoute.post("/", createRestaurant);

export default { restaurantRoute };
