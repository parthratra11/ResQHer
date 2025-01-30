import { View, Text } from "react-native";
import React from "react";

export default function PublicFeedback() {
  const feedback = [
    {
      id: 1,
      type: "Safety Concern",
      description: "Poor street lighting in sector 7",
      submittedAt: "1 day ago",
    },
    {
      id: 2,
      type: "Harassment",
      description: "Recurring eve-teasing near metro station",
      submittedAt: "2 days ago",
    },
  ];

  return (
    <View className="bg-white rounded-lg p-4 mb-4">
      <Text className="text-lg font-bold mb-4">Public Feedback</Text>
      {feedback.map((item) => (
        <View key={item.id} className="mb-4 border-b border-gray-200 pb-2">
          <Text className="font-semibold text-blue-600">{item.type}</Text>
          <Text className="text-gray-700">{item.description}</Text>
          <Text className="text-gray-500 text-sm">{item.submittedAt}</Text>
        </View>
      ))}
    </View>
  );
}
