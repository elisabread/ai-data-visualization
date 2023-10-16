import "./App.css";
import DoughnutChart from "./Components/Charts/Doughnut/DoughnutChart";
import BarChart from "./Components/Charts/Bar/BarChart";
import { miniSampleData } from "./Assets/miniSampleData";
import occupationLabel from "./Assets/occupationLabel";
import { VStack } from "@chakra-ui/react";
import YourGraph from "./Pages/YourGraph";

function App() {
	return (
		<>
			{/* CHART DEMOS */}
			{/* <VStack display={"none"}>
				<div>
					<h1>Fake data: Colors</h1>
					<DoughnutChart
						labels={miniSampleData.doughnut().labels}
						datasets={miniSampleData.doughnut().datasets}
					/>
					<BarChart
						labels={miniSampleData.bar().labels}
						datasets={miniSampleData.bar().datasets}
					/>
				</div>
				<div>
					<h1>Real data: Occupation label count Sep 2023</h1>
					<DoughnutChart
						labels={occupationLabel.doughnut().labels}
						datasets={occupationLabel.doughnut().datasets}
					/>
					<BarChart
						labels={occupationLabel.bar().labels}
						datasets={occupationLabel.bar().datasets}
					/>
				</div>
			</VStack> */}
			{/* YOUR GRAPH */}
			<YourGraph />
		</>
	);
}

export default App;
