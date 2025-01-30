import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Dimensions,
  TextInput,
  Vibration,
  Modal,
  Platform,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/app/AppComponents/User/Header";
import { router } from "expo-router";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

const DUMMY_ROUTES = [
  {
    id: 1,
    name: "Safer Route",
    safety: "Highly Safe",
    eta: "27 mins",
    distance: "17.7 km",
    color: "#4CAF50",
    instructions: [
      "Continue onto Mahatma Gandhi Road",
      "Keep left",
      "Turn right onto Bhagwan Mahavir Marg",
      "Turn right",
      "Keep left onto Mahatma Gandhi Road",
      "Turn right onto Mahatma Gandhi Marg",
    ],
  },
  {
    id: 2,
    name: "Route 2",
    safety: "Moderate Risk",
    eta: "12 mins",
    distance: "2.1 km",
    color: "#FFA000",
    instructions: [
      "Continue onto Mahatma Gandhi Road",
      "Keep left",
      "Turn right onto Bhagwan Mahavir Marg",
      "Turn right",
      "Keep left onto Mahatma Gandhi Road",
      "Turn right onto Mahatma Gandhi Marg",
    ],
  },
];

export default function SafeTravel() {
  const [isTracking, setIsTracking] = useState(false);
  const [audioDetection, setAudioDetection] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [showRoutes, setShowRoutes] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [password, setPassword] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentMap, setCurrentMap] = useState("static");
  const [htmlContent, setHtmlContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const alertTimeoutRef = useRef(null);
  const recordingTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);

  const USER_PASSWORD = "1234";

  const MAP_SOURCES = {
    static: require("../../../assets/maps/staticmap.html"),
    route: require("../../../assets/maps/RouteWomen.html"),
  };

  const loadLocalHtml = async (mapType = "static") => {
    try {
      setIsLoading(true);
      const asset = Asset.fromModule(MAP_SOURCES[mapType]);
      await asset.downloadAsync();
      const htmlString = await FileSystem.readAsStringAsync(asset.localUri);
      setHtmlContent(htmlString);
    } catch (error) {
      console.error("Error loading HTML:", error);
      Alert.alert("Error", "Failed to load map content");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        triggerSafetyCheck();
      }, 60 * 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  useEffect(() => {
    if (showAlert) {
      Vibration.vibrate([500, 500], true);
      alertTimeoutRef.current = setTimeout(() => {
        if (showAlert) {
          setShowAlert(false);
          handleSafetyTimeout();
        }
      }, 30000);
    } else {
      Vibration.cancel();
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current);
      }
    }
    return () => {
      Vibration.cancel();
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current);
      }
    };
  }, [showAlert]);

  useEffect(() => {
    if (timerActive) {
      timerIntervalRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        setElapsedTime(0);
      }
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [timerActive]);

  useEffect(() => {
    loadLocalHtml();
  }, []);

  const startRecording = async () => {
    setIsRecording(true);
    recordingTimeoutRef.current = setTimeout(() => {
      stopRecording();
    }, 15000);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    Alert.alert(
      "Recording Complete",
      "Audio recording has been saved and sent to emergency contacts"
    );
  };

  const triggerSafetyCheck = () => {
    setShowAlert(true);
  };

  const handleSafetyTimeout = () => {
    startRecording();
    Alert.alert(
      "Emergency Protocol Activated",
      "Your current location has been shared with law enforcement."
    );
  };

  const verifyPassword = () => {
    if (password === USER_PASSWORD) {
      setShowAlert(false);
      setPassword("");
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current);
      }
    } else {
      Alert.alert("Invalid Password", "Please try again");
    }
  };

  const searchRoutes = () => {
    if (startLocation && endLocation) {
      setShowRoutes(true);
      setCurrentMap("route");
    } else {
      Alert.alert("Please enter both start and end locations");
    }
  };

  const toggleTracking = () => {
    if (!isTracking) {
      Alert.alert(
        "Journey Started",
        "Your guardians will be notified of your travel.",
        [
          {
            text: "OK",
            onPress: () => {
              setTimerActive(true);
              setIsTracking(true);
              loadLocalHtml("route"); // Load route map when journey starts
            },
          },
        ]
      );
    } else {
      setTimerActive(false);
      setIsTracking(false);
      loadLocalHtml("static"); // Load static map when journey ends
    }
  };

  const triggerSOS = () => {
    Alert.alert(
      "SOS Activated",
      "Emergency contacts have been notified with your location.",
      [{ text: "OK" }]
    );
  };

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getWebViewSource = () => {
    if (!htmlContent) return { html: "<div></div>" }; // Provide fallback content
    return {
      html: htmlContent,
      baseUrl: Platform.OS === "android" ? "file:///android_asset/" : "",
    };
  };

  return (
    <View style={styles.container}>
      <View className="px-4 pt-2 mb-2">
        <Header />
      </View>

      {!showRoutes && (
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons name="location-outline" size={24} color="#DC143C" />
            <TextInput
              style={styles.input}
              placeholder="Enter start location"
              value={startLocation}
              onChangeText={setStartLocation}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Ionicons name="navigate-outline" size={24} color="#DC143C" />
            <TextInput
              style={styles.input}
              placeholder="Enter destination"
              value={endLocation}
              onChangeText={setEndLocation}
            />
          </View>
          <TouchableOpacity style={styles.searchButton} onPress={searchRoutes}>
            <Text style={styles.searchButtonText}>Find Safe Routes</Text>
          </TouchableOpacity>
        </View>
      )}

      {isLoading ? (
        <View style={[styles.map, styles.centerContent]}>
          <ActivityIndicator size="large" color="#DC143C" />
        </View>
      ) : (
        <WebView
          source={getWebViewSource()}
          style={styles.map}
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
          scalesPageToFit={true}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn("WebView error: ", nativeEvent);
          }}
        />
      )}

      <TouchableOpacity
        className="absolute top-20 right-5 w-16 h-16 rounded-full bg-[#FF3B30] justify-center items-center shadow-lg"
        onPress={triggerSOS}
      >
        <Ionicons name="warning" size={28} color="#FFF" />
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>

      {isTracking && (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>
        </View>
      )}

      {showRoutes && (
        <View style={styles.bottomSheet}>
          <View style={styles.safetyControls}>
            <View style={styles.controlItem}>
              <Text style={styles.controlLabel}>Audio Detection</Text>
              <Switch
                value={audioDetection}
                onValueChange={setAudioDetection}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.trackingButton,
                isTracking && styles.trackingActive,
              ]}
              onPress={toggleTracking}
            >
              <Text style={styles.trackingButtonText}>
                {isTracking ? "Stop Journey" : "Start Journey"}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Available Routes</Text>
          <ScrollView style={styles.routesContainer}>
            {DUMMY_ROUTES.map((route) => (
              <TouchableOpacity
                key={route.id}
                style={[
                  styles.routeCard,
                  selectedRoute?.id === route.id && styles.selectedRoute,
                ]}
                onPress={() => handleRouteSelect(route)}
              >
                <View style={styles.routeInfo}>
                  <Text style={styles.routeName}>{route.name}</Text>
                  <Text style={[styles.safetyLabel, { color: route.color }]}>
                    {route.safety}
                  </Text>
                  <Text style={styles.routeDetails}>
                    {route.eta} • {route.distance}
                  </Text>
                  {selectedRoute?.id === route.id && (
                    <View style={styles.instructionsContainer}>
                      {route.instructions
                        .slice(0, 3)
                        .map((instruction, idx) => (
                          <Text key={idx} style={styles.instruction}>
                            • {instruction}
                          </Text>
                        ))}
                    </View>
                  )}
                </View>
                <Ionicons name="chevron-forward" size={24} color="#666" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <Modal visible={showAlert} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Safety Check</Text>
            <Text style={styles.modalText}>
              Please enter your password to confirm you're safe
            </Text>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={verifyPassword}
            >
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        className="absolute bottom-5 right-5 w-16 h-16 m-1 rounded-full bg-[#DC143C] justify-center items-center shadow-lg"
        onPress={() => {
          router.push("/pages/aiChat");
        }}
      >
        <Ionicons name="chatbubbles-outline" size={28} color="#FFF" />
      </TouchableOpacity>

      {isRecording && (
        <View style={styles.recordingIndicator}>
          <Text style={styles.recordingText}>Recording...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF1F3",
  },
  map: {
    height: Dimensions.get("window").height * 0.5,
  },
  inputContainer: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    margin: 16,
    shadowColor: "#DC143C",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#DC143C",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sosText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  routesContainer: {
    flex: 1,
  },
  safetyControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  controlItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  trackingButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
  },
  trackingActive: {
    backgroundColor: "#FF3B30",
  },
  trackingButtonText: {
    color: "white",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  routeCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  selectedRoute: {
    borderColor: "#007AFF",
    backgroundColor: "#f0f8ff",
  },
  routeInfo: {
    flex: 1,
  },
  routeName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  safetyLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  routeDetails: {
    fontSize: 14,
    color: "#666",
  },
  instructionsContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  instruction: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 15,
  },
  verifyButton: {
    backgroundColor: "#DC143C",
    padding: 10,
    borderRadius: 5,
    width: "100%",
  },
  verifyButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  recordingIndicator: {
    position: "absolute",
    top: 100,
    right: 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  recordingText: {
    color: "white",
    fontWeight: "bold",
  },
  timerContainer: {
    position: "absolute",
    top: 100,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  timerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
});
