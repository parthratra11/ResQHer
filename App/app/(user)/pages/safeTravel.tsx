import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, Polyline } from "react-native-maps";
import Header from "@/app/AppComponents/User/Header";

const DUMMY_ROUTES = [
  {
    id: 1,
    name: "Route 1",
    safety: "Highly Safe",
    eta: "15 mins",
    distance: "2.5 km",
    color: "#4CAF50",
  },
  {
    id: 2,
    name: "Route 2",
    safety: "Moderate Risk",
    eta: "12 mins",
    distance: "2.1 km",
    color: "#FFA000",
  },
];

const DUMMY_SAFE_PLACES = [
  {
    id: 1,
    name: "Police Station",
    coordinate: { latitude: 28.6139, longitude: 77.209 },
    type: "police",
  },
  {
    id: 2,
    name: "Hospital",
    coordinate: { latitude: 28.615, longitude: 77.21 },
    type: "hospital",
  },
];

export default function SafeTravel() {
  const [isTracking, setIsTracking] = useState(false);
  const [audioDetection, setAudioDetection] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const toggleTracking = () => {
    if (!isTracking) {
      Alert.alert(
        "Journey Started",
        "Your guardians will be notified of your travel."
      );
    }
    setIsTracking(!isTracking);
  };

  const triggerSOS = () => {
    Alert.alert(
      "SOS Activated",
      "Emergency contacts have been notified with your location.",
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.container}>
      <View className="px-4 pt-2 mb-2">
        <Header />
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 28.6139,
          longitude: 77.209,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {DUMMY_SAFE_PLACES.map((place) => (
          <Marker
            key={place.id}
            coordinate={place.coordinate}
            title={place.name}
          >
            <Ionicons
              name={place.type === "police" ? "shield" : "medical"}
              size={24}
              color="#007AFF"
            />
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity style={styles.sosButton} onPress={triggerSOS}>
        <Ionicons name="warning" size={32} color="white" />
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>

      <ScrollView style={styles.routesContainer}></ScrollView>
      <View style={styles.safetyControls}>
        <View style={styles.controlItem}>
          <Text style={styles.controlLabel}>Audio Detection</Text>
          <Switch value={audioDetection} onValueChange={setAudioDetection} />
        </View>
        <TouchableOpacity
          style={[styles.trackingButton, isTracking && styles.trackingActive]}
          onPress={toggleTracking}
        >
          <Text style={styles.trackingButtonText}>
            {isTracking ? "Stop Journey" : "Start Journey"}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Available Routes</Text>
      {DUMMY_ROUTES.map((route) => (
        <TouchableOpacity
          key={route.id}
          style={[
            styles.routeCard,
            selectedRoute?.id === route.id && styles.selectedRoute,
          ]}
          onPress={() => setSelectedRoute(route)}
        >
          <View style={styles.routeInfo}>
            <Text style={styles.routeName}>{route.name}</Text>
            <Text style={[styles.safetyLabel, { color: route.color }]}>
              {route.safety}
            </Text>
            <Text style={styles.routeDetails}>
              {route.eta} • {route.distance}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  map: {
    height: Dimensions.get("window").height * 0.4,
  },
  sosButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sosText: {
    color: "white",
    fontWeight: "bold",
    marginTop: 5,
  },
  routesContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    padding: 20,
  },
  safetyControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  controlItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  trackingButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
  },
  trackingActive: {
    backgroundColor: "#FF3B30",
  },
  trackingButtonText: {
    color: "white",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  routeCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  selectedRoute: {
    borderColor: "#007AFF",
    backgroundColor: "#f0f8ff",
  },
  routeInfo: {
    flex: 1,
  },
  routeName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  safetyLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  routeDetails: {
    fontSize: 14,
    color: "#666",
  },
});
