import express from "express";
import multer from "multer";
import {
  createMyRestaurant,
  getMyRestaurant,
  updateMyRestaurant,
} from "../controllers/restaurantController";
import { validateRestaurantRequest } from "../middlewares/validation";
import { jwtCheck, jwtParse } from "../middlewares/auth";

const restaurantRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

if (!upload) {
  console.error("Multer upload configuration failed");
}

restaurantRouter.get("/", jwtCheck, jwtParse, getMyRestaurant);

restaurantRouter.post(
  "/",
  upload.single("imageFile"),
  jwtCheck,
  jwtParse,
  validateRestaurantRequest,
  createMyRestaurant
);

restaurantRouter.put(
  "/",
  upload.single("imageFile"),
  jwtCheck,
  jwtParse,
  validateRestaurantRequest,
  updateMyRestaurant
);

export default { restaurantRouter };
