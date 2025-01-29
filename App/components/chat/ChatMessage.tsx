import React from "react";
import { View, Text } from "react-native";
import type { Message } from "../../types/chat";

const ChatMessage = ({ message }: { message: Message }) => {
  const { text, isUser } = message;
  return (
    <View
      className={`flex-row ${isUser ? "justify-end" : "justify-start"} mb-3`}
    >
      <View
        className={`px-4 py-3 rounded-2xl max-w-[85%] ${
          isUser
            ? "bg-[#DC143C] py-2 rounded-tr-none"
            : "bg-white py-2 dark:bg-gray-800 rounded-tl-none"
        }`}
      >
        <Text className={`${isUser ? "text-white" : "text-gray-900"} text-md`}>
          {text}
        </Text>
      </View>
    </View>
  );
};

export default ChatMessage;
