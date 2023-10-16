import ChartArg from "../Types/ChartArg";
import readFile from "./Utils/ReadFile";
import convertDataToChartObj from "./Utils/convertDataToChartObj";
import divideByTime from "./Utils/divideByTime";
import filterByLabel from "./Utils/filterByLabel";
import filterDataTime from "./Utils/filterByTime";

async function getDataTwoDim(args: ChartArg) {
	//Read file
	const data = await readFile("jobads_23.json");

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

			//Divide data by time .. Day? Month?
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

				console.log("Final freq: ", frequencies);
				//Transform data to Chart.js format
				let chartObj = convertDataToChartObj(frequencies, args);
				//Return to client
				return chartObj;
			}
		}
	}
}
export default getDataTwoDim;

/* 

OpenAI chart args:  {
  name: 'getDataTwoDim',
  arguments: '{\n' +
    '  "type": "line",\n' +
    '  "data_label": "occupation",\n' +
    '  "data_label_nested": "label",\n' +
    '  "data_label_values": ["Inköpare"],\n' +
    '  "time_from": "2023-01-01",\n' +
    '  "time_to": "2023-12-31",\n' +
    '  "label": "Amount",\n' +
    '  "labels": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],\n' +
    '  "time_labels": [\n' +
    '    {"time_from": "2023-01-01", "time_to": "2023-01-31"},\n' +
    '    {"time_from": "2023-02-01", "time_to": "2023-02-28"},\n' +
    '    {"time_from": "2023-03-01", "time_to": "2023-03-31"},\n' +
    '    {"time_from": "2023-04-01", "time_to": "2023-04-30"},\n' +
    '    {"time_from": "2023-05-01", "time_to": "2023-05-31"},\n' +
    '    {"time_from": "2023-06-01", "time_to": "2023-06-30"},\n' +
    '    {"time_from": "2023-07-01", "time_to": "2023-07-31"},\n' +
    '    {"time_from": "2023-08-01", "time_to": "2023-08-31"},\n' +
    '    {"time_from": "2023-09-01", "time_to": "2023-09-30"},\n' +
    '    {"time_from": "2023-10-01", "time_to": "2023-10-31"},\n' +
    '    {"time_from": "2023-11-01", "time_to": "2023-11-30"},\n' +
    '    {"time_from": "2023-12-01", "time_to": "2023-12-31"}\n' +
    '  ]\n' +
    '}'
}


*/
