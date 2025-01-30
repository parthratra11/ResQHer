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

const enhancedAmenityData = [
  // Police Stations
  {
    id: 1,
    name: "Central Police Station",
    type: "police",
    latitude: 28.6139,
    longitude: 77.209,
    rating: 4.5,
    contact: "100",
    description: "24/7 police assistance with women's cell",
  },
  {
    id: 2,
    name: "Karol Bagh Police Station",
    type: "police",
    latitude: 28.6449,
    longitude: 77.1903,
    rating: 4.2,
    contact: "100",
    description: "Women's safety unit available",
  },
  {
    id: 3,
    name: "Defence Colony Police",
    type: "police",
    latitude: 28.578,
    longitude: 77.2345,
    rating: 4.3,
    contact: "100",
    description: "Police station with dedicated women's cell",
  },
  {
    id: 4,
    name: "Hauz Khas Police Station",
    type: "police",
    latitude: 28.5494,
    longitude: 77.2001,
    rating: 4.4,
    contact: "100",
    description: "24/7 patrol and emergency response",
  },

  // Hospitals
  {
    id: 5,
    name: "AIIMS Hospital",
    type: "hospital",
    latitude: 28.5672,
    longitude: 77.21,
    rating: 4.8,
    contact: "011-2658-8500",
    description: "Premier government hospital with 24/7 emergency",
  },
  {
    id: 6,
    name: "Fortis Hospital",
    type: "hospital",
    latitude: 28.5489,
    longitude: 77.2722,
    rating: 4.7,
    contact: "011-4277-6222",
    description: "Multi-specialty private hospital",
  },
  {
    id: 7,
    name: "Max Super Specialty",
    type: "hospital",
    latitude: 28.6307,
    longitude: 77.2219,
    rating: 4.6,
    contact: "011-2651-5050",
    description: "Emergency and trauma care",
  },
  {
    id: 8,
    name: "Apollo Hospital",
    type: "hospital",
    latitude: 28.5619,
    longitude: 77.2832,
    rating: 4.8,
    contact: "011-2323-2323",
    description: "Premium emergency care",
  },

  // Help Centers
  {
    id: 9,
    name: "Women's Crisis Center",
    type: "helpCenter",
    latitude: 28.6356,
    longitude: 77.2217,
    rating: 4.4,
    contact: "1091",
    description: "Crisis intervention & counseling",
  },
  {
    id: 10,
    name: "Delhi Commission for Women",
    type: "helpCenter",
    latitude: 28.6289,
    longitude: 77.2065,
    rating: 4.5,
    contact: "011-2378-1369",
    description: "Official women's commission office",
  },
  {
    id: 11,
    name: "NGO Help Center",
    type: "helpCenter",
    latitude: 28.6412,
    longitude: 77.2139,
    rating: 4.3,
    contact: "011-2345-6789",
    description: "NGO-run women's support center",
  },

  // Transport Hubs
  {
    id: 12,
    name: "Kashmere Gate Metro",
    type: "transport",
    latitude: 28.6675,
    longitude: 77.2285,
    rating: 4.5,
    contact: "011-2345-6789",
    description: "Major metro interchange",
  },
  {
    id: 13,
    name: "Connaught Place Metro",
    type: "transport",
    latitude: 28.6333,
    longitude: 77.2167,
    rating: 4.6,
    contact: "011-2345-6789",
    description: "Central Delhi metro hub",
  },
  {
    id: 14,
    name: "Rajiv Chowk Metro",
    type: "transport",
    latitude: 28.6327,
    longitude: 77.2203,
    rating: 4.7,
    contact: "011-2345-6789",
    description: "Major interchange station",
  },

  // Safe Cabs
  {
    id: 15,
    name: "Pink Cabs Hub",
    type: "safeCab",
    latitude: 28.6129,
    longitude: 77.2295,
    rating: 4.4,
    contact: "011-9876-5432",
    description: "Women-driven cab service",
  },
  {
    id: 16,
    name: "Women's Taxi Stand",
    type: "safeCab",
    latitude: 28.6333,
    longitude: 77.2189,
    rating: 4.3,
    contact: "011-8765-4321",
    description: "24/7 women's taxi service",
  },
  {
    id: 17,
    name: "Safe Drive Service",
    type: "safeCab",
    latitude: 28.5977,
    longitude: 77.2158,
    rating: 4.5,
    contact: "011-7654-3210",
    description: "Verified women drivers",
  },

  // Shelters
  {
    id: 18,
    name: "Seva Shelter Home",
    type: "shelter",
    latitude: 28.6235,
    longitude: 77.2189,
    rating: 4.1,
    contact: "011-2345-6780",
    description: "Safe accommodation for women",
  },
  {
    id: 19,
    name: "Working Women's Hostel",
    type: "shelter",
    latitude: 28.6401,
    longitude: 77.2123,
    rating: 4.2,
    contact: "011-3456-7890",
    description: "Secure hostel facility",
  },
  {
    id: 20,
    name: "Emergency Shelter",
    type: "shelter",
    latitude: 28.6154,
    longitude: 77.2157,
    rating: 4.0,
    contact: "011-4567-8901",
    description: "24/7 emergency accommodation",
  },

  // Pharmacies
  {
    id: 21,
    name: "24x7 Guardian Pharmacy",
    type: "pharmacy",
    latitude: 28.6512,
    longitude: 77.2315,
    rating: 4.3,
    contact: "011-4567-8901",
    description: "24/7 medical supplies",
  },
  {
    id: 22,
    name: "Apollo Pharmacy",
    type: "pharmacy",
    latitude: 28.6333,
    longitude: 77.2198,
    rating: 4.4,
    contact: "011-5678-9012",
    description: "Chain pharmacy store",
  },
  {
    id: 23,
    name: "Med Plus",
    type: "pharmacy",
    latitude: 28.6287,
    longitude: 77.2077,
    rating: 4.2,
    contact: "011-6789-0123",
    description: "Pharmacy with home delivery",
  },

  // Additional Police Stations
  {
    id: 24,
    name: "Vasant Kunj Police Station",
    type: "police",
    latitude: 28.5253,
    longitude: 77.1577,
    rating: 4.1,
    contact: "100",
    description: "Local police station with patrol",
  },
  {
    id: 25,
    name: "Dwarka Police Station",
    type: "police",
    latitude: 28.5921,
    longitude: 77.046,
    rating: 4.2,
    contact: "100",
    description: "Sector-based police station",
  },

  // Additional Hospitals
  {
    id: 26,
    name: "Lok Nayak Hospital",
    type: "hospital",
    latitude: 28.6389,
    longitude: 77.2373,
    rating: 4.3,
    contact: "011-2323-4455",
    description: "Government hospital with emergency",
  },
  {
    id: 27,
    name: "Sir Ganga Ram Hospital",
    type: "hospital",
    latitude: 28.6383,
    longitude: 77.189,
    rating: 4.7,
    contact: "011-2575-7575",
    description: "Multi-specialty hospital",
  },

  // Additional Transport Hubs
  {
    id: 28,
    name: "New Delhi Railway Station",
    type: "transport",
    latitude: 28.6419,
    longitude: 77.2193,
    rating: 4.3,
    contact: "011-2345-6789",
    description: "Major railway station",
  },
  {
    id: 29,
    name: "Hazrat Nizamuddin Station",
    type: "transport",
    latitude: 28.5883,
    longitude: 77.2579,
    rating: 4.2,
    contact: "011-2345-6789",
    description: "Railway station with metro connection",
  },
  {
    id: 30,
    name: "ISBT Kashmere Gate",
    type: "transport",
    latitude: 28.668,
    longitude: 77.2293,
    rating: 4.1,
    contact: "011-2345-6789",
    description: "Interstate bus terminal",
  },
];

export default function AmenityMap() {
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
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
    latitudeDelta: 0.0922, // Adjusted for better initial zoom
    longitudeDelta: 0.0421,
  });

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
    return enhancedAmenityData.filter((item) => filters[item.type]);
  }, [filters]);

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
