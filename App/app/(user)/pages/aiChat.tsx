import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatMessage from "../../../components/chat/ChatMessage";
import ChatInput from "../../../components/chat/ChatInput";
import QuickReplyButtons from "../../../components/chat/QuickReplyButtons";
import { handleBotResponse } from "../../../utils/chatbot";
import { Message } from "../../../types/chat";
import Header from "@/app/AppComponents/User/Header";

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const addMessage = async (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);

    if (isUser) {
      setIsTyping(true);
      // Simulate bot thinking
      setTimeout(async () => {
        const botResponse = await handleBotResponse(text);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: botResponse,
            isUser: false,
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 1000);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView className="flex-1 bg-[#FFF1F3] ">
      <View className="px-4 py-2">
        <Header />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-between">
          <ScrollView
            ref={scrollViewRef}
            className="flex-1 px-4"
            contentContainerStyle={{ paddingVertical: 16, flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <View className="flex-row items-center p-2 ml-4">
                <Text className="text-gray-500">AI is thinking...</Text>
              </View>
            )}
          </ScrollView>
          <View className="mt-auto">
            <QuickReplyButtons onPress={(text) => addMessage(text, true)} />
            <ChatInput onSend={(text) => addMessage(text, true)} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
