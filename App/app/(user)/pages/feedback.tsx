import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import Header from "@/app/AppComponents/User/Header";

const FeedbackPage = () => {
  const router = useRouter();
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("general");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [image, setImage] = useState(null);
  const [feedbackHistory, setFeedbackHistory] = useState([
    {
      id: 1,
      text: "The app is great but needs dark mode",
      rating: 4,
      category: "Feature Request",
      status: "In Progress",
      date: "2024-01-15",
    },
    {
      id: 2,
      text: "Emergency SOS takes too long to trigger. Please optimize response time.",
      rating: 3,
      category: "Bug Report",
      status: "Received",
      date: "2024-01-18",
    },
    {
      id: 3,
      text: "It would be great to have multilingual support for non-English users.",
      rating: 5,
      category: "Feature Request",
      status: "Under Review",
      date: "2024-01-20",
    },
    {
      id: 4,
      text: "I encountered a crash when trying to access the community section.",
      rating: 2,
      category: "Bug Report",
      status: "Resolved",
      date: "2024-01-22",
    },
  ]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    { label: "General Feedback", value: "general" },
    { label: "Bug Report", value: "bug" },
    { label: "Feature Request", value: "feature" },
    { label: "Safety Concern", value: "safety" },
    { label: "Other", value: "other" },
  ];

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (feedback.length < 10) {
      Alert.alert("Error", "Feedback must be at least 10 characters long");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      text: feedback,
      rating,
      category,
      status: "Received",
      date: new Date().toISOString().split("T")[0],
      isAnonymous,
      image,
    };

    setFeedbackHistory([newFeedback, ...feedbackHistory]);
    setFeedback("");
    setRating(0);
    setCategory("general");
    setImage(null);
    Alert.alert("Success", "Feedback submitted successfully!");
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 bg-[#FFF1F3]">
        <View className="px-4 pt-2">
          <Header />
        </View>

        {/* Feedback Form */}
        <View className="p-4">
          <View className="bg-white rounded-2xl p-4 shadow-md mb-4">
            <Text className="text-lg font-semibold mb-2">Your Feedback</Text>
            <TextInput
              className="border border-gray-200 rounded-xl p-3 min-h-[100] mb-4 text-base"
              multiline
              placeholder="Share your thoughts (min 10 characters)"
              value={feedback}
              onChangeText={setFeedback}
              maxLength={500}
            />

            {/* Rating */}
            <View className="flex-row mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                  className="mr-2"
                >
                  <Ionicons
                    name={rating >= star ? "star" : "star-outline"}
                    size={32}
                    color="#FFD700"
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* Custom Category Dropdown */}
            <View className="mb-4">
              <TouchableOpacity
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                className="border border-gray-200 rounded-xl p-4 flex-row justify-between items-center"
              >
                <Text>
                  {categories.find((c) => c.value === category)?.label}
                </Text>
                <Ionicons
                  name={isDropdownOpen ? "chevron-up" : "chevron-down"}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>

              {isDropdownOpen && (
                <View className="absolute top-[100%] left-0 right-0 bg-white border border-gray-200 rounded-xl mt-1 z-10">
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat.value}
                      onPress={() => {
                        setCategory(cat.value);
                        setIsDropdownOpen(false);
                      }}
                      className="p-4 border-b border-gray-100 last:border-b-0"
                    >
                      <Text>{cat.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Anonymous Toggle */}
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-base">Submit Anonymously</Text>
              <Switch
                value={isAnonymous}
                onValueChange={setIsAnonymous}
                trackColor={{ false: "#767577", true: "#DC143C" }}
              />
            </View>

            {/* Image Upload */}
            <TouchableOpacity
              onPress={handleImagePick}
              className="border-2 border-dashed border-gray-300 rounded-xl p-4 mb-4 items-center"
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  className="w-full h-40 rounded-lg"
                />
              ) : (
                <View className="items-center">
                  <Ionicons name="image-outline" size={32} color="#666" />
                  <Text className="text-gray-500 mt-2">
                    Tap to attach screenshot
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-[#DC143C] rounded-xl py-3 items-center"
            >
              <Text className="text-white font-bold text-lg">
                Submit Feedback
              </Text>
            </TouchableOpacity>
          </View>

          {/* Feedback History */}
          <View className="bg-white rounded-2xl p-4 shadow-md">
            <Text className="text-lg font-semibold mb-4">Your Submissions</Text>
            {feedbackHistory.map((item) => (
              <View
                key={item.id}
                className="border-b-hairline border-gray-400 py-3"
              >
                <Text className="text-base">{item.text}</Text>
                <View className="flex-row justify-between mt-2">
                  <Text className="text-gray-500">{item.category}</Text>
                  <Text
                    className={`${
                      item.status === "Received"
                        ? "text-blue-500"
                        : item.status === "In Progress"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {item.status}
                  </Text>
                </View>
                <Text className="text-gray-400 text-sm">{item.date}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* AI Chatbot Button */}
      <TouchableOpacity
        className="absolute bottom-8 right-5 w-16 h-16 rounded-full bg-[#DC143C] justify-center items-center shadow-lg z-50"
        onPress={() => {
          router.push("/pages/aiChat");
        }}
      >
        <Ionicons name="chatbubbles-outline" size={28} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackPage;
