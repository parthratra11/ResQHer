import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ChatInput = ({ onSend }: { onSend: (text: string) => void }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <View className="px-4 py-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <View className="flex-row items-center space-x-2">
        <TextInput
          className="flex-1 px-4 py-4 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-900 dark:text-gray-100 text-base"
          placeholder="Type a message..."
          placeholderTextColor="#9CA3AF"
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={handleSend}
          multiline={false}
        />
        <TouchableOpacity
          className="p-3 ml-2 bg-[#DC143C] rounded-full justify-center items-center"
          onPress={handleSend}
        >
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatInput;
