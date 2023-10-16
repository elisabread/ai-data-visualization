import { ChartData } from "chart.js";

const datasets = [
	{
		//It will be OpenAI who created the Data & Lables
		data: [200, 360],
		backgroundColor: ["#FF6384", "#36A2EB"],
		hoverBackgroundColor: ["#FF6384", "#36A2EB"],
	},
];

/* This namespace exports data about how many job ads for "Köksbiträde" & "Inköpare" that was published in September 2023 */
export namespace occupationLabel {
	export function bar() {
		const data: ChartData<"bar", number[], string> = {
			//It will be OpenAI who created the Data & Lables
			labels: ["Inköpare", "Köksbiträde"],
			datasets,
		};
		return data;
	}

	export function doughnut(): ChartData<"doughnut", number[], string> {
		const data: ChartData<"doughnut", number[], string> = {
			//It will be OpenAI who created the Data & Lables
			labels: ["Inköpare", "Köksbiträde"],
			datasets,
		};
		return data;
	}
}

export default occupationLabel;
