import React, { useEffect } from "react";
import { router, Slot } from "expo-router";
import { View } from "react-native";
import "../global.css";

const MainLayout = () => {
  useEffect(() => {
    router.replace("/user");
  }, []);

  return (
    <View className="flex-1">
      <Slot />
    </View>
  );
};

export default function RootLayout() {
  return <MainLayout />;
}
