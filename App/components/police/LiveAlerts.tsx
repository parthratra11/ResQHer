import { View, Text, Pressable } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function LiveAlerts() {
  const alerts = [
    {
      id: 1,
      type: "SOS",
      description: "Emergency distress signal",
      location: "Central Park",
      time: "2 mins ago",
      priority: "high",
    },
    {
      id: 2,
      type: "Incident",
      description: "Suspicious activity reported",
      location: "Main Street",
      time: "15 mins ago",
      priority: "medium",
    },
  ];

  return (
    <View className="bg-white rounded-lg p-4 mb-4">
      <Text className="text-lg font-bold mb-4">Live Alerts</Text>
      {alerts.map((alert) => (
        <View key={alert.id} className="mb-4 border-b border-gray-200 pb-2">
          <View className="flex-row justify-between items-start">
            <View>
              <Text
                className={`font-bold ${
                  alert.priority === "high" ? "text-red-600" : "text-orange-500"
                }`}
              >
                {alert.type}
              </Text>
              <Text className="text-gray-700">{alert.description}</Text>
              <Text className="text-gray-600 text-sm">{alert.location}</Text>
              <Text className="text-gray-500 text-sm">{alert.time}</Text>
            </View>
            <Pressable className="bg-blue-500 px-3 py-1 rounded">
              <Text className="text-white">Respond</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
}
