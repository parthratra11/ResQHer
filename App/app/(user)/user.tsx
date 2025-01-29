import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "../AppComponents/User/Header";
import * as Location from "expo-location";

const UserDashboard = () => {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [holdCount, setHoldCount] = useState(null);
  const [recordingTime, setRecordingTime] = useState(null);
  const [isHolding, setIsHolding] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationString, setLocationString] = useState("None");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Get readable address
      try {
        let addresses = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        if (addresses && addresses.length > 0) {
          const address = addresses[0];
          setLocationString(
            `${address.subregion || address.district || ""}, ${address.city}`
          );
        }
      } catch (error) {
        setLocationString("None");
      }
    })();
  }, []);

  // Handle countdown during hold
  useEffect(() => {
    let timer;
    if (isHolding && holdCount !== null && holdCount > 0) {
      timer = setTimeout(() => {
        setHoldCount(holdCount - 1);
      }, 1000);
    } else if (isHolding && holdCount === 0) {
      setIsRecording(true);
      setRecordingTime(15);
      setIsHolding(false); // Reset holding state
    }
    return () => clearTimeout(timer);
  }, [holdCount, isHolding]);

  // Handle recording countdown
  useEffect(() => {
    let timer;
    if (isRecording && recordingTime !== null && recordingTime > 0) {
      timer = setTimeout(() => {
        setRecordingTime(recordingTime - 1);
      }, 1000);
    } else if (recordingTime === 0) {
      setIsRecording(false);
      setRecordingTime(null);
      // Add your logic to stop recording here
    }
    return () => clearTimeout(timer);
  }, [recordingTime, isRecording]);

  const handleSOSPress = () => {
    router.push("/pages/report");
  };

  const handleSOSLongPress = () => {
    setIsHolding(true);
    setHoldCount(3);
  };

  const handlePressOut = () => {
    if (!isRecording) {
      setHoldCount(null);
      setIsHolding(false);
    }
  };

  const getButtonText = () => {
    if (isHolding && holdCount !== null && holdCount > 0) {
      return holdCount.toString();
    }
    if (isRecording) {
      return `REC ${recordingTime}s`;
    }
    return "SOS";
  };

  return (
    <View className="flex-1 p-5 bg-[#FFF1F3]">
      <Header />
      {/* Location Container */}
      <View className="flex-row items-center mb-6 mt-2">
        <Ionicons name="location-outline" size={20} color="black" />
        <Text className="text-md text-black ml-1 font-medium">
          Current Location: {locationString}
        </Text>
      </View>

      {/* SOS Button */}
      <TouchableOpacity
        className={`w-40 h-40 rounded-full ${
          isRecording ? "bg-[#8B0000]" : "bg-[#FF3B30]"
        } justify-center items-center self-center mb-3 mt-4 shadow-lg`}
        onPress={handleSOSPress}
        onLongPress={handleSOSLongPress}
        onPressOut={handlePressOut}
        delayLongPress={100}
      >
        <Text className="text-white text-3xl font-bold">{getButtonText()}</Text>
      </TouchableOpacity>
      <Text className="text-[#DC143C] mb-12 text-center font-semibold">
        Press for Report - Hold for Emergency Recording
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
            onPress={() => {
              router.push("/pages/safeTravel");
            }}
          >
            <Ionicons name="map-outline" size={24} color="#DC143C" />
            <Text className="mt-2 text-[#333] font-medium text-center">
              Safe Travel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white p-6 py-8 rounded-xl mb-3 items-center shadow-md shadow-[#DC143C]"
            onPress={() => {
              router.push("/pages/helplines");
            }}
          >
            <Ionicons name="call-outline" size={24} color="#DC143C" />
            <Text className="mt-2 text-[#333] font-medium text-center">
              Helplines
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white shadow-md p-6 py-8 rounded-xl mb-3 items-center shadow-[#DC143C]"
            onPress={() => {
              router.push("/pages/iotLink");
            }}
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
            onPress={() => {
              router.push("/pages/community");
            }}
          >
            <Ionicons name="people-outline" size={24} color="#DC143C" />
            <Text className="mt-2 text-[#333] font-medium text-center">
              Community
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white p-6 py-8 rounded-xl mb-3 items-center shadow-md shadow-[#DC143C]"
            onPress={() => {
              router.push("/pages/amenityMap");
            }}
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
            <Text
              className="mt-2 text-[#333] font-medium text-center"
              onPress={() => {
                router.push("/pages/feedback");
              }}
            >
              Feedback
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
};

export default UserDashboard;
