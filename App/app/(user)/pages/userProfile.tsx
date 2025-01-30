import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/app/AppComponents/User/Header";
import { GuardianCard } from "../../../components/UserProfile/GuardianCard";
import { EditProfileModal } from "../../../components/UserProfile/EditProfileModal";
import { AddGuardianModal } from "../../../components/UserProfile/AddGuardianModal";
import { DeleteAccountModal } from "../../../components/UserProfile/DeleteAccountModal";

export default function UserProfile() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAddGuardian, setShowAddGuardian] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [locationSharing, setLocationSharing] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [notifyGuardians, setNotifyGuardians] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [shakeSOS, setShakeSOS] = useState(true);

  // Dummy user data
  const [userData, setUserData] = useState({
    name: "Shreya Dixit",
    email: "shreya.d@example.com",
    phone: "+91 98765 43210",
    profilePic: null,
  });

  // Dummy guardian data
  const [guardians, setGuardians] = useState([
    {
      id: "1",
      name: "Meena Dixit",
      relation: "Mother",
      phone: "+91 98765 43211",
      email: "meena.d@example.com",
      isPrimary: true,
    },
    {
      id: "2",
      name: "Rahul Dixit",
      relation: "Brother",
      phone: "+91 98765 43212",
      email: "rahul.d@example.com",
      isPrimary: false,
    },
  ]);

  const handleDeleteGuardian = (id) => {
    // Prevent deleting if it's the last guardian
    if (guardians.length <= 1) {
      alert("You must have at least one emergency contact");
      return;
    }

    // Prevent deleting primary guardian without reassigning
    const guardian = guardians.find((g) => g.id === id);
    if (guardian?.isPrimary && guardians.length > 1) {
      alert("Please assign another primary guardian first");
      return;
    }

    setGuardians(guardians.filter((g) => g.id !== id));
  };

  const handleSetPrimary = (id) => {
    setGuardians(
      guardians.map((g) => ({
        ...g,
        isPrimary: g.id === id,
      }))
    );
  };

  return (
    <View className="flex-1 bg-[#FFF1F3]">
      <View className="px-4 py-4 pb-2">
        <Header />
      </View>

      <ScrollView className="flex-1 px-4">
        {/* Profile Section */}
        <View className="items-center mt-4">
          <View className="relative">
            <Image
              source={
                userData.profilePic
                  ? { uri: userData.profilePic }
                  : require("../../../assets/default-profile.png")
              }
              className="w-24 h-24 rounded-full bg-white"
              defaultSource={require("../../../assets/default-profile.png")}
            />
            <TouchableOpacity
              className="absolute bottom-0 right-0 bg-[#DC143C] p-2 rounded-full"
              onPress={() => {
                /* TODO: Image picker */
              }}
            >
              <Ionicons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Text className="text-xl font-bold mt-2">{userData.name}</Text>
          <TouchableOpacity
            className="mt-2 px-4 py-2 bg-[#DC143C] rounded-full"
            onPress={() => setIsEditMode(true)}
          >
            <Text className="text-white">Edit Profile</Text>
          </TouchableOpacity>

          <View className="w-full mt-4 bg-white rounded-lg p-4">
            <View className="flex-row items-center">
              <Ionicons name="mail-outline" size={20} color="#666" />
              <Text className="ml-2 text-gray-600">{userData.email}</Text>
            </View>
            <View className="flex-row items-center mt-2">
              <Ionicons name="call-outline" size={20} color="#666" />
              <Text className="ml-2 text-gray-600">{userData.phone}</Text>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <View className="mt-6">
          <Text className="text-lg font-bold mb-4">Safety Settings</Text>

          <View className="space-y-4 bg-white p-4 rounded-lg">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-medium">Live Location Sharing</Text>
                <Text className="text-xs text-gray-500">
                  Share location with guardians
                </Text>
              </View>
              <Switch
                value={locationSharing}
                onValueChange={setLocationSharing}
                trackColor={{ false: "#767577", true: "#DC143C" }}
              />
            </View>

            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-medium">SMS Alerts</Text>
                <Text className="text-xs text-gray-500">
                  Send SMS during emergencies
                </Text>
              </View>
              <Switch
                value={smsAlerts}
                onValueChange={setSmsAlerts}
                trackColor={{ false: "#767577", true: "#DC143C" }}
              />
            </View>

            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-medium">Notify Guardians</Text>
                <Text className="text-xs text-gray-500">
                  Alert guardians of your location
                </Text>
              </View>
              <Switch
                value={notifyGuardians}
                onValueChange={setNotifyGuardians}
                trackColor={{ false: "#767577", true: "#DC143C" }}
              />
            </View>

            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-medium">Shake for SOS</Text>
                <Text className="text-xs text-gray-500">
                  Activate SOS by shaking device
                </Text>
              </View>
              <Switch
                value={shakeSOS}
                onValueChange={setShakeSOS}
                trackColor={{ false: "#767577", true: "#DC143C" }}
              />
            </View>

            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-medium">Two-Factor Auth</Text>
                <Text className="text-xs text-gray-500">
                  Extra security for your account
                </Text>
              </View>
              <Switch
                value={twoFactorAuth}
                onValueChange={setTwoFactorAuth}
                trackColor={{ false: "#767577", true: "#DC143C" }}
              />
            </View>
          </View>
        </View>

        {/* Guardians Section */}
        <View className="mt-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Emergency Contacts</Text>
            <TouchableOpacity
              className="bg-[#DC143C] px-4 py-2 rounded-full"
              onPress={() => setShowAddGuardian(true)}
            >
              <Text className="text-white">Add Guardian</Text>
            </TouchableOpacity>
          </View>

          {/* Guardian List */}
          <View className="space-y-4">
            {guardians.map((guardian) => (
              <GuardianCard
                key={guardian.id}
                guardian={guardian}
                onDelete={handleDeleteGuardian}
                onEdit={(id) => {
                  const guardian = guardians.find((g) => g.id === id);
                  setSelectedGuardian(guardian);
                  setShowAddGuardian(true);
                }}
                onSetPrimary={handleSetPrimary}
              />
            ))}
          </View>
        </View>

        {/* Danger Zone */}
        <View className="mt-8 mb-6">
          <Text className="text-lg font-bold text-red-600 mb-4">
            Danger Zone
          </Text>
          <TouchableOpacity
            className="bg-red-100 p-4 rounded-lg"
            onPress={() => setShowDeleteAccount(true)}
          >
            <Text className="text-red-600">Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modals */}
      <EditProfileModal
        visible={isEditMode}
        onClose={() => setIsEditMode(false)}
        userData={userData}
        onSave={(data) => {
          setUserData(data);
          setIsEditMode(false);
        }}
      />

      <AddGuardianModal
        visible={showAddGuardian}
        onClose={() => setShowAddGuardian(false)}
        onSave={(guardian) => {
          setGuardians([
            ...guardians,
            { ...guardian, id: Date.now().toString() },
          ]);
          setShowAddGuardian(false);
        }}
      />

      <DeleteAccountModal
        visible={showDeleteAccount}
        onClose={() => setShowDeleteAccount(false)}
        onConfirm={() => {
          // TODO: Handle account deletion
          setShowDeleteAccount(false);
        }}
      />
    </View>
  );
}
