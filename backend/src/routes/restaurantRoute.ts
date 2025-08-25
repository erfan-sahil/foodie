import { create } from "domain";
import express from "express";
import multer from "multer";
import {
  createMyRestaurant,
  getRestaurant,
} from "../controllers/restaurantController";
import { validateRestaurantRequest } from "../middlewares/validation";
import { jwtCheck, jwtParse } from "../middlewares/auth";

const restaurantRoute = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

if (!upload) {
  console.error("Multer upload configuration failed");
}

restaurantRoute.get("/", jwtCheck, jwtParse, getRestaurant);

restaurantRoute.post(
  "/",
  upload.single("imageFile"),
  jwtCheck,
  jwtParse,
  validateRestaurantRequest,
  createMyRestaurant
);

restaurantRoute.put(
  "/",
  upload.single("imageFile"),
  jwtCheck,
  jwtParse,
  validateRestaurantRequest,
  updateMyRestaurant
);

export default { restaurantRoute };
