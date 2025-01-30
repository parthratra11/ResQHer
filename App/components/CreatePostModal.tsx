import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface CreatePostModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (post: any) => void;
}

export default function CreatePostModal({
  visible,
  onClose,
  onSubmit,
}: CreatePostModalProps) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!content.trim()) return;

    const newPost = {
      id: Date.now().toString(),
      username: "You",
      //   timestamp: new Date().toISOString(),
      timestamp: "Just Now",
      content,
      imageUrl: image,
      likes: 0,
      comments: 0,
      location: "Current Location",
    };

    onSubmit(newPost);
    setContent("");
    setImage(null);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold">Create Post</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} />
            </TouchableOpacity>
          </View>

          <TextInput
            multiline
            placeholder="Share your safety tip or experience..."
            className="bg-gray-100 p-4 rounded-2xl mb-4"
            value={content}
            onChangeText={setContent}
          />

          <View className="flex-row mb-4">
            <TouchableOpacity className="flex-row items-center bg-gray-100 px-4 py-2 rounded-2xl mr-2">
              <MaterialIcons name="image" size={24} color="gray" />
              <Text className="ml-2">Add Image</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center bg-gray-100 px-4 py-2 rounded-2xl">
              <MaterialIcons name="location-on" size={24} color="gray" />
              <Text className="ml-2">Add Location</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-[#DC143C] p-4 rounded-2xl items-center"
          >
            <Text className="text-white font-semibold">Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
