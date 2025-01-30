import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const EditProfileModal = ({ visible, onClose, userData, onSave }) => {
  const [formData, setFormData] = useState(userData);

  const handleSave = () => {
    if (formData.name && formData.email && formData.phone) {
      onSave(formData);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-end">
        <View className="bg-white rounded-t-3xl p-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold">Edit Profile</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="text-gray-600 mb-1">Name</Text>
              <TextInput
                className="bg-gray-100 p-3 rounded-lg"
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
              />
            </View>

            <View>
              <Text className="text-gray-600 mb-1">Email</Text>
              <TextInput
                className="bg-gray-100 p-3 rounded-lg"
                value={formData.email}
                keyboardType="email-address"
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
              />
            </View>

            <View>
              <Text className="text-gray-600 mb-1">Phone</Text>
              <TextInput
                className="bg-gray-100 p-3 rounded-lg"
                value={formData.phone}
                keyboardType="phone-pad"
                onChangeText={(text) =>
                  setFormData({ ...formData, phone: text })
                }
              />
            </View>
          </View>

          <TouchableOpacity
            className="bg-[#DC143C] p-4 rounded-lg mt-6"
            onPress={handleSave}
          >
            <Text className="text-white text-center font-semibold">
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
