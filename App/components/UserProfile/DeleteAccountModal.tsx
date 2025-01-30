import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const DeleteAccountModal = ({ visible, onClose, onConfirm }) => {
  const [password, setPassword] = useState("");

  const handleConfirm = () => {
    if (!password) {
      alert("Please enter your password to confirm");
      return;
    }
    onConfirm();
    setPassword("");
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-2xl p-6 m-4 w-[90%] max-w-[400px]">
          <View className="items-center mb-4">
            <Ionicons name="warning" size={48} color="#DC143C" />
          </View>

          <Text className="text-xl font-bold text-center mb-2">
            Delete Account?
          </Text>
          <Text className="text-gray-600 text-center mb-6">
            This action cannot be undone. All your data will be permanently
            deleted.
          </Text>

          <TextInput
            className="bg-gray-100 p-3 rounded-lg mt-4 mb-6"
            placeholder="Enter your password to confirm"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <View className="flex-row space-x-4">
            <TouchableOpacity
              className="flex-1 bg-gray-200 p-4 rounded-lg"
              onPress={() => {
                setPassword("");
                onClose();
              }}
            >
              <Text className="text-center font-semibold">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-[#DC143C] p-4 rounded-lg"
              onPress={handleConfirm}
            >
              <Text className="text-white text-center font-semibold">
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
