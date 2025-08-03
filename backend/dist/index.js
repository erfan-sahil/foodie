"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const confidential_1 = require("./secret/confidential");
const { mongodbConnectionString, port } = (0, confidential_1.confidential)();
mongoose_1.default
    .connect(mongodbConnectionString)
    .then(() => {
    console.log("Connected to Database");
})
    .catch((err) => {
    console.error("Error connecting to Database:", err);
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/health", (req, res) => {
    res.send({ message: "Health ok!" });
});
app.use("/api/v1/user", userRoute_1.default.userRoute);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
