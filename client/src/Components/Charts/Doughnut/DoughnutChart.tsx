import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { CategoryScale, ChartData } from "chart.js";
import { Heading, VStack } from "@chakra-ui/react";

Chart.register(CategoryScale);

const DoughnutChart = (data: ChartData<"doughnut", number[], string>) => {
	return (
		<VStack w={"60vw"}>
			<Heading>Doughnut Chart</Heading>
			<Doughnut data={data} />
		</VStack>
	);
};

export default DoughnutChart;
