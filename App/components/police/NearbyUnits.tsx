import { View, Text, Pressable } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function NearbyUnits() {
  const units = [
    { id: 1, name: "Unit 101", status: "Available", distance: "0.5km" },
    { id: 2, name: "Unit 102", status: "Busy", distance: "1.2km" },
  ];

  return (
    <View className="bg-white rounded-lg p-4 mb-4">
      <Text className="text-lg font-bold mb-4">Nearby Units</Text>
      {units.map((unit) => (
        <View
          key={unit.id}
          className="flex-row items-center justify-between mb-4 border-b border-gray-200 pb-2"
        >
          <View>
            <Text className="font-semibold">{unit.name}</Text>
            <Text className="text-sm text-gray-600">{unit.distance}</Text>
          </View>
          <View className="flex-row items-center">
            <Text
              className={`mr-2 ${
                unit.status === "Available" ? "text-green-600" : "text-red-600"
              }`}
            >
              {unit.status}
            </Text>
            <Pressable className="mr-2">
              <MaterialIcons name="phone" size={24} color="blue" />
            </Pressable>
            <Pressable>
              <MaterialIcons name="message" size={24} color="blue" />
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
}
