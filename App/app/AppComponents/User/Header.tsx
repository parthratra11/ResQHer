import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  return (
    <>
      <View className="border-b-hairline flex flex-row justify-between items-center mb-1 pb-2">
        <View>
          <Text className="text-3xl font-bold text-[#DC143C]">ResQHer</Text>
        </View>
        <TouchableOpacity
          className="flex items-center justify-center w-12 h-12"
          onPress={() => {}}
        >
          <Ionicons name="person-circle-outline" size={42} color="#DC143C" />
        </TouchableOpacity>
      </View>
    </>
  );
}
