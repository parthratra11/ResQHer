import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  ScrollView,
  Linking,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AmenityDetail = ({ amenity, visible, onClose, darkMode }) => {
  const translateY = React.useRef(new Animated.Value(300)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 300,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };

  const handleCall = () => {
    const phoneNumber = Platform.select({
      ios: `telprompt:${amenity.contact}`,
      android: `tel:${amenity.contact}`,
    });
    Linking.openURL(phoneNumber);
  };

  const handleGetDirections = () => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${amenity.latitude},${amenity.longitude}`;
    const label = amenity.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  if (!visible || !amenity) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end",
          }}
        >
          <TouchableWithoutFeedback>
            <Animated.View
              style={{
                backgroundColor: "white",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingHorizontal: 20,
                paddingBottom: Platform.OS === "ios" ? 40 : 20,
                transform: [{ translateY }],
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
              }}
            >
              {/* Handle bar */}
              <View
                style={{
                  width: 40,
                  height: 4,
                  backgroundColor: "#E0E0E0",
                  borderRadius: 2,
                  alignSelf: "center",
                  marginVertical: 12,
                }}
              />

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header section */}
                <View style={{ marginBottom: 16 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: getTypeColor(amenity.type),
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        borderRadius: 12,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 12,
                          textTransform: "uppercase",
                        }}
                      >
                        {formatAmenityType(amenity.type)}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 12,
                      }}
                    >
                      <Text style={{ color: "#F59E0B", marginRight: 4 }}>
                        ★
                      </Text>
                      <Text style={{ color: "#666" }}>{amenity.rating}</Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      color: "#1F2937",
                    }}
                  >
                    {amenity.name}
                  </Text>
                </View>

                {/* Description */}
                <Text
                  style={{
                    fontSize: 16,
                    color: "#4B5563",
                    lineHeight: 24,
                    marginBottom: 20,
                  }}
                >
                  {amenity.description}
                </Text>

                {/* Action buttons */}
                <View
                  style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}
                >
                  <TouchableOpacity
                    onPress={handleCall}
                    style={{
                      flex: 1,
                      backgroundColor: "#1a73e8",
                      padding: 16,
                      borderRadius: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons
                      name="call"
                      size={20}
                      color="white"
                      style={{ marginRight: 8 }}
                    />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      Call
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleGetDirections}
                    style={{
                      flex: 1,
                      backgroundColor: "#34D399",
                      padding: 16,
                      borderRadius: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons
                      name="navigate"
                      size={20}
                      color="white"
                      style={{ marginRight: 8 }}
                    />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      Directions
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Contact Info */}
                <View style={{ marginBottom: 20 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      color: "#1F2937",
                      marginBottom: 12,
                    }}
                  >
                    Contact Information
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#F3F4F6",
                      padding: 16,
                      borderRadius: 12,
                    }}
                  >
                    <Text style={{ fontSize: 16, color: "#4B5563" }}>
                      {amenity.contact}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Helper functions
const getTypeColor = (type) => {
  const colors = {
    police: "#1a73e8",
    hospital: "#e53935",
    helpCenter: "#9c27b0",
    transport: "#2e7d32",
    safeCab: "#f57c00",
    shelter: "#6d4c41",
    pharmacy: "#00acc1",
  };
  return colors[type] || "#000";
};

const formatAmenityType = (type) => {
  return type.replace(/([A-Z])/g, " $1").trim();
};

export default AmenityDetail;
