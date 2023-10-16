type ChartArg = {
	type: string;
	data_label: string;
	data_label_nested: string;
	data_label_values: string[];
	time_from: string;
	time_to: string;
	time_labels: { time_to: string; time_from: string }[];
	labels: string[];
	label: string;
};

function validateChartArg(
	config: { valid_data_labels: string[] },
	chartArg: ChartArg
): boolean {
	return chartArg.data_label in config.valid_data_labels;
}

export default ChartArg;
