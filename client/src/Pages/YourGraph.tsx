import { VStack, Button, Textarea, HStack, useToast } from "@chakra-ui/react";
import DoughnutChart from "../Components/Charts/Doughnut/DoughnutChart";
import { useState } from "react";
import { ChartData } from "chart.js";
import BarChart from "../Components/Charts/Bar/BarChart";
import LineChart from "../Components/Charts/Line/LineChart";
import ChatBox from "../Components/ChatBox";
import OpenAIMessage from "../Types/OpenAIMessage";

type Chart = DoughnutChart | BarChart | LineChart;

type BarChart = {
	kind: "bar";
	data: ChartData<"bar", number[], string>;
};

type DoughnutChart = {
	kind: "doughnut";
	data: ChartData<"doughnut", number[], string>;
};

type LineChart = {
	kind: "line";
	data: ChartData<"line", number[], string>;
};

const YourGraph = () => {
	const toast = useToast();

	const [loading, setLoading] = useState<boolean>(false);

	const [messages, setMessages] = useState<OpenAIMessage[]>([
		{ role: "assistant", content: "My head hurts from reading all your data" },
	]);
	const [chartData, setChartData] = useState<Chart>();

	const [prompt, setPrompt] = useState<string>("");

	async function handleSubmit() {
		setLoading(true);
		setMessages([...messages, { role: "user", content: prompt }]);

		const res = fetch(`${import.meta.env.VITE_API_URL}`, {
			method: "POST",
			body: JSON.stringify({
				messages: [...messages, { role: "user", content: prompt }],
			}),
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.resType === "message") {
					setMessages([
						...messages,
						{ role: "user", content: prompt },
						response.res,
					]);
				} else if (response.resType === "chart") {
					setChartData({
						kind: response.res.chartType,
						data: response.res.chartData,
					});
					toast({
						title: "Sucess!",
						description: "I've created a graph for you.",
						status: "success",
						duration: 5000,
						isClosable: true,
					});
				} else {
					toast({
						title: "Something went wrong!",
						description: "Please try again.",
						status: "error",
						duration: 5000,
						isClosable: true,
					});
				}
				setPrompt("");
				setLoading(false);
			})
			.catch((error) => console.log(error));
		return res;
	}

	function clearChat(): void {
		setMessages([]);
		return;
	}

	return (
		<VStack>
			{chartData && (
				<VStack>
					{chartData.kind === "doughnut" && (
						<DoughnutChart
							labels={chartData.data.labels}
							datasets={chartData.data.datasets}
						/>
					)}
					{chartData.kind === "bar" && (
						<BarChart
							labels={chartData.data.labels}
							datasets={chartData.data.datasets}
						/>
					)}
					{chartData.kind === "line" && (
						<LineChart
							labels={chartData.data.labels}
							datasets={chartData.data.datasets}
						/>
					)}
				</VStack>
			)}
			<ChatBox messages={messages} />

			<Textarea
				h={"20vh"}
				w={"80vw"}
				onChange={(e) => setPrompt(e.target.value)}
				variant="outline"
				placeholder='I want to see a bar chart displaying how "occupation" => "label" equal to "Inköpare" has changed in 2023'
				value={prompt}
			/>
			<HStack>
				<Button onClick={clearChat}>Clear chat</Button>
				<Button
					bg={"blue.700"}
					color={"white"}
					onClick={handleSubmit}
					isLoading={loading}
				>
					Submit
				</Button>
			</HStack>
		</VStack>
	);
};

export default YourGraph;
