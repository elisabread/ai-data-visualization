import ChartArg from "../Types/ChartArg";
import readFile from "./Utils/ReadFile";

async function getDataOneDim(args: ChartArg) {
	//First we read the data file
	const data = await readFile("jobads_23.json");

	if (data) {
		//Then we filter the data with time parameters
		const timeTo = Math.floor(new Date(args.time_to).getTime() / 1000);
		const timeFrom = Math.floor(new Date(args.time_from).getTime() / 1000);

		let dataTimeFilterd = filterDataTime(data, timeTo, timeFrom);
		const label = args.data_label;

		////////////////////////////////////////////////////////////////////////////////
		// Specific label to filter on
		////////////////////////////////////////////////////////////////////////////////
		if (args.data_label_values && dataTimeFilterd) {
			//Count all instances of each data label value in the dataset.
			//For example: If the data label is "occupation_title" and data label value is "Inköpare".
			//We would through the entire dataset and find all instances of occupation_label:"Inköpare" and count them
			const frequencies = new Map<string, number>();

			for (const value of args.data_label_values) {
				for (let obj of dataTimeFilterd) {
					if (obj[args.data_label][args.data_label_nested] === value) {
						const n = frequencies.get(
							obj[args.data_label][args.data_label_nested]
						);
						if (n === undefined) {
							frequencies.set(obj[args.data_label][args.data_label_nested], 1);
						} else {
							frequencies.set(
								obj[args.data_label][args.data_label_nested],
								1 + n
							);
						}
					}
				}
			}

			//Finally convert the filtred data into the data model Chart.js requires
			let chartObj = convertDataToChartObj(frequencies, args);
			return chartObj;
			////////////////////////////////////////////////////////////////////////////////
			// If the user wants to find all unique key values
			////////////////////////////////////////////////////////////////////////////////
		} else if (!args.data_label_values && dataTimeFilterd) {
			//Count all unique instances of the different occupation labels
			const frequencies = new Map<string, number>(); //Map key values. No order like an array has arr[0]. use indexes to find values instead

			for (let obj of dataTimeFilterd) {
				const n = frequencies.get(obj[args.data_label][args.data_label_nested]);
				if (n === undefined) {
					frequencies.set(obj[args.data_label][args.data_label_nested], 1);
				} else {
					frequencies.set(obj[args.data_label][args.data_label_nested], 1 + n);
				}
			}

			//Finally convert the filtred data into the data model Chart.js requires
			let chartObj = convertDataToChartObj(frequencies, args);
			return chartObj;
		} else {
			console.log("No data was found.");
		}
	}
}
export default getDataOneDim;

function filterDataTime(data: any[], timeTo: number, timeFrom: number): any[] {
	const relevantObjs: any[] = [];
	data.forEach((obj: any) => {
		const objTime = Math.floor(new Date(obj.publication_date).getTime() / 1000);
		if (objTime > timeFrom && objTime < timeTo) {
			relevantObjs.push(obj);
		}
	});
	return relevantObjs;
}

function convertDataToChartObj(
	frequencies: Map<string, number>,
	args: ChartArg
) {
	let dataset = [];
	let labels = [];

	for (const [key, value] of frequencies) {
		dataset.push(value);
		labels.push(key);
	}

	let chartData = {
		labels,
		datasets: [{ data: dataset, label: args.label }],
		type: args.type,
	};

	return { chartData: chartData, chartType: args.type };
}
