"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCurrentUser = exports.createUser = exports.getCurrentUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield userModel_1.default.findOne({ _id: req.userId });
        if (!currentUser) {
            res.status(404).json({
                msg: "User not found",
            });
        }
        res.send(currentUser);
    }
    catch (error) {
        console.error("Something error in getCurrentUser", error);
        res.status(500).json({
            msg: "Internal server error",
        });
    }
});
exports.getCurrentUser = getCurrentUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { auth0Id } = req.body;
        const existingUser = yield userModel_1.default.findOne({ auth0Id });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        const newUser = new userModel_1.default(req.body);
        yield newUser.save();
        res.status(200).json({
            msg: "User created successfully",
            newUser: newUser,
        });
    }
    catch (error) {
        console.error("Something error in userRoute", error);
        res.status(500).json({
            msg: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.createUser = createUser;
const updateCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, addressLine1, city, country } = req.body;
        const user = yield userModel_1.default.findById(req.userId);
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
        yield user.save();
        res.send(user);
        return res.status(200).json(user);
    }
    catch (error) {
        console.error("Something error in updateCurrentUser", error);
        res.status(500).json({
            msg: "Internal server error",
        });
    }
});
exports.updateCurrentUser = updateCurrentUser;
