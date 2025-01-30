import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import Header from "@/app/AppComponents/User/Header";

export default function Report() {
  const router = useRouter();
  const [incidentType, setIncidentType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const incidentTypes = [
    "Domestic Violence",
    "Harassment",
    "Stalking",
    "Workplace Issue",
    "Public Safety",
    "Other",
  ];

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location access is required for reporting."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address[0]) {
        setLocation(
          `${address[0].street}, ${address[0].city}, ${address[0].region}`
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Denied", "Camera roll permissions are required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const handleSubmit = () => {
    if (!incidentType || !description) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Report Submitted",
        "Your report has been submitted successfully. Authorities will contact you soon.",
        [{ text: "OK", onPress: () => router.back() }]
      );
    }, 2000);
  };

  return (
    <View className="flex-1 bg-[#FFF1F3]">
      <View className="px-4 pt-4">
        <Header />
      </View>
      <View className="p-5 bg-[#DC143C]">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text className="text-xl font-bold text-white ml-2">
            Report Incident
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-5">
        {/* Incident Type Selection */}
        <Text className="text-lg font-semibold mb-2">Type of Incident*</Text>
        <View className="flex-row flex-wrap gap-2 mb-4">
          {incidentTypes.map((type) => (
            <TouchableOpacity
              key={type}
              className={`px-4 py-2 rounded-full border ${
                incidentType === type
                  ? "bg-[#DC143C] border-[#DC143C]"
                  : "bg-white border-gray-300"
              }`}
              onPress={() => setIncidentType(type)}
            >
              <Text
                className={
                  incidentType === type ? "text-white" : "text-gray-700"
                }
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Description Input */}
        <Text className="text-lg font-semibold mb-2">Description*</Text>
        <TextInput
          className="bg-white p-4 rounded-xl mb-4 min-h-[120px] text-base"
          multiline
          placeholder="Please describe what happened..."
          value={description}
          onChangeText={setDescription}
          textAlignVertical="top"
        />

        {/* Location Display */}
        <Text className="text-lg font-semibold mb-2">Location</Text>
        <View className="bg-white p-4 rounded-xl mb-4 flex-row items-center">
          <Ionicons name="location-outline" size={20} color="#DC143C" />
          <Text className="ml-2 flex-1">
            {location || "Fetching location..."}
          </Text>
        </View>

        {/* Evidence Upload */}
        <Text className="text-lg font-semibold mb-2">Evidence (Optional)</Text>
        <View className="flex-row flex-wrap gap-2 mb-4">
          {images.map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              className="w-20 h-20 rounded-lg"
            />
          ))}
          <TouchableOpacity
            className="w-20 h-20 bg-white rounded-lg justify-center items-center border-2 border-dashed border-gray-300"
            onPress={pickImage}
          >
            <Ionicons name="add" size={24} color="#DC143C" />
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className={`bg-[#DC143C] p-4 rounded-xl mt-4 mb-8 ${
            loading ? "opacity-50" : "opacity-100"
          }`}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text className="text-white text-center text-lg font-semibold">
            {loading ? "Submitting..." : "Submit Report"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
