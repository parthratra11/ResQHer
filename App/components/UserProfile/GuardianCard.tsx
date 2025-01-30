import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const GuardianCard = ({ guardian, onDelete, onEdit, onSetPrimary }) => {
  return (
    <View className="bg-white p-4 rounded-lg">
      <View className="flex-row justify-between items-start">
        <View>
          <Text className="font-bold text-lg">{guardian.name}</Text>
          <Text className="text-gray-600">{guardian.relation}</Text>
          <Text className="text-gray-600 mt-1">{guardian.phone}</Text>
          <Text className="text-gray-600">{guardian.email}</Text>
        </View>

        <View className="flex-row items-center">
          {guardian.isPrimary && (
            <View className="bg-[#DC143C] px-2 py-1 rounded mr-2">
              <Text className="text-white text-xs m-1">Primary</Text>
            </View>
          )}
          <TouchableOpacity className="p-2" onPress={() => onEdit(guardian.id)}>
            <Ionicons name="pencil" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2"
            onPress={() => onDelete(guardian.id)}
          >
            <Ionicons name="trash" size={20} color="#DC143C" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
