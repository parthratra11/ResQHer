import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import LottieView from "lottie-react-native";
import Header from "@/app/AppComponents/User/Header";

const EmergencyButton = ({ number, title, description }) => (
  <TouchableOpacity
    className="bg-[#DC143C] p-5 rounded-xl mb-4 shadow-lg elevation-5"
    onPress={() => {
      Alert.alert("Emergency Call", `Are you sure you want to call ${title}?`, [
        { text: "Cancel", style: "cancel" },
        { text: "Call", onPress: () => Linking.openURL(`tel:${number}`) },
      ]);
    }}
  >
    <Text className="text-white text-xl font-bold mb-1">{title}</Text>
    <Text className="text-white/90 text-sm">{description}</Text>
  </TouchableOpacity>
);

export default function PoliceConnect() {
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const handleSendLocation = () => {
    Alert.alert(
      "Send Location",
      "Send your live location to the nearest police station?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send",
          onPress: () => {
            setShowSuccessAnimation(true);
            setTimeout(() => setShowSuccessAnimation(false), 2000);
          },
        },
      ]
    );
  };

  const initialRegion = {
    latitude: 28.6139,
    longitude: 77.209,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const nearbyStations = [
    {
      id: 1,
      name: "Central Police Station",
      latitude: 28.6139,
      longitude: 77.209,
    },
    { id: 2, name: "City Police HQ", latitude: 28.6239, longitude: 77.219 },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FFF1F3]">
      <ScrollView className="flex-1 px-4 pt-2">
        {/* Emergency Contacts Section */}
        <View className="mb-2">
          <View className="mb-4">
            <Header />
          </View>
          <EmergencyButton
            number="112"
            title="Police Emergency"
            description="24/7 Emergency Response"
          />
          <EmergencyButton
            number="1091"
            title="Women's Safety Helpline"
            description="Immediate Assistance for Women"
          />
        </View>

        {/* Police Station Locator */}
        <View className="mb-4">
          <Text className="text-xl font-bold mb-2 text-[#333]">
            Nearby Police Stations
          </Text>
          <View style={styles.mapContainer}>
            <MapView
              provider="google"
              style={styles.map}
              initialRegion={initialRegion}
              showsUserLocation={true}
              showsMyLocationButton={true}
            >
              {nearbyStations.map((station) => (
                <Marker
                  key={station.id}
                  coordinate={{
                    latitude: station.latitude,
                    longitude: station.longitude,
                  }}
                  title={station.name}
                  description="Police Station"
                />
              ))}
            </MapView>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity
            className="bg-white px-4 py-5 rounded-xl flex-1 mr-2 shadow-lg elevation-3"
            onPress={handleSendLocation}
          >
            <Text className="text-[#DC143C] text-center font-bold text-base">
              Send My Location
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            className="bg-white px-4 py-5 rounded-xl flex-1 ml-2 shadow-lg elevation-3"
            onPress={() => {
              Alert.alert(
                "Police Escort",
                "Police escort request sent! You will receive a response shortly.\nEstimated arrival: 15 minutes"
              );
            }}
          >
            <Text className="text-[#DC143C] text-center font-bold text-base">
              Request Police Escort
            </Text>
          </TouchableOpacity> */}
        </View>

        {/* Report Incident Button */}
        <TouchableOpacity
          className="bg-[#DC143C] p-5 rounded-xl mb-6 shadow-lg elevation-5"
          onPress={() => {
            // Navigate to report form
          }}
        >
          <Text className="text-white text-center text-lg font-bold">
            Report an Incident
          </Text>
        </TouchableOpacity>

        {showSuccessAnimation && (
          <View className="absolute inset-0 bg-black/50 items-center justify-center">
            <View className="bg-white p-6 rounded-xl shadow-2xl">
              <Text className="text-[#333] text-lg font-medium">
                Location sent successfully!
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 300,
    width: Dimensions.get("window").width - 32,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
