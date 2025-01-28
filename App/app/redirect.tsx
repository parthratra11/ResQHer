import React from "react";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const RedirectPage = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity
        className="h-16 w-1/2 border border-gray-500 rounded-lg flex items-center justify-center font-semibold text-lg font-sans"
        onPress={() => router.replace("/user")}
      >
        <Text>User Dasboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="h-16 w-1/2 mt-1 border border-gray-400 rounded-lg lfex items-center justify-center font-semibold text-lg font-sans"
        onPress={() => router.replace("/police")}
      >
        <Text>Police Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RedirectPage;
