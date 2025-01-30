import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Header from "../../AppComponents/User/Header";
import { styled } from "nativewind";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";

// Mock data for lawyers
const LAWYERS = [
  {
    id: 1,
    name: "Adv. Sarah Johnson",
    specialization: "Women's Rights, Domestic Violence",
    experience: 12,
    languages: ["English", "Hindi"],
    isAvailable: true,
    rating: 4.8,
    location: "Mumbai Central",
  },
  {
    id: 2,
    name: "Adv. Priya Mehta",
    specialization: "Cybercrime, Workplace Harassment",
    experience: 8,
    languages: ["English", "Hindi", "Gujarati"],
    isAvailable: true,
    rating: 4.9,
    location: "Bandra West",
  },
  {
    id: 3,
    name: "Adv. Rachel D'Souza",
    specialization: "Family Law, Property Rights",
    experience: 15,
    languages: ["English", "Marathi"],
    isAvailable: false,
    rating: 4.7,
    location: "Andheri East",
  },
  {
    id: 4,
    name: "Adv. Fatima Khan",
    specialization: "Criminal Law, Sexual Harassment",
    experience: 10,
    languages: ["English", "Hindi", "Urdu"],
    isAvailable: true,
    rating: 4.9,
    location: "Colaba",
  },
  {
    id: 5,
    name: "Adv. Maya Sharma",
    specialization: "Digital Rights, Privacy Law",
    experience: 6,
    languages: ["English", "Hindi", "Bengali"],
    isAvailable: true,
    rating: 4.6,
    location: "Powai",
  },
];

const LEGAL_RESOURCES = [
  {
    id: 1,
    title: "Workplace Harassment Laws",
    description:
      "Understanding your rights and protections against workplace harassment.",
    icon: "briefcase-outline",
  },
  {
    id: 2,
    title: "Domestic Violence Protection",
    description:
      "Legal remedies and protection orders for domestic violence survivors.",
    icon: "home-outline",
  },
  {
    id: 3,
    title: "Cybercrime Reporting",
    description:
      "Step-by-step guide to report online harassment and cybercrime.",
    icon: "globe-outline",
  },
  {
    id: 4,
    title: "Property Rights Guide",
    description: "Women's rights in property inheritance and ownership.",
    icon: "business-outline",
  },
];

export default function LawyersConnect() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);

  const handleEmergencyCall = async (number) => {
    Alert.alert("Emergency Call", "Are you sure you want to place this call?", [
      { text: "Cancel", style: "cancel" },
      { text: "Call", onPress: () => Linking.openURL(`tel:${number}`) },
    ]);
  };

  const handleConsultation = (lawyer) => {
    setSelectedLawyer(lawyer);
    setShowConsultModal(true);
  };

  return (
    <View className="flex-1 bg-[#FFF1F3]">
      <ScrollView className="flex-1">
        <View className="px-4 pt-4">
          <Header />
        </View>
        {/* Quick Connect Section */}
        <View className="p-4">
          <Text className="text-2xl font-bold text-[#DC143C] mb-4">
            Quick Connect to Legal Help
          </Text>
          <View className="flex-row flex-wrap justify-between">
            <TouchableOpacity
              className="bg-[#DC143C] p-4 rounded-xl w-[48%] mb-3 shadow-md"
              onPress={() => handleEmergencyCall("112")}
            >
              <Text className="text-white text-center font-medium">
                Emergency Helpline
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#DC143C] p-4 rounded-xl w-[48%] mb-3 shadow-md"
              onPress={() => handleEmergencyCall("1091")}
            >
              <Text className="text-white text-center font-medium">
                Women's Helpline
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search and Filter Lawyers */}
        <View className="px-4">
          <TextInput
            className="bg-white p-3 rounded-xl mb-4 shadow-sm"
            placeholder="Search lawyers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* Lawyers List */}
          {LAWYERS.map((lawyer) => (
            <View
              key={lawyer.id}
              className="bg-white p-4 rounded-xl mb-4 shadow-md"
            >
              <Text className="text-lg font-bold text-[#333]">
                {lawyer.name}
              </Text>
              <Text className="text-gray-600">{lawyer.specialization}</Text>
              <Text className="text-gray-600">
                {lawyer.experience} years experience
              </Text>
              <Text className="text-gray-600">📍 {lawyer.location}</Text>
              <View className="flex-row justify-between items-center mt-3">
                {lawyer.isAvailable ? (
                  <View className="bg-green-100 px-2 py-1 rounded">
                    <Text className="text-green-800">Available Now</Text>
                  </View>
                ) : (
                  <View className="bg-red-100 px-2 py-1 rounded">
                    <Text className="text-red-800">Unavailable</Text>
                  </View>
                )}
                <TouchableOpacity
                  className="bg-[#DC143C] px-4 py-2 rounded-lg"
                  onPress={() => handleConsultation(lawyer)}
                >
                  <Text className="text-white font-medium">
                    Request Consultation
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Know Your Rights Section */}
        <View className="px-4 pt-2">
          <Text className="text-2xl font-bold text-[#DC143C] mb-4">
            Know Your Rights
          </Text>
          {LEGAL_RESOURCES.map((resource) => (
            <TouchableOpacity
              key={resource.id}
              className="bg-white p-4 rounded-xl mb-4 shadow-md"
            >
              <Text className="text-lg font-bold text-[#333]">
                {resource.title}
              </Text>
              <Text className="text-gray-600">{resource.description}</Text>
              <Text className="text-[#DC143C] mt-2 font-medium">
                Read More →
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Emergency Assistance Button */}
        <TouchableOpacity
          className="bg-[#DC143C] p-4 m-4 rounded-xl shadow-lg"
          onPress={() => {
            Alert.alert(
              "Emergency Request Sent",
              "Your emergency request has been received. A legal expert will contact you shortly."
            );
          }}
        >
          <Text className="text-white text-center text-lg font-bold">
            Emergency Legal Assistance
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Consultation Modal */}
      <Modal
        visible={showConsultModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowConsultModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-xl w-[90%]">
            <Text className="text-xl font-bold mb-4 text-[#DC143C]">
              Request Consultation
            </Text>
            <TextInput
              className="bg-[#FFF1F3] p-3 rounded-xl mb-4"
              placeholder="Brief description of your case"
              multiline
            />
            <TouchableOpacity
              className="bg-[#DC143C] p-4 rounded-xl"
              onPress={() => {
                Alert.alert(
                  "Success",
                  "Consultation request sent successfully!"
                );
                setShowConsultModal(false);
              }}
            >
              <Text className="text-white text-center font-medium">
                Submit Request
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* AI Chatbot Button */}
      <TouchableOpacity
        className="absolute bottom-5 right-5 w-16 h-16 m-1 rounded-full bg-[#DC143C] justify-center items-center shadow-lg"
        onPress={() => {
          router.push("/pages/aiChat");
        }}
      >
        <Ionicons name="chatbubbles-outline" size={28} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}
