import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import PostCard from "@/components/PostCard";
import CreatePostModal from "@/components/CreatePostModal";
import { mockPosts } from "@/constants/mockData";
import Header from "@/app/AppComponents/User/Header";
import { router } from "expo-router";
// import Header from "@/AppComponents/User/Header";

export default function PeopleConnect() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("recent");
  const [isModalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState(mockPosts);

  const filterOptions = ["Recent", "Most Liked", "By Location"];

  return (
    <SafeAreaView className="flex-1 bg-[#FFF1F3]">
      <View className="px-4 pt-4">
        <Header />
      </View>

      {/* Search and Filter Section */}
      <View className="px-4 py-2">
        <View className="flex-row items-center bg-white rounded-xl px-4 mb-3 shadow-sm border border-[#DC143C]/10">
          <Ionicons name="search-outline" size={20} color="#DC143C" />
          <TextInput
            placeholder="Search community posts..."
            className="flex-1 p-3 font-medium text-gray-700"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-2"
        >
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => setFilter(option.toLowerCase())}
              className={`mr-2 px-6 py-2 rounded-xl ${
                filter === option.toLowerCase()
                  ? "bg-[#DC143C]"
                  : "bg-white border border-[#DC143C]/20"
              } shadow-sm`}
            >
              <Text
                className={`${
                  filter === option.toLowerCase()
                    ? "text-white"
                    : "text-[#DC143C]"
                } font-medium`}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Posts Feed */}
      <ScrollView className="flex-1 px-4">
        <View className="space-y-4">
          {posts.map((post) => (
            <View
              key={post.id}
              className="bg-white rounded-xl p-4 my-1 border-hairline border-[#DC143C] shadow-md shadow-[#DC143C]/10"
            >
              {/* User Info */}
              <View className="flex-row items-center mb-3">
                {post.userAvatar ? (
                  <Image
                    source={{ uri: post.userAvatar }}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center">
                    <MaterialIcons name="person" size={24} color="#666" />
                  </View>
                )}
                <View className="ml-3">
                  <Text className="font-bold text-gray-800">
                    {post.userName}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {post.timestamp}
                  </Text>
                </View>
              </View>

              {/* Post Content */}
              <Text className="text-gray-700 mb-3">{post.content}</Text>
              {post.image && (
                <Image
                  source={{ uri: post.image }}
                  className="w-full h-48 rounded-xl mb-3"
                />
              )}

              {/* Interaction Buttons */}
              <View className="flex-row justify-between items-center pt-2 border-t border-gray-100">
                <TouchableOpacity className="flex-row items-center">
                  <Ionicons name="heart-outline" size={20} color="#E85D75" />
                  <Text className="ml-2 text-gray-600">{post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center">
                  <Ionicons
                    name="chatbubble-outline"
                    size={20}
                    color="#4A90E2"
                  />
                  <Text className="ml-2 text-gray-600">{post.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center">
                  <Ionicons
                    name="share-social-outline"
                    size={20}
                    color="#50C878"
                  />
                  <Text className="ml-2 text-gray-600">Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Create Post FAB */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="absolute bottom-6 right-6 bg-[#4180c8] w-16 h-16 rounded-full items-center justify-center shadow-lg"
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Create Post Modal */}
      <CreatePostModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={(newPost) => {
          setPosts([newPost, ...posts]);
          setModalVisible(false);
        }}
      />

      {/* AI Chatbot Button */}
      <TouchableOpacity
        className="absolute bottom-24 right-5 w-16 h-16 m-1 rounded-full bg-[#DC143C] justify-center items-center shadow-lg"
        onPress={() => {
          router.push("/pages/aiChat");
        }}
      >
        <Ionicons name="chatbubbles-outline" size={28} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
