import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  HorizontalScrollView,
  Pressable,
} from "react-native";

import MapScreen from "./MapScreen";
import { useState } from "react";

import React from "react";

const MapButton = () => {
  const [mapVisibility, setMapVisibility] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setMapVisibility(true);
      }}
    >
      <MapScreen
        setMapVisibility={setMapVisibility}
        mapVisibility={mapVisibility}
      ></MapScreen>

      <View style={styles.button}>
        <Text style={styles.buttonText}>Map</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MapButton;

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
  },
  button: {
    width: 100,

    backgroundColor: "blue",

    borderRadius: 10,
    shadowColor: "#000000",
  },
});
