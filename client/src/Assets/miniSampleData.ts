import { ChartData } from "chart.js";

const datasets = [
	{
		data: [300, 50, 100],
		backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
		hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
	},
];

export namespace miniSampleData {
	export function bar() {
		const data: ChartData<"bar", number[], string> = {
			labels: ["Red", "Green", "Yellow"],
			datasets,
		};
		return data;
	}

	export function doughnut(): ChartData<"doughnut", number[], string> {
		const data: ChartData<"doughnut", number[], string> = {
			labels: ["Red", "Green", "Yellow"],
			datasets,
		};
		return data;
	}
}

export default miniSampleData;
