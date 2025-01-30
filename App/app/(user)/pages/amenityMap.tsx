import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Switch,
} from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { amenityData } from "../../../data/amenityData";
import AmenityFilter from "../../../components/AmenityMap/AmenityFilter";
import AmenityDetail from "../../../components/AmenityMap/AmenityDetail";
import SearchBar from "../../../components/AmenityMap/SearchBar";
import Header from "@/app/AppComponents/User/Header";

export default function AmenityMap() {
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [filters, setFilters] = useState({
    police: true,
    hospital: true,
    helpCenter: true,
    transport: true,
    safeCab: true,
  });
  const [region, setRegion] = useState({
    latitude: 28.6139,
    longitude: 77.209,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  });

  const getMarkerColor = (type) => {
    const colors = {
      police: "#0066cc",
      hospital: "#ff3b30",
      helpCenter: "#8e44ad",
      transport: "#2ecc71",
      safeCab: "#f1c40f",
    };
    return colors[type] || "#000";
  };

  // Add error handling for amenityData
  const filteredAmenities = React.useMemo(() => {
    if (!amenityData) return [];
    return amenityData.filter((item) => filters[item.type]);
  }, [filters, amenityData]);

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

  if (!amenityData) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading amenities...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header with proper spacing */}
      <View className="px-4 pt-12 pb-2 bg-white shadow-sm z-10">
        <Header />
      </View>

      {/* Main Content */}
      <View className="flex-1 relative">
        <MapView
          style={{ width: "100%", height: "100%" }}
          initialRegion={region}
          onRegionChangeComplete={onRegionChangeComplete}
          minZoomLevel={11}
          maxZoomLevel={18}
          showsUserLocation
          showsMyLocationButton
          showsCompass
          rotateEnabled={false}
          userInterfaceStyle="light"
          mapPadding={{ top: 0, right: 0, bottom: 80, left: 0 }}
        >
          {filteredAmenities.map((amenity, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: amenity.latitude,
                longitude: amenity.longitude,
              }}
              pinColor={getMarkerColor(amenity.type)}
              onPress={() => {
                setSelectedAmenity(amenity);
                setShowDetail(true);
              }}
              tracksViewChanges={false}
            />
          ))}
        </MapView>

        {/* Search Bar */}
        <View className="absolute top-2 left-4 right-4">
          <SearchBar darkMode={false} />
        </View>

        {/* Filters */}
        <View className="absolute bottom-4 left-0 right-0">
          <AmenityFilter
            filters={filters}
            setFilters={setFilters}
            darkMode={false}
          />
        </View>
      </View>

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
