import { VStack, Text } from "@chakra-ui/react";
import OpenAIMessage from "../Types/OpenAIMessage";

const ChatBox = (props: { messages: OpenAIMessage[] }) => {
	return (
		<VStack
			bg={"gray.200"}
			boxShadow={"base"}
			w={"80vw"}
			h={"500px"}
			p={4}
			m={8}
			rounded={"lg"}
			overflowY={"scroll"}
			overflowX={"hidden"}
		>
			{props.messages &&
				props.messages.map((message, i) => {
					return message.role === "user" ? (
						<VStack w={"full"} rounded={"lg"} alignItems={"end"} m={2} key={i}>
							<VStack
								bg={"white"}
								p={4}
								maxW={"40%"}
								alignItems={"end"}
								rounded={"md"}
							>
								<Text
									fontWeight={"bold"}
									fontSize={"small"}
									textAlign={"right"}
								>
									{message.role}:
								</Text>
								<Text textAlign={"right"}>{message.content}</Text>
							</VStack>
						</VStack>
					) : (
						<VStack w={"full"} alignItems={"start"} m={2} key={i}>
							<VStack
								bg={"blue.400"}
								p={4}
								maxW={"40%"}
								alignItems={"start"}
								rounded={"lg"}
								color={"white"}
							>
								<Text fontWeight={"bold"} fontSize={"small"}>
									{message.role}:
								</Text>
								<Text textAlign={"left"}>{message.content}</Text>
							</VStack>
						</VStack>
					);
				})}
		</VStack>
	);
};

export default ChatBox;
