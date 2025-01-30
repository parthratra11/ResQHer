import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import NearbyUnits from "../../components/police/NearbyUnits";
import LiveAlerts from "../../components/police/LiveAlerts";
import PublicFeedback from "../../components/police/PublicFeedback";
import EmergencyContacts from "../../components/police/EmergencyContacts";

export default function Police() {
  const [mapType, setMapType] = useState("standard");

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
        {/* Map Section */}
        <View className="h-80 relative">
          <MapView
            className="w-full h-full"
            initialRegion={{
              latitude: 28.6139,
              longitude: 77.209,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            mapType={mapType}
          />
          <View className="absolute top-4 right-4 bg-white rounded-lg p-2">
            <Pressable
              onPress={() =>
                setMapType(mapType === "standard" ? "satellite" : "standard")
              }
              className="flex-row items-center"
            >
              <MaterialIcons name="layers" size={24} color="black" />
              <Text className="ml-2">Change Map Type</Text>
            </Pressable>
          </View>
        </View>

        {/* Dashboard Sections */}
        <View className="px-4 py-2">
          <NearbyUnits />
          <LiveAlerts />
          <PublicFeedback />
          <EmergencyContacts />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
