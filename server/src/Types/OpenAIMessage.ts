export type OpenAIMessage = {
	role: "user" | "assistant" | "function";
	content: string;
};

export default OpenAIMessage;
