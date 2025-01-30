import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AmenityFilter = ({ filters, setFilters, darkMode }) => {
  const filterTypes = [
    { key: "police", icon: "shield-outline", label: "Police" },
    { key: "hospital", icon: "medical-outline", label: "Hospital" },
    { key: "helpCenter", icon: "people-outline", label: "Help Center" },
    { key: "transport", icon: "bus-outline", label: "Transport" },
    { key: "safeCab", icon: "car-outline", label: "Safe Cab" },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      className="bg-white py-2 shadow-lg"
    >
      {filterTypes.map((type) => (
        <TouchableOpacity
          key={type.key}
          onPress={() =>
            setFilters((prev) => ({ ...prev, [type.key]: !prev[type.key] }))
          }
          className={`items-center p-2 mx-2 min-w-[80px] ${
            filters[type.key] ? "opacity-100" : "opacity-50"
          }`}
        >
          <Ionicons name={type.icon} size={24} color="#000" />
          <Text className="text-xs text-black mt-1">{type.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default AmenityFilter;
