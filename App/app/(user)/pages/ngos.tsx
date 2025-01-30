import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "@/app/AppComponents/User/Header";

const mockNGOs = [
  {
    id: 1,
    name: "Women's Safety Foundation",
    specialization: "Safety & Security",
    available: true,
    contact: "+91 1234567890",
  },
  {
    id: 2,
    name: "Legal Aid Society",
    specialization: "Legal Support",
    available: true,
    contact: "+91 9876543210",
  },
  {
    id: 3,
    name: "Mental Health Support",
    specialization: "Counseling",
    available: false,
    contact: "+91 8765432109",
  },
  {
    id: 4,
    name: "Safe Haven Shelter",
    specialization: "Emergency Shelter",
    available: true,
    contact: "+91 7654321098",
  },
];

export default function NGOsConnect() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const handleSendLocation = () => {
    Alert.alert(
      "Send Location",
      "Send your current location to an NGO? You will receive immediate help.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send",
          onPress: () => {
            setShowLocationModal(false);
            Alert.alert(
              "Location Sent",
              "An NGO representative will contact you shortly."
            );
          },
        },
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-[#FFF1F3]">
      <View className="px-4 pt-4">
        <Header />
      </View>
      {/* Header */}
      <View className="p-5 bg-[#DC143C]">
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-white mb-2">
          Connect with NGOs
        </Text>
        <Text className="text-white mb-2">
          Find support and assistance from verified organizations
        </Text>
      </View>

      {/* Emergency Quick Actions */}
      <View className="p-5">
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity
            className="bg-[#8B0000] p-4 rounded-xl flex-1 mr-2"
            onPress={() => setShowEmergencyModal(true)}
          >
            <Text className="text-white text-center font-bold">
              Emergency Help
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#DC143C] p-4 rounded-xl flex-1 ml-2"
            onPress={() => setShowLocationModal(true)}
          >
            <Text className="text-white text-center font-bold">
              Send Location
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search and Filter */}
        <View className="mb-4">
          <TextInput
            className="bg-white p-3 rounded-lg mb-2"
            placeholder="Search NGOs..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {["All", "Legal Aid", "Safety", "Shelter", "Counseling"].map(
              (filter) => (
                <TouchableOpacity
                  key={filter}
                  className={`px-4 py-2 rounded-full mr-2 ${
                    selectedFilter === filter ? "bg-[#DC143C]" : "bg-white"
                  }`}
                  onPress={() => setSelectedFilter(filter)}
                >
                  <Text
                    className={
                      selectedFilter === filter
                        ? "text-white"
                        : "text-[#DC143C]"
                    }
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>
        </View>

        {/* NGO List */}
        {mockNGOs.map((ngo) => (
          <TouchableOpacity
            key={ngo.id}
            className="bg-white p-4 rounded-xl mb-3 shadow-sm"
            onPress={() => Alert.alert("Contact NGO", `Calling ${ngo.name}...`)}
          >
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="text-lg font-bold text-[#333]">
                  {ngo.name}
                </Text>
                <Text className="text-[#666] mb-2">{ngo.specialization}</Text>
                <Text className="text-[#DC143C]">{ngo.contact}</Text>
              </View>
              <View
                className={`px-2 py-1 rounded-full ${
                  ngo.available ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <Text
                  className={ngo.available ? "text-green-600" : "text-red-600"}
                >
                  {ngo.available ? "Available" : "Busy"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Know Your Rights Section */}
        <Text className="text-xl font-bold text-[#333] mt-4 mb-3">
          Know Your Rights
        </Text>
        {["Legal Protection", "Social Services", "Emergency Help Guide"].map(
          (topic, index) => (
            <TouchableOpacity
              key={index}
              className="bg-white p-4 rounded-xl mb-3 shadow-sm"
            >
              <Text className="text-lg font-semibold text-[#333]">{topic}</Text>
              <Text className="text-[#666] mb-2">
                Learn about your rights and available resources
              </Text>
              <Text className="text-[#DC143C]">Read More →</Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {/* Emergency Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showEmergencyModal}
        onRequestClose={() => setShowEmergencyModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-xl w-4/5">
            <Text className="text-xl font-bold mb-4 text-[#DC143C]">
              Emergency NGO Assistance
            </Text>
            <Text className="mb-4">
              You will be connected to a nearby NGO offering emergency
              assistance.
            </Text>
            <TouchableOpacity
              className="bg-[#DC143C] p-3 rounded-lg mb-2"
              onPress={() => {
                setShowEmergencyModal(false);
                Alert.alert(
                  "Connecting",
                  "Connecting you to emergency services..."
                );
              }}
            >
              <Text className="text-white text-center font-bold">
                Connect Now
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-200 p-3 rounded-lg"
              onPress={() => setShowEmergencyModal(false)}
            >
              <Text className="text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Location Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLocationModal}
        onRequestClose={() => setShowLocationModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-xl w-4/5">
            <Text className="text-xl font-bold mb-4 text-[#DC143C]">
              Send Location
            </Text>
            <Text className="mb-4">
              Share your location with nearby NGOs for immediate assistance.
            </Text>
            <TouchableOpacity
              className="bg-[#DC143C] p-3 rounded-lg mb-2"
              onPress={handleSendLocation}
            >
              <Text className="text-white text-center font-bold">
                Share Location
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-200 p-3 rounded-lg"
              onPress={() => setShowLocationModal(false)}
            >
              <Text className="text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
