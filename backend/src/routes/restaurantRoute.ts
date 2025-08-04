import { create } from "domain";
import express from "express";
import multer from "multer";
import { createRestaurant } from "../controllers/restaurantController";
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
restaurantRoute.post(
  "/",
  validateRestaurantRequest,
  upload.single("imageFile"),
  jwtCheck,
  jwtParse,
  createRestaurant
);

export default { restaurantRoute };
