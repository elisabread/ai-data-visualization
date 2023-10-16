const express = require("express");
const dotenv = require("dotenv");
import cors from "cors";
import callOpenAI from "./Functions/callOpenai";

dotenv.config();

const app = express();
const port = process.env.PORT;
const allowedOrigins = process.env.ALLOWED_CORS_ORIGIN!;

const options: cors.CorsOptions = {
	origin: [allowedOrigins.toString()],
};

app.use(cors(options));
app.use(express.json());

app.get("/", (req: any, res: any) => {
	res.send("Yay the server works!");
});

app.post("/chart-magic", async (req: any, res: any) => {
	const data = await callOpenAI(req.body.messages);
	res.send(data);
});

app.listen(port, () => {
	console.log(`The server is running at http://localhost:${process.env.PORT}`);
});
