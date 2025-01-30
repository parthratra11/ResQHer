import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Switch,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import AmenityFilter from "../../../components/AmenityMap/AmenityFilter";
import AmenityDetail from "../../../components/AmenityMap/AmenityDetail";
import SearchBar from "../../../components/AmenityMap/SearchBar";
import Header from "@/app/AppComponents/User/Header";
import { router } from "expo-router";
import { enhancedAmenityData } from "../../../data/amenityData";

export default function AmenityMap() {
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    police: true,
    hospital: true,
    helpCenter: true,
    transport: true,
    safeCab: true,
    shelter: true,
    pharmacy: true,
  });
  const [region, setRegion] = useState({
    latitude: 28.6139,
    longitude: 77.209,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Load amenities data
  useEffect(() => {
    const loadAmenities = async () => {
      try {
        setIsLoading(true);
        // Simulate async loading to ensure proper state update
        await new Promise((resolve) => setTimeout(resolve, 0));
        setAmenities(enhancedAmenityData);
      } catch (error) {
        console.error("Error loading amenities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAmenities();
  }, []);

  const getMarkerColor = (type) => {
    const colors = {
      police: "#1a73e8",
      hospital: "#e53935",
      helpCenter: "#9c27b0",
      transport: "#2e7d32",
      safeCab: "#f57c00",
      shelter: "#6d4c41",
      pharmacy: "#00acc1",
    };
    return colors[type] || "#000";
  };

  const MarkerCallout = ({ amenity }) => (
    <View
      style={{
        backgroundColor: "white",
        padding: 10,
        borderRadius: 6,
        minWidth: 200,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{amenity.name}</Text>
      <Text style={{ color: "#666" }}>{amenity.description}</Text>
      <Text style={{ color: "#1a73e8" }}>📞 {amenity.contact}</Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
      >
        <Text style={{ color: "#f57c00" }}>
          {"⭐".repeat(Math.floor(amenity.rating))}
        </Text>
        <Text style={{ marginLeft: 4, color: "#666" }}>({amenity.rating})</Text>
      </View>
    </View>
  );

  // Filter amenities based on selected filters
  const filteredAmenities = React.useMemo(() => {
    return amenities.filter((item) => filters[item.type]);
  }, [filters, amenities]);

  const onRegionChangeComplete = (newRegion) => {
    const DELHI_LIMITS = {
      north: 28.88,
      south: 28.4,
      east: 77.39,
      west: 76.84,
    };

    const newLat = Math.min(
      Math.max(newRegion.latitude, DELHI_LIMITS.south),
      DELHI_LIMITS.north
    );
    const newLng = Math.min(
      Math.max(newRegion.longitude, DELHI_LIMITS.west),
      DELHI_LIMITS.east
    );

    setRegion({
      latitude: newLat,
      longitude: newLng,
      latitudeDelta: Math.min(newRegion.latitudeDelta, 0.6),
      longitudeDelta: Math.min(newRegion.longitudeDelta, 0.6),
    });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading amenities...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Header */}
      <View className="px-4 pt-4 mb-2 bg-[#FFF1F3]">
        <Header />
      </View>

      {/* Main Content */}
      <View style={{ flex: 1, position: "relative" }}>
        <MapView
          style={{ width: "100%", height: "100%" }}
          region={region}
          onRegionChangeComplete={onRegionChangeComplete}
          minZoomLevel={11}
          maxZoomLevel={18}
          showsUserLocation
          showsMyLocationButton
          showsCompass
          rotateEnabled={false}
          userInterfaceStyle="light"
        >
          {filteredAmenities.map((amenity) => (
            <Marker
              key={amenity.id}
              coordinate={{
                latitude: amenity.latitude,
                longitude: amenity.longitude,
              }}
              pinColor={getMarkerColor(amenity.type)}
              onPress={() => {
                setSelectedAmenity(amenity);
                setShowDetail(true);
              }}
            >
              <Callout>
                <MarkerCallout amenity={amenity} />
              </Callout>
            </Marker>
          ))}
        </MapView>

        {/* Search Bar */}
        <View style={{ position: "absolute", top: 8, left: 16, right: 16 }}>
          <SearchBar darkMode={false} />
        </View>

        {/* Filter UI */}
        <View style={{ position: "absolute", bottom: 16, left: 0, right: 0 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ paddingHorizontal: 16 }}
          >
            {Object.entries(filters).map(([key, value]) => (
              <TouchableOpacity
                key={key}
                style={{
                  marginRight: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor: getMarkerColor(key),
                  opacity: value ? 0.9 : 0.3,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() =>
                  setFilters((prev) => ({ ...prev, [key]: !prev[key] }))
                }
              >
                <Text
                  style={{
                    color: value ? "white" : "#333",
                    textTransform: "capitalize",
                  }}
                >
                  {key}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* AI Chatbot Button */}
      <TouchableOpacity
        className="absolute bottom-16 right-5 w-16 h-16 m-1 rounded-full bg-[#DC143C] justify-center items-center shadow-lg"
        onPress={() => {
          router.push("/pages/aiChat");
        }}
      >
        <Ionicons name="chatbubbles-outline" size={28} color="#FFF" />
      </TouchableOpacity>

      {/* Amenity Detail Modal */}
      {showDetail && selectedAmenity && (
        <AmenityDetail
          amenity={selectedAmenity}
          visible={showDetail}
          onClose={() => setShowDetail(false)}
          darkMode={false}
        />
      )}
    </View>
  );
}
