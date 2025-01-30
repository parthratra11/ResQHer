import React, { useEffect } from "react";
import { router, Slot, Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "../store/store";
import "../global.css";

const MainLayout = () => {
  useEffect(() => {
    router.replace("/redirect");
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
