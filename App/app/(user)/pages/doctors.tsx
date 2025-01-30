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
import { Ionicons } from "@expo/vector-icons";
import Header from "../../AppComponents/User/Header";

// Mock data for doctors
const DOCTORS = [
  {
    id: 1,
    name: "Dr. Priya Shah",
    specialization: "Gynecologist",
    experience: 15,
    languages: ["English", "Hindi"],
    isAvailable: true,
    rating: 4.8,
    location: "Andheri East",
    consultationFee: "₹800",
  },
  {
    id: 2,
    name: "Dr. Sarah Khan",
    specialization: "Mental Health",
    experience: 10,
    languages: ["English", "Hindi", "Urdu"],
    isAvailable: true,
    rating: 4.9,
    location: "Bandra West",
    consultationFee: "₹1000",
  },
  {
    id: 3,
    name: "Dr. Anjali Desai",
    specialization: "General Physician",
    experience: 12,
    languages: ["English", "Gujarati"],
    isAvailable: false,
    rating: 4.7,
    location: "Powai",
    consultationFee: "₹500",
  },
  {
    id: 4,
    name: "Dr. Mary Thomas",
    specialization: "Pediatrician",
    experience: 8,
    languages: ["English", "Malayalam"],
    isAvailable: true,
    rating: 4.6,
    location: "Malad West",
    consultationFee: "₹700",
  },
];

const HEALTH_RESOURCES = [
  {
    id: 1,
    title: "Women's Health Guide",
    description: "Essential health tips and regular checkup guidelines.",
    icon: "woman-outline",
  },
  {
    id: 2,
    title: "Mental Wellness",
    description: "Understanding mental health and seeking help.",
    icon: "brain-outline",
  },
  {
    id: 3,
    title: "Pregnancy Care",
    description: "Complete guide for maternal health and childcare.",
    icon: "heart-outline",
  },
];

export default function DoctorsConnect() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const handleEmergencyCall = (number) => {
    Alert.alert("Emergency Call", "Are you sure you want to place this call?", [
      { text: "Cancel", style: "cancel" },
      { text: "Call", onPress: () => Linking.openURL(`tel:${number}`) },
    ]);
  };

  const handleBooking = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const handleSendLocation = () => {
    Alert.alert(
      "Share Location",
      "Send your current location to nearest hospital?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send",
          onPress: () =>
            Alert.alert("Success", "Location shared with emergency services!"),
        },
      ]
    );
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
            Quick Medical Help
          </Text>
          <View className="flex-row flex-wrap justify-between">
            <TouchableOpacity
              className="bg-[#DC143C] p-4 rounded-xl w-[48%] mb-3 shadow-md"
              onPress={() => handleEmergencyCall("102")}
            >
              <Text className="text-white text-center font-medium">
                Ambulance
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#DC143C] p-4 rounded-xl w-[48%] mb-3 shadow-md"
              onPress={handleSendLocation}
            >
              <Text className="text-white text-center font-medium">
                Send Location
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Doctors */}
        <View className="px-4">
          <TextInput
            className="bg-white p-3 rounded-xl mb-4 shadow-sm"
            placeholder="Search doctors by name or specialization..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* Doctors List */}
          {DOCTORS.map((doctor) => (
            <View
              key={doctor.id}
              className="bg-white p-4 rounded-xl mb-4 shadow-md"
            >
              <View className="mb-2">
                <Text className="text-lg font-bold text-[#333]">
                  {doctor.name}
                </Text>
                <Text className="text-gray-600">{doctor.specialization}</Text>
                <Text className="text-gray-600">
                  {doctor.experience} years experience
                </Text>
                <Text className="text-gray-600">📍 {doctor.location}</Text>
                <Text className="text-[#DC143C] font-medium mt-1">
                  Fee: {doctor.consultationFee}
                </Text>
              </View>

              <View className="flex-row justify-between items-center mt-3">
                {doctor.isAvailable ? (
                  <View className="bg-green-100 px-3 py-1 rounded-lg">
                    <Text className="text-green-800">Available Now</Text>
                  </View>
                ) : (
                  <View className="bg-red-100 px-3 py-1 rounded-lg">
                    <Text className="text-red-800">Unavailable</Text>
                  </View>
                )}
                <TouchableOpacity
                  className="bg-[#DC143C] px-4 py-2 rounded-lg"
                  onPress={() => handleBooking(doctor)}
                >
                  <Text className="text-white font-medium">
                    Book Consultation
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Health Resources */}
        <View className="px-4 pt-2 pb-4">
          <Text className="text-2xl font-bold text-[#DC143C] mb-4">
            Health Resources
          </Text>
          {HEALTH_RESOURCES.map((resource) => (
            <TouchableOpacity
              key={resource.id}
              className="bg-white p-4 rounded-xl mb-4 shadow-md"
            >
              <View className="flex-row items-center">
                <View className="bg-[#FFF1F3] p-2 rounded-lg">
                  <Ionicons name={resource.icon} size={24} color="#DC143C" />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-lg font-bold text-[#333]">
                    {resource.title}
                  </Text>
                  <Text className="text-gray-600">{resource.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Emergency Button */}
        <TouchableOpacity
          className="bg-[#DC143C] p-4 mx-4 mb-6 rounded-xl shadow-lg"
          onPress={() => {
            Alert.alert(
              "Emergency Request Sent",
              "Your emergency medical request has been received. Help is on the way."
            );
          }}
        >
          <Text className="text-white text-center text-lg font-bold">
            Request Emergency Medical Help
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Booking Modal */}
      <Modal
        visible={showBookingModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowBookingModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-xl w-[90%]">
            <Text className="text-xl font-bold mb-4 text-[#DC143C]">
              Book Consultation
            </Text>
            <TextInput
              className="bg-[#FFF1F3] p-3 rounded-xl mb-4"
              placeholder="Brief description of your health concern"
              multiline
            />
            <TouchableOpacity
              className="bg-[#DC143C] p-4 rounded-xl"
              onPress={() => {
                Alert.alert("Success", "Consultation booked successfully!");
                setShowBookingModal(false);
              }}
            >
              <Text className="text-white text-center font-medium">
                Confirm Booking
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
