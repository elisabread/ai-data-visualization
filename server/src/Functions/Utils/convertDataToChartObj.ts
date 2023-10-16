import ChartArg from "../../Types/ChartArg";

export function convertDataToChartObj(
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
		type: "chart",
	};

	return { chartData: chartData, chartType: args.type };
}

export default convertDataToChartObj;
