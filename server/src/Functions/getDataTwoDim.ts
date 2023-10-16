import ChartArg from "../Types/ChartArg";
import readFile from "./Utils/ReadFile";
import convertDataToChartObj from "./Utils/convertDataToChartObj";
import divideByTime from "./Utils/divideByTime";
import filterByLabel from "./Utils/filterByLabel";
import filterDataTime from "./Utils/filterByTime";

async function getDataTwoDim(args: ChartArg) {
	//Read file
	const data = await readFile("jobads_23.json");

	////////////////////////////////////////////////////////////////////////////////
	// DATA FILTERS
	////////////////////////////////////////////////////////////////////////////////

	//Filter by Time
	if (data) {
		const timeTo = Math.floor(new Date(args.time_to).getTime() / 1000);
		const timeFrom = Math.floor(new Date(args.time_from).getTime() / 1000);

		let dataFilterdByTime = filterDataTime(data, timeTo, timeFrom);
		const label = args.data_label;

		//Filter by Label value
		if (dataFilterdByTime) {
			const dataFilterdByLabel = filterByLabel(
				dataFilterdByTime,
				args.data_label,
				args.data_label_nested,
				args.data_label_values
			);

			////////////////////////////////////////////////////////////////////////////////
			// DATA PARSING
			////////////////////////////////////////////////////////////////////////////////

			//Divide data by time. For example: Day? Month?
			const dataDividedByTime = divideByTime(
				dataFilterdByLabel,
				args.labels,
				args.time_labels
			);

			if (dataDividedByTime) {
				//Count instances for each data division
				const frequencies = new Map<string, number>();

				for (const time of dataDividedByTime) {
					frequencies.set(time.label, 0);
					for (let obj of time.data) {
						const n = frequencies.get(time.label);
						frequencies.set(time.label, 1 + (n !== undefined ? n : 0));
					}
				}
				//Transform data to Chart.js format
				let chartObj = convertDataToChartObj(frequencies, args);
				//Return to client
				return chartObj;
			}
		}
	}
}
export default getDataTwoDim;
