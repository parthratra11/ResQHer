import { View, Text, Pressable } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function EmergencyContacts() {
  const contacts = [
    {
      id: 1,
      name: "Women's Helpline",
      number: "1091",
    },
    {
      id: 2,
      name: "Ambulance",
      number: "102",
    },
    {
      id: 3,
      name: "Police Control Room",
      number: "100",
    },
  ];

  return (
    <View className="bg-white rounded-lg p-4 mb-4">
      <Text className="text-lg font-bold mb-4">Emergency Contacts</Text>
      {contacts.map((contact) => (
        <View
          key={contact.id}
          className="flex-row justify-between items-center mb-4"
        >
          <View>
            <Text className="font-semibold">{contact.name}</Text>
            <Text className="text-gray-600">{contact.number}</Text>
          </View>
          <Pressable className="bg-green-500 p-2 rounded-full">
            <MaterialIcons name="phone" size={24} color="white" />
          </Pressable>
        </View>
      ))}
    </View>
  );
}
