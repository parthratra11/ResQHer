import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

const StartPage = () => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-20">
      <Text className="text-gray-300">Loading...</Text>
      <ActivityIndicator size="large" color="#CC5500" />
    </View>
  );
};

export default StartPage;
