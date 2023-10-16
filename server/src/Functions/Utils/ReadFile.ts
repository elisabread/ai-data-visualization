const fs = require("fs");
const path = require("path");
import { JobAd } from "../../Types/JobAd";

////////////////////////////////////////////////////////////////////////////////
// READ THE DATA FILE
////////////////////////////////////////////////////////////////////////////////

//Function that reads the data file and parses the data into JSON
export async function readFile(fileName: string) {
	try {
		const filePath = path.join(__dirname, "../Data", fileName);
		const data: string = fs.readFileSync(filePath, "utf8");
		const dataJSON: any[] = JSON.parse(data);
		return dataJSON;
	} catch (err) {
		console.error(err);
		return;
	}
}

export default readFile;
