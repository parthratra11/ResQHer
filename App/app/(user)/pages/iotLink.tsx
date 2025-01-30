import React, { useState } from "react";
import { View, Text, ScrollView, Switch, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import Header from "@/app/AppComponents/User/Header";

export default function IotLink() {
  const [isConnected] = useState(true);
  const [silentAlert, setSilentAlert] = useState(true);
  const [loudAlert, setLoudAlert] = useState(true);
  const [autoCall, setAutoCall] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showReconnecting, setShowReconnecting] = useState(false);

  const handleReconnect = () => {
    setShowReconnecting(true);
    setTimeout(() => setShowReconnecting(false), 2000);
  };

  const handleFindBracelet = () => {
    alert("Your bracelet is vibrating! Check nearby.");
  };

  return (
    <ScrollView
      className={`flex-1 ${isDarkMode ? "bg-gray-900" : "bg-[#FFF1F3]"}`}
    >
      {/* Header Section */}
      <View className="px-4 pt-4">
        <Header />

        {/* Connection Status Card */}
        <View
          className={`p-4 rounded-xl mb-4 mt-4 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } shadow-md`}
        >
          <View className="flex-row justify-between items-center">
            <Text
              className={`font-semibold text-lg ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {isConnected ? "Device Connected ✅" : "No Device Linked ❌"}
            </Text>
            <TouchableOpacity
              onPress={() => setIsDarkMode(!isDarkMode)}
              className="hidden"
            >
              <Ionicons
                name={isDarkMode ? "sunny" : "moon"}
                size={24}
                color={isDarkMode ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>
          <Text
            className={`text-md mt-2 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            ResQHer Bracelet #001
          </Text>
          <Text
            className={`text-xs ${
              isDarkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            MAC: 00:11:22:33:44:55
          </Text>

          {showReconnecting ? (
            <Text className="text-blue-500 mt-2">
              Attempting to reconnect...
            </Text>
          ) : (
            <TouchableOpacity
              className="bg-[#DC143C] p-3 rounded-lg mt-2"
              onPress={handleReconnect}
            >
              <Text className="text-white text-center">Reconnect</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Emergency Settings Card */}
        <View
          className={`p-4 rounded-xl mb-4 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } shadow-md`}
        >
          <Text
            className={`font-semibold mb-4 text-lg ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Emergency Settings
          </Text>

          <View className="flex-row justify-between items-center mb-3">
            <Text className={isDarkMode ? "text-white" : "text-black"}>
              Silent Alert (Single Tap)
            </Text>
            <Switch
              value={silentAlert}
              onValueChange={setSilentAlert}
              trackColor={{ false: "#767577", true: "#DC143C" }}
            />
          </View>

          <View className="flex-row justify-between items-center mb-3">
            <Text className={isDarkMode ? "text-white" : "text-black"}>
              Loud Alarm (Double Tap)
            </Text>
            <Switch
              value={loudAlert}
              onValueChange={setLoudAlert}
              trackColor={{ false: "#767577", true: "#DC143C" }}
            />
          </View>

          <View className="flex-row justify-between items-center">
            <Text className={isDarkMode ? "text-white" : "text-black"}>
              Auto-Call (Hold 3s)
            </Text>
            <Switch
              value={autoCall}
              onValueChange={setAutoCall}
              trackColor={{ false: "#767577", true: "#DC143C" }}
            />
          </View>
        </View>

        {/* Battery Status Card */}
        <View
          className={`p-4 rounded-xl mb-4 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } shadow-md`}
        >
          <Text
            className={`font-semibold mb-2 text-lg ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Device Status
          </Text>

          <View className="flex-row items-center mb-2">
            <Ionicons name="battery-full" size={20} color="#4CAF50" />
            <Text
              className={`ml-2 ${isDarkMode ? "text-white" : "text-black"}`}
            >
              Battery: 75%
            </Text>
          </View>

          <Text
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Last Synced: Jan 28, 2024, 12:30 PM
          </Text>
          <Text
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Firmware: v1.2.0
          </Text>

          <TouchableOpacity
            className="bg-[#DC143C] p-3 rounded-lg mt-3"
            onPress={handleFindBracelet}
          >
            <Text className="text-white text-center">Find My Bracelet</Text>
          </TouchableOpacity>
        </View>

        {/* Future Features Card */}
        <View
          className={`p-4 rounded-xl mb-4 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } shadow-md`}
        >
          <Text
            className={`font-semibold mb-2 text-lg ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Coming Soon
          </Text>

          <Text
            className={`text-sm mb-2 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            • Multi-device support for family safety
          </Text>
          <Text
            className={`text-sm mb-2 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            • Geofencing alerts
          </Text>
          <Text
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            • Voice activation features
          </Text>
        </View>

        {/* Security Notice */}
        <View
          className={`p-4 rounded-xl mb-4 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } shadow-md`}
        >
          <View className="flex-row items-center">
            <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
            <Text
              className={`ml-2 ${isDarkMode ? "text-white" : "text-black"}`}
            >
              Your data is encrypted and secure
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
