import React, { useEffect } from "react";
import { router, Slot, Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
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
  return (
    // <SafeAreaProvider>
    //   <Stack>
    //     <Stack.Screen
    //       name="(user)"
    //       options={{
    //         headerShown: false,
    //       }}
    //     />
    //   </Stack>
    // </SafeAreaProvider>
    <MainLayout />
  );
}
