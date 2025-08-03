"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
const validation_1 = require("../middlewares/validation");
const userRoute = express_1.default.Router();
userRoute.get("/", auth_1.jwtCheck, auth_1.jwtParse, userController_1.getCurrentUser);
userRoute.post("/", auth_1.jwtCheck, userController_1.createUser);
userRoute.put("/", auth_1.jwtCheck, auth_1.jwtParse, validation_1.validateUserRequest, userController_1.updateCurrentUser);
exports.default = {
    userRoute,
};
