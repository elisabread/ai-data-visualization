import { OpenAI } from "openai";
import * as dotenv from "dotenv";
import getDataOneDim from "./getDataOneDim";
import getDataTwoDim from "./getDataTwoDim";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////
dotenv.config();

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Description of functions available.
 */
const functions = [
	{
		name: "getDataOneDim",
		description:
			"This function will get the data needed for a one dimentional chart. A doughnut or bar chart is good to use when we need to focus on describing the relationships among the circles, they are often used to describe components of an idea or concept.",
		parameters: {
			type: "object",
			properties: {
				type: {
					type: "string",
					enum: ["doughnut", "bar"],
					description: "The type of graph to be renderd",
				},
				data_label: {
					type: "string",
					description:
						"The label (JSON key name) of the desired data you want to render a chart with. For instance 'occupation'",
				},
				data_label_nested: {
					type: "string",
					description:
						"The label (JSON key name) of the desired data you want to render a chart with. For instance 'label'",
				},
				data_label_values: {
					type: "array",
					description:
						"The actual values (JSON values) of the desired data you want to compare. For instance ['Inköpare', 'Ventilationstekniker']",
					items: {
						type: "string",
					},
				},
				time_from: {
					type: "string",
					description:
						"Used to filter the data. This argument tells us the first date in the data set that we want to get data from. Will always be formatted like this '2023-09-04 13:45:32 UTC'",
				},
				time_to: {
					type: "string",
					description:
						"used to fitler the data. This argument tells us the last date in the data set that we want to get data from. Will always be formatted like this '2023-09-04 13:45:32 UTC'",
				},
				label: {
					type: "string",
					description:
						"The Charts label. A sumamry of what the data is visualation. For example: 'Amount'. Max 20 characters long.",
				},
			},
			required: ["type", "data_label", "time_from", "time_to", "label"],
		},
	},
	{
		name: "getDataTwoDim",
		description:
			"This function will get the data needed for a two dimentional chart. A line or bar chart is good to use when we need to track changes over short and long periods of time",
		parameters: {
			type: "object",
			properties: {
				type: {
					type: "string",
					enum: ["line", "bar"],
					description: "The type of graph to be renderd",
				},
				data_label: {
					type: "string",
					description:
						"The label (JSON key name) of the desired data you want to render a chart with. For instance 'occupation'",
				},
				data_label_nested: {
					type: "string",
					description:
						"The label (JSON key name) of the desired data you want to render a chart with. For instance 'label'",
				},
				data_label_values: {
					type: "array",
					description:
						"The actual values (JSON values) of the desired data you want to compare. For instance ['Inköpare', 'Ventilationstekniker']",
					items: {
						type: "string",
					},
				},
				time_from: {
					type: "string",
					description:
						"Used to filter the data. This argument tells us the first date in the data set that we want to get data from. Will always be formatted like this '2023-09-04 13:45:32 UTC'",
				},
				time_to: {
					type: "string",
					description:
						"used to fitler the data. This argument tells us the last date in the data set that we want to get data from. Will always be formatted like this '2023-09-04 13:45:32 UTC'",
				},
				label: {
					type: "string",
					description:
						"The Charts label. A sumamry of what the data is visualation. For example: 'Amount'. Max 20 characters long.",
				},
				labels: {
					type: "array",
					description:
						'These labels will be the x-dimension showing change over time. For instance ["January", "February", "March", "April", "May", "June", "July"]',
					items: {
						type: "string",
					},
				},
				time_labels: {
					type: "array",
					description:
						'These labels will be the x-dimension showing change over time. For instance [{"time_from": "2023-09-01 00:00:32", "time_to": "2023-09-30 00:00:32"}, {"time_from": "2023-10-01 00:00:32", "time_to": "2023-10-30 00:00:32"}]',
					items: {
						type: "object",
						properties: {
							time_to: {
								type: "string",
								description:
									"The start time of requested time span. Will be in the format of UTC like this: 2023-09-01 00:00:32 UTC",
							},
							time_from: {
								type: "string",
								description:
									"The end time of requested time span. Will be in the format of UTC like this: 2023-09-30 00:00:32 UTC",
							},
						},
					},
				},
			},
			required: [
				"type",
				"data_label",
				"data_label_values",
				"time_from",
				"time_to",
				"time_labels",
				"label",
				"labels",
			],
		},
	},
];

////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
async function callOpenAI(messages: ChatCompletionMessageParam[]) {
	//OpenAI determines what chart we want to render & what data is needed to do so
	const res = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: messages,
		functions: functions,
		function_call: "auto",
	});

	//Save the function call response
	const openAiRes = res.choices[0].message;
	const chartArgs = res.choices[0].message.function_call;

	//Call suggested function based on the reccomended chart args determined by OpenAI
	switch (chartArgs?.name) {
		case "getDataOneDim": {
			const res = await getDataOneDim(JSON.parse(chartArgs.arguments));
			return { resType: "chart", res: res };
		}
		case "getDataTwoDim": {
			const res = await getDataTwoDim(JSON.parse(chartArgs.arguments));
			return { resType: "chart", res: res };
		}
		default:
			return { resType: "message", res: openAiRes };
	}
}

export default callOpenAI;
