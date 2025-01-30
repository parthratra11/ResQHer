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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, Polyline } from "react-native-maps";
import Header from "@/app/AppComponents/User/Header";

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
      // Add more instructions as needed
    ],
    bounds: [77.170027, 28.670185, 77.307904, 28.710406],
    encodedPoints:
      "gkfnDcn`vMCJ?TBTl@j@zCdCrBzAt@fAd@Zv@n@dHdFX@THvC~BbB|A\\h@HPRd@dAhDu@ViA_D]m@[e@Y]cA{@gBwAMMMQ[o@aEuC}CaC_@YoAg@oB}AyEsDk@m@a@}@l@g@p@c@p@s@bHcGVg@h@gC@]VkBrGwZFUjDoPjCqLlF}PrEiPpE{PfEcP|@eDbA{CtCaL?Ud@eBZy@pDkN`BaG?M\\sATi@HYjAgEhDgMPg@pDaNrCwKpBmH\\}APu@Zw@n@}@XY`Ao@t@a@x@WfGk@XCfDAhAEdTkBzGo@vK{@bBSVKP_@Fs@Co@gBcEQk@S}@Eo@CoABs@Hu@Ls@X_AZs@\\m@dG{F`AcAb@k@@u@Jg@BUR?XCjAMhAWf@Cr@Kl@Qp@[t@e@zCuCNORKRITCT?vC@Ou@pM`@bCg@pAUdCi@XKVOl@g@Va@Tc@Ng@Lg@Fk@Bk@Ak@Ci@gKw_@kBuGgDyLi@oCUeCKoC?kCPaD`AoLD_AF{@JcALm@p@}G^{EZoCZ_Dx@eK\\qDb@cEbBwQVyAb@eAf@}@zD{ENY^cAH_@Be@Fe@Cq@E{@[{B]sAQa@i@wBWaBSsBcA_NW_EOuBKoBi@}GGoAO}@e@wF]}C_@{Ee@uD_AuIKeCEwB?{AC{BKgAgAsHkFyZkBiLo@kE_ByJEiAAqAVeT^gUBkE]i]KmGgAVc@JuAJD~@lAJp@A",
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
      // Add more instructions as needed
    ],
    bounds: [77.170027, 28.670185, 77.307904, 28.710406],
    encodedPoints:
      "gkfnDcn`vMCJ?TBTl@j@zCdCrBzAt@fAd@Zv@n@dHdFX@THvC~BbB|A\\h@HPRd@dAhDu@ViA_D]m@[e@Y]cA{@gBwAMMMQ[o@aEuC}CaC_@YoAg@oB}AyEsDk@m@a@}@l@g@p@c@p@s@bHcGVg@h@gC@]VkBrGwZFUjDoPjCqLlF}PrEiPpE{PfEcP|@eDbA{CtCaL?Ud@eBZy@pDkN`BaG?M\\sATi@HYjAgEhDgMPg@pDaNrCwKpBmH\\}APu@Zw@n@}@XY`Ao@t@a@x@WfGk@XCfDAhAEdTkBzGo@vK{@bBSVKP_@Fs@Co@gBcEQk@S}@Eo@CoABs@Hu@Ls@X_AZs@\\m@dG{F`AcAb@k@@u@Jg@BUR?XCjAMhAWf@Cr@Kl@Qp@[t@e@zCuCNORKRITCT?vC@Ou@pM`@bCg@pAUdCi@XKVOl@g@Va@Tc@Ng@Lg@Fk@Bk@Ak@Ci@gKw_@kBuGgDyLi@oCUeCKoC?kCPaD`AoLD_AF{@JcALm@p@}G^{EZoCZ_Dx@eK\\qDb@cEbBwQVyAb@eAf@}@zD{ENY^cAH_@Be@Fe@Cq@E{@[{B]sAQa@i@wBWaBSsBcA_NW_EOuBKoBi@}GGoAO}@e@wF]}C_@{Ee@uD_AuIKeCEwB?{AC{BKgAgAsHkFyZkBiLo@kE_ByJEiAAqAVeT^gUBkE]i]KmGgAVc@JuAJD~@lAJp@A",
  },
];

const DUMMY_SAFE_PLACES = [
  {
    id: 1,
    name: "Police Station",
    coordinate: { latitude: 28.6139, longitude: 77.209 },
    type: "police",
  },
  {
    id: 2,
    name: "Hospital",
    coordinate: { latitude: 28.615, longitude: 77.21 },
    type: "hospital",
  },
];

// Add this utility function to decode the polyline points
function decodePolyline(encoded) {
  const points = [];
  let index = 0,
    lat = 0,
    lng = 0;

  while (index < encoded.length) {
    let shift = 0,
      result = 0;

    do {
      let byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (result & 0x20);

    lat += result & 1 ? ~(result >> 1) : result >> 1;

    shift = 0;
    result = 0;

    do {
      let byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (result & 0x20);

    lng += result & 1 ? ~(result >> 1) : result >> 1;

    points.push({
      latitude: lat * 1e-5,
      longitude: lng * 1e-5,
    });
  }

  return points;
}

const ROUTE_POINTS =
  "gkfnDcn`vMCJ?TBTl@j@zCdCrBzAt@fAd@Zv@n@dHdFX@THvC~BbB|A\\h@HPRd@dAhDu@ViA_D]m@[e@Y]cA{@gBwAMMMQ[o@aEuC}CaC_@YoAg@oB}AyEsDk@m@a@}@l@g@p@c@p@s@bHcGVg@h@gC@]VkBrGwZFUjDoPjCqLlF}PrEiPpE{PfEcP|@eDbA{CtCaL?Ud@eBZy@pDkN`BaG?M\\sATi@HYjAgEhDgMPg@pDaNrCwKpBmH\\}APu@Zw@n@}@XY`Ao@t@a@x@WfGk@XCfDAhAEdTkBzGo@vK{@bBSVKP_@Fs@Co@gBcEQk@S}@Eo@CoABs@Hu@Ls@X_AZs@\\m@dG{F`AcAb@k@@u@Jg@BUR?XCjAMhAWf@Cr@Kl@Qp@[t@e@zCuCNORKRITCT?vC@Ou@pM`@bCg@pAUdCi@XKVOl@g@Va@Tc@Ng@Lg@Fk@Bk@Ak@Ci@gKw_@kBuGgDyLi@oCUeCKoC?kCPaD`AoLD_AF{@JcALm@p@}G^{EZoCZ_Dx@eK\\qDb@cEbBwQVyAb@eAf@}@zD{ENY^cAH_@Be@Fe@Cq@E{@[{B]sAQa@i@wBWaBSsBcA_NW_EOuBKoBi@}GGoAO}@e@wF]}C_@{Ee@uD_AuIKeCEwB?{AC{BKgAgAsHkFyZkBiLo@kE_ByJEiAAqAVeT^gUBkE]i]KmGgAVc@JuAJD~@lAJp@A";

export default function SafeTravel() {
  const [isTracking, setIsTracking] = useState(false);
  const [audioDetection, setAudioDetection] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [showRoutes, setShowRoutes] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [mapRegion, setMapRegion] = useState({
    latitude: 28.6139,
    longitude: 77.209,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [timerActive, setTimerActive] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [password, setPassword] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const alertTimeoutRef = useRef(null);
  const recordingTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);

  const USER_PASSWORD = "1234"; // In real app, this should come from secure storage

  // Modify the safety check timer interval to 1 minute
  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        triggerSafetyCheck();
      }, 60 * 1000); // 1 minute
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  useEffect(() => {
    if (showAlert) {
      Vibration.vibrate([500, 500], true); // Continuous vibration
      alertTimeoutRef.current = setTimeout(() => {
        if (showAlert) {
          setShowAlert(false);
          handleSafetyTimeout();
        }
      }, 30000); // 30 seconds
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

  const startRecording = async () => {
    setIsRecording(true);
    // Simulate recording for 15 seconds
    recordingTimeoutRef.current = setTimeout(() => {
      stopRecording();
    }, 15000);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    // Simulate saving recording
    console.log("Recording simulation completed");
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
    // Simulate sending location to police
    Alert.alert(
      "Emergency Protocol Activated",
      "Your current location has been shared with law enforcement."
    );

    // Mock location sharing
    console.log("Sending location to police:", {
      latitude: mapRegion.latitude,
      longitude: mapRegion.longitude,
      timestamp: new Date().toISOString(),
      userDetails: {
        journey: {
          start: startLocation,
          destination: endLocation,
          startTime: new Date(Date.now() - elapsedTime * 1000).toISOString(),
        },
      },
    });
  };

  const verifyPassword = () => {
    if (password === USER_PASSWORD) {
      setShowAlert(false);
      setPassword("");
      // Cancel any pending emergency protocols
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
    } else {
      Alert.alert("Please enter both start and end locations");
    }
  };

  const toggleTracking = () => {
    if (!isTracking) {
      Alert.alert(
        "Journey Started",
        "Your guardians will be notified of your travel."
      );
      setTimerActive(true);
    } else {
      setTimerActive(false);
    }
    setIsTracking(!isTracking);
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
    if (route.encodedPoints) {
      const decodedCoordinates = decodePolyline(route.encodedPoints);
      setRouteCoordinates(decodedCoordinates);

      // Calculate bounds to fit the route
      if (route.bounds) {
        const [minLon, minLat, maxLon, maxLat] = route.bounds;
        const newRegion = {
          latitude: (minLat + maxLat) / 2,
          longitude: (minLon + maxLon) / 2,
          latitudeDelta: (maxLat - minLat) * 1.5,
          longitudeDelta: (maxLon - minLon) * 1.5,
        };
        setMapRegion(newRegion);
      }
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View className="px-4 pt-2 mb-2">
        <Header />
      </View>

      {/* Location Inputs */}
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

      <MapView
        style={styles.map}
        region={mapRegion}
        onRegionChangeComplete={setMapRegion}
      >
        {DUMMY_SAFE_PLACES.map((place) => (
          <Marker
            key={place.id}
            coordinate={place.coordinate}
            title={place.name}
          >
            <Ionicons
              name={place.type === "police" ? "shield" : "medical"}
              size={24}
              color="#007AFF"
            />
          </Marker>
        ))}
        {selectedRoute && routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor={selectedRoute.color}
            strokeWidth={4}
          />
        )}
      </MapView>

      {/* SOS Button */}
      <TouchableOpacity
        className="absolute top-20 right-5 w-16 h-16 rounded-full bg-[#FF3B30] justify-center items-center shadow-lg"
        onPress={triggerSOS}
      >
        <Ionicons name="warning" size={28} color="#FFF" />
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>

      {/* Timer Display */}
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
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    padding: 20,
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
});
