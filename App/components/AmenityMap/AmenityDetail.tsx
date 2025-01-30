import React from "react";
import { Modal, View, Text, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AmenityDetail = ({ amenity, visible, onClose, darkMode }) => {
  const handleCall = () => {
    Linking.openURL(`tel:${amenity.phone}`);
  };

  const handleNavigation = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${amenity.latitude},${amenity.longitude}`;
    Linking.openURL(url);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <View
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-t-3xl p-6`}
        >
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              {amenity.name}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons
                name="close"
                size={24}
                color={darkMode ? "#fff" : "#000"}
              />
            </TouchableOpacity>
          </View>

          {/* Details */}
          <View className="space-y-3">
            <View className="flex-row items-center">
              <Ionicons
                name="location"
                size={20}
                color={darkMode ? "#fff" : "#000"}
              />
              <Text
                className={`ml-2 ${darkMode ? "text-white" : "text-black"}`}
              >
                {amenity.address}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons
                name="call"
                size={20}
                color={darkMode ? "#fff" : "#000"}
              />
              <Text
                className={`ml-2 ${darkMode ? "text-white" : "text-black"}`}
              >
                {amenity.phone}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons
                name="star"
                size={20}
                color={darkMode ? "#fff" : "#000"}
              />
              <Text
                className={`ml-2 ${darkMode ? "text-white" : "text-black"}`}
              >
                {amenity.rating} / 5.0
              </Text>
            </View>

            <Text
              className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              {amenity.notes}
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-between mt-6">
            <TouchableOpacity
              onPress={handleCall}
              className="flex-1 mr-2 bg-green-500 p-3 rounded-lg flex-row justify-center items-center"
            >
              <Ionicons name="call" size={20} color="white" />
              <Text className="text-white ml-2">Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNavigation}
              className="flex-1 ml-2 bg-blue-500 p-3 rounded-lg flex-row justify-center items-center"
            >
              <Ionicons name="navigate" size={20} color="white" />
              <Text className="text-white ml-2">Navigate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AmenityDetail;
