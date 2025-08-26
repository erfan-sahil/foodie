"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MyUserController_1 = require("../controllers/MyUserController");
const auth_1 = require("../middlewares/auth");
const validation_1 = require("../middlewares/validation");
const userRouter = express_1.default.Router();
userRouter.get("/", auth_1.jwtCheck, auth_1.jwtParse, MyUserController_1.getCurrentUser);
userRouter.post("/", auth_1.jwtCheck, MyUserController_1.createUser);
userRouter.put("/", auth_1.jwtCheck, auth_1.jwtParse, validation_1.validateUserRequest, MyUserController_1.updateCurrentUser);
exports.default = {
    userRouter,
};
