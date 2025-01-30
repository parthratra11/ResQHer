import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function ReportIncidentForm() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    Alert.alert(
      "Success",
      "Your report has been submitted to the nearest police station.",
      [{ text: "OK" }]
    );
  };

  return (
    <View className="p-4">
      <Text className="text-xl font-bold mb-4">Report an Incident</Text>

      <View className="mb-4">
        <Text className="mb-2">Category</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Harassment" value="harassment" />
          <Picker.Item label="Theft" value="theft" />
          <Picker.Item label="Assault" value="assault" />
          <Picker.Item label="Suspicious Activity" value="suspicious" />
        </Picker>
      </View>

      <View className="mb-4">
        <Text className="mb-2">Description</Text>
        <TextInput
          className="border p-2 rounded"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe the incident..."
        />
      </View>

      <TouchableOpacity
        className="bg-blue-500 p-4 rounded"
        onPress={handleSubmit}
      >
        <Text className="text-white text-center">Submit Report</Text>
      </TouchableOpacity>
    </View>
  );
}
