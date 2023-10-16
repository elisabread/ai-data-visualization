import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { CategoryScale, ChartData } from "chart.js";
import { Heading, VStack } from "@chakra-ui/react";

Chart.register(CategoryScale);

const BarChart = (data: ChartData<"bar", number[], string>) => {
	return (
		<VStack w={"80vw"}>
			<Heading>Bar Chart</Heading>
			<Bar data={data} />
		</VStack>
	);
};

export default BarChart;
