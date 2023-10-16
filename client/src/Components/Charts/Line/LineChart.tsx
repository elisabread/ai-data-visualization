import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Heading, VStack } from "@chakra-ui/react";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const LineChart = (data: ChartData<"line", number[], string>) => {
	return (
		<VStack w={"80vw"}>
			<Heading>Line Chart</Heading>
			<Line data={data} />
		</VStack>
	);
};

export default LineChart;
