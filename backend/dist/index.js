"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const confidential_1 = require("./secret/confidential");
const cloudinary_1 = require("cloudinary");
const MyRestaurantRoute_1 = __importDefault(require("./routes/MyRestaurantRoute"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const SearchRestaurantRoute_1 = __importDefault(require("./routes/SearchRestaurantRoute"));
const { mongodbConnectionString, port } = (0, confidential_1.confidential)();
mongoose_1.default
    .connect(mongodbConnectionString)
    .then(() => {
    console.log("Connected to Database");
})
    .catch((err) => {
    console.error("Error connecting to Database:", err);
});
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/health", (req, res) => {
    res.send({ message: "Health ok!" });
});
app.use("/api/v1/user", UserRoute_1.default.userRouter);
app.use("/api/v1/restaurant", MyRestaurantRoute_1.default.restaurantRouter);
app.use("/api/v1/restaurant", SearchRestaurantRoute_1.default.searchRestaurantRouter);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
