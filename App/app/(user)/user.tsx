import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../AppComponents/User/Header";

const UserDashboard = () => {
  return (
    <View className="flex-1 p-5 bg-[#FFF1F3]">
      <Header />
      {/* Location Container */}
      <View className="flex-row items-center mb-6 mt-2">
        <Ionicons name="location-outline" size={20} color="black" />
        <Text className="text-sm text-black ml-1 font-medium">
          Current Location: Mumbai, India
        </Text>
      </View>

      {/* SOS Button */}
      <TouchableOpacity
        className="w-40 h-40 rounded-full bg-[#FF3B30] justify-center items-center self-center mb-3 mt-4 shadow-lg"
        onPress={() => {}}
      >
        <Text className="text-white text-4xl font-bold">SOS</Text>
      </TouchableOpacity>
      <Text className="text-[#DC143C] mb-12 text-center font-semibold">
        Press for Report - Hold for Emergency
      </Text>

      {/* Feature Cards */}
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View className="flex-1 mx-1">
          <TouchableOpacity
            className="bg-white p-6 py-8 rounded-xl mb-3 items-center shadow-md shadow-[#DC143C]"
            onPress={() => {}}
          >
            <Ionicons name="map-outline" size={24} color="#DC143C" />
            <Text className="mt-2 text-[#333] font-medium text-center">
              Safe Travel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white p-6 py-8 rounded-xl mb-3 items-center shadow-md shadow-[#DC143C]"
            onPress={() => {}}
          >
            <Ionicons name="call-outline" size={24} color="#DC143C" />
            <Text className="mt-2 text-[#333] font-medium text-center">
              Helplines
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white shadow-md p-6 py-8 rounded-xl mb-3 items-center  shadow-[#DC143C]"
            onPress={() => {}}
          >
            <Ionicons name="bluetooth-outline" size={24} color="#DC143C" />
            <Text className="mt-2 text-[#333] font-medium text-center">
              IOT Linking
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 mx-1">
          <TouchableOpacity
            className="bg-white p-6 py-8 rounded-xl mb-3 items-center shadow-md shadow-[#DC143C]"
            onPress={() => {}}
          >
            <Ionicons name="people-outline" size={24} color="#DC143C" />
            <Text className="mt-2 text-[#333] font-medium text-center">
              Community
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white p-6 py-8 rounded-xl mb-3 items-center shadow-md shadow-[#DC143C]"
            onPress={() => {}}
          >
            <Ionicons name="medical-outline" size={24} color="#DC143C" />
            <Text className="mt-2 text-[#333] font-medium text-center">
              Amenity Map
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white p-6 py-8 rounded-xl mb-3 items-center shadow-md shadow-[#DC143C]"
            onPress={() => {}}
          >
            <Ionicons name="chatbox-outline" size={24} color="#DC143C" />
            <Text className="mt-2 text-[#333] font-medium text-center">
              Feedback
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* AI Chatbot Button */}
      <TouchableOpacity
        className="absolute bottom-5 right-5 w-20 h-20 m-1 rounded-full bg-[#DC143C] justify-center items-center shadow-lg"
        onPress={() => {}}
      >
        <Ionicons name="chatbubbles-outline" size={28} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default UserDashboard;
