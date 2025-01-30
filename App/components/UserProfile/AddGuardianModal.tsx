import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

export const AddGuardianModal = ({ visible, onClose, onSave }) => {
  const [guardian, setGuardian] = useState({
    name: "",
    relation: "Parent",
    phone: "",
    email: "",
    isPrimary: false,
  });

  const relations = ["Parent", "Sibling", "Friend", "Spouse", "Other"];

  const handleSave = () => {
    if (guardian.name && guardian.phone) {
      onSave(guardian);
      setGuardian({
        name: "",
        relation: "Parent",
        phone: "",
        email: "",
        isPrimary: false,
      });
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-end">
        <View className="bg-white rounded-t-3xl p-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold">Add Guardian</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="text-gray-600 mb-1">Name</Text>
              <TextInput
                className="bg-gray-100 p-3 rounded-lg"
                value={guardian.name}
                onChangeText={(text) =>
                  setGuardian({ ...guardian, name: text })
                }
                placeholder="Guardian's Name"
              />
            </View>

            <View>
              <Text className="text-gray-600 mb-1">Relation</Text>
              <View className="bg-gray-100 rounded-lg">
                <Picker
                  selectedValue={guardian.relation}
                  onValueChange={(value) =>
                    setGuardian({ ...guardian, relation: value })
                  }
                >
                  {relations.map((relation) => (
                    <Picker.Item
                      key={relation}
                      label={relation}
                      value={relation}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View>
              <Text className="text-gray-600 mb-1">Phone</Text>
              <TextInput
                className="bg-gray-100 p-3 rounded-lg"
                value={guardian.phone}
                keyboardType="phone-pad"
                onChangeText={(text) =>
                  setGuardian({ ...guardian, phone: text })
                }
                placeholder="Guardian's Phone"
              />
            </View>

            <View>
              <Text className="text-gray-600 mb-1">Email (Optional)</Text>
              <TextInput
                className="bg-gray-100 p-3 rounded-lg"
                value={guardian.email}
                keyboardType="email-address"
                onChangeText={(text) =>
                  setGuardian({ ...guardian, email: text })
                }
                placeholder="Guardian's Email"
              />
            </View>
          </View>

          <TouchableOpacity
            className="bg-[#DC143C] p-4 rounded-lg mt-6"
            onPress={handleSave}
          >
            <Text className="text-white text-center font-semibold">
              Add Guardian
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
