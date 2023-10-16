import ChartArg from "./ChartArg";
import OpenAIMessage from "./OpenAIMessage";

export type ReturnObj = {
	type: string;
	messages: OpenAIMessage;
	chartType: ChartArg;
};
