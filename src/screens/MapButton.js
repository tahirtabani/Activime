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
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

const MapButton = ({ setChosenLocation }) => {
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
        setChosenLocation={setChosenLocation}
      ></MapScreen>

      <View>
        <FontAwesome
          name="map-marker"
          size={35}
          color="#fff"
          style={styles.buttonIcon}
        />
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
