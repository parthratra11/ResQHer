import React from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";

const QUICK_REPLIES = [
  "Report an incident",
  "Find safe routes",
  "Legal help",
  "Emergency contacts",
  "Mental health support",
];

const QuickReplyButtons = ({
  onPress,
}: {
  onPress: (text: string) => void;
}) => {
  return (
    <ScrollView
      horizontal
      className="px-4 py-2 bg-white dark:bg-gray-800"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ columnGap: 8 }}
    >
      {QUICK_REPLIES.map((reply, index) => (
        <TouchableOpacity
          key={index}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full"
          onPress={() => onPress(reply)}
        >
          <Text className="text-gray-900 dark:text-gray-100 text-sm font-medium">
            {reply}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default QuickReplyButtons;
