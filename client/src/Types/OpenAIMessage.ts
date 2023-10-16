export type OpenAIMessage = {
	content: string;
	role: "assistant" | "function_call" | "user";
};

export default OpenAIMessage;
