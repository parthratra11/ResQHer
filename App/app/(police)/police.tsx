import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
  Vibration,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import NearbyUnits from "../../components/police/NearbyUnits";
import LiveAlerts from "../../components/police/LiveAlerts";
import PublicFeedback from "../../components/police/PublicFeedback";
import EmergencyContacts from "../../components/police/EmergencyContacts";

export default function Police() {
  const [mapType, setMapType] = useState("standard");
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState(null);
  const webViewRef = useRef(null);
  const mapHTML = require("../../assets/maps/patrolmappolice.html");

  const sendMessageToWebView = (message) => {
    webViewRef.current?.injectJavaScript(`
      ${message};
      true;
    `);
  };

  useEffect(() => {
    // Demo alert after 10 seconds
    const timer = setTimeout(() => {
      const demoAlert = {
        id: "alert-001",
        type: "SOS",
        location: {
          lat: 19.076,
          lng: 72.8777,
          address: "Mumbai Central, Mumbai",
        },
        timestamp: new Date().toISOString(),
        audioAnalysis: {
          threat_level: "High",
          detected_sounds: ["distressed voices", "loud noises"],
          confidence: 0.89,
        },
        victim: {
          name: "Jane Doe",
          age: "25",
          contact: "+91 98765 43210",
        },
      };
      setAlertData(demoAlert);
      setShowAlert(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let vibrationInterval;

    if (showAlert) {
      // Create a pattern for continuous vibration (500ms on, 500ms off)
      const startVibration = () => {
        Vibration.vibrate([500, 500], true);
      };

      startVibration();

      return () => {
        Vibration.cancel();
      };
    }
  }, [showAlert]);

  const handleAlertResponse = () => {
    Vibration.cancel(); // Stop vibration when responding
    Alert.alert(
      "Response Confirmed",
      "Your route has been updated to the victim's location.",
      [{ text: "OK", onPress: () => setShowAlert(false) }]
    );
  };

  const handleDismissAlert = () => {
    Vibration.cancel();
    setShowAlert(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-orange-50">
      <ScrollView>
        {/* Header */}
        <View className="px-4 py-3 bg-white shadow-sm">
          <Text className="text-2xl font-bold text-orange-900">
            ResQHer - Police Support
          </Text>
          <Text className="text-orange-600 text-sm">Active Patrol Mode</Text>
        </View>

        {/* Map Section */}
        <View className="h-80 relative my-3 mx-3 rounded-xl overflow-hidden shadow-md">
          <WebView
            ref={webViewRef}
            source={mapHTML}
            style={{ width: "100%", height: "100%" }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
          />

          {/* Map Controls Container */}
          <View className="absolute top-4 right-4 space-y-2">
            {/* Map Type Toggle */}
            <TouchableOpacity
              onPress={() =>
                setMapType(mapType === "standard" ? "satellite" : "standard")
              }
              className="bg-white/90 rounded-lg p-3 shadow-lg flex-row items-center"
            >
              <MaterialIcons name="layers" size={24} color="#f97316" />
            </TouchableOpacity>

            {/* Zoom Controls */}
            <View className="bg-white/90 rounded-lg shadow-lg">
              <TouchableOpacity
                onPress={() => sendMessageToWebView("zoomIn()")}
                className="p-3 border-b border-orange-100"
              >
                <Ionicons name="add" size={24} color="#f97316" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => sendMessageToWebView("zoomOut()")}
                className="p-3"
              >
                <Ionicons name="remove" size={24} color="#f97316" />
              </TouchableOpacity>
            </View>

            {/* Recenter Button */}
            <TouchableOpacity
              onPress={() => sendMessageToWebView("recenterMap()")}
              className="bg-white/90 rounded-lg p-3 shadow-lg"
            >
              <MaterialIcons name="my-location" size={24} color="#f97316" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Dashboard Sections */}
        <View className="px-4 py-2 space-y-4">
          <View className="bg-white p-4 rounded-xl shadow-md border border-orange-100">
            <Text className="text-lg font-semibold text-orange-900 mb-2">
              Nearby Units
            </Text>
            <NearbyUnits />
          </View>

          <View className="bg-white p-4 rounded-xl shadow-md border border-orange-100">
            <Text className="text-lg font-semibold text-orange-900 mb-2">
              Live Alerts
            </Text>
            <LiveAlerts />
          </View>

          <View className="bg-white p-4 rounded-xl shadow-md border border-orange-100">
            <Text className="text-lg font-semibold text-orange-900 mb-2">
              Public Feedback
            </Text>
            <PublicFeedback />
          </View>

          <View className="bg-white p-4 rounded-xl shadow-md border border-orange-100 mb-4">
            <Text className="text-lg font-semibold text-orange-900 mb-2">
              Emergency Contacts
            </Text>
            <EmergencyContacts />
          </View>
        </View>
      </ScrollView>

      {/* Emergency Alert Modal */}
      <Modal
        visible={showAlert}
        animationType="slide"
        transparent={true}
        onRequestClose={handleDismissAlert} // Updated to use new handler
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-xl w-[90%] shadow-xl">
            <View className="flex-row items-center mb-4">
              <View className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-2" />
              <Text className="text-xl font-bold text-red-500">
                EMERGENCY ALERT
              </Text>
            </View>

            <Text className="text-lg font-semibold mb-2">
              Location: {alertData?.location.address}
            </Text>

            <View className="bg-orange-50 p-3 rounded-lg mb-3">
              <Text className="font-semibold text-orange-800">
                AI Analysis:
              </Text>
              <Text>Threat Level: {alertData?.audioAnalysis.threat_level}</Text>
              <Text>
                Detected: {alertData?.audioAnalysis.detected_sounds.join(", ")}
              </Text>
              <Text>
                Confidence: {alertData?.audioAnalysis.confidence * 100}%
              </Text>
            </View>

            <View className="bg-gray-50 p-3 rounded-lg mb-4">
              <Text className="font-semibold">Victim Details:</Text>
              <Text>Name: {alertData?.victim.name}</Text>
              <Text>Age: {alertData?.victim.age}</Text>
              <Text>Contact: {alertData?.victim.contact}</Text>
            </View>

            <View className="flex-row justify-end space-x-3">
              <TouchableOpacity
                onPress={handleDismissAlert} // Updated to use new handler
                className="bg-gray-200 px-4 py-2 mr-1 rounded-lg"
              >
                <Text>Dismiss</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAlertResponse}
                className="bg-red-500 px-4 py-2 rounded-lg"
              >
                <Text className="text-white font-semibold">Respond Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
