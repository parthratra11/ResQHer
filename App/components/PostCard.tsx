import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface PostCardProps {
  post: {
    id: string;
    username: string;
    timestamp: string;
    content: string;
    imageUrl?: string;
    likes: number;
    comments: number;
    location?: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <View className="bg-white p-4 mb-4 rounded-2xl shadow-sm border border-gray-100">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-gray-200 mr-2" />
          <View>
            <Text className="font-semibold">{post.username}</Text>
            <Text className="text-gray-500 text-xs">{post.timestamp}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="more-vert" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <Text className="mb-3">{post.content}</Text>
      {post.imageUrl && (
        <Image
          source={{ uri: post.imageUrl }}
          className="w-full h-48 rounded-xl mb-3"
        />
      )}

      {/* Location */}
      {post.location && (
        <View className="flex-row items-center mb-3">
          <MaterialIcons name="location-on" size={16} color="gray" />
          <Text className="text-gray-500 text-sm">{post.location}</Text>
        </View>
      )}

      {/* Actions */}
      <View className="flex-row justify-between items-center pt-2 border-t border-gray-100">
        <TouchableOpacity
          onPress={handleLike}
          className="flex-row items-center"
        >
          <MaterialIcons
            name={liked ? "favorite" : "favorite-border"}
            size={24}
            color={liked ? "red" : "gray"}
          />
          <Text className="ml-1">{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center">
          <MaterialIcons name="comment" size={24} color="gray" />
          <Text className="ml-1">{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center">
          <MaterialIcons name="flag" size={24} color="gray" />
          <Text className="ml-1">Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
