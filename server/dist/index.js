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
const express = require("express");
const dotenv = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const callOpenai_1 = __importDefault(require("./Functions/callOpenai"));
dotenv.config();
const app = express();
const port = process.env.PORT;
const allowedOrigins = process.env.ALLOWED_CORS_ORIGIN;
const options = {
    origin: [allowedOrigins.toString()],
};
app.use((0, cors_1.default)(options));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Yay the server works!");
});
app.post("/chart-magic", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Messages form client: ", req.body.messages);
    const data = yield (0, callOpenai_1.default)(req.body.messages);
    console.log("Final data to be sent to client: ", data);
    res.send(data);
}));
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${process.env.PORT}`);
});
