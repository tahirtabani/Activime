import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import SavedLocationComponent from "./SavedLocationComponent";
import { useState } from "react";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const SavedMapLocation = ({
  selectedLocation,
  markers,
  mapRegion,
  onRegionChange,
  ActivityTitle,
}) => {
  let testObjCords = {
    latitude: 53.6470502,
    latitudeDelta: 0.0922,
    longitude: -2.9664152,
    longitudeDelta: 0.0421,
  };

  let testMarkersObj = [
    {
      latlng: { latitude: 53.6470502, longitude: -2.9664152 },
      title: ActivityTitle,
      description: "Meet here :)",
    },
  ];

  if (selectedLocation.latitude !== 0) {
    testMarkersObj[0].latlng.latitude = selectedLocation.latitude;
    testMarkersObj[0].latlng.longitude = selectedLocation.longitude;
    testObjCords.latitude = selectedLocation.latitude;
    testObjCords.longitude = selectedLocation.longitude;
  }

  const [savedMapVisibility, setSavedMapVisibility] = useState(false);
  const newMapRegion = testObjCords;
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setSavedMapVisibility(true);
        }}
      >
        <FontAwesome name="map-marker" size={35} color="white" />
        <SavedLocationComponent
          selectedLocation={testObjCords}
          markers={testMarkersObj}
          mapRegion={newMapRegion}
          onRegionChange={onRegionChange}
          savedMapVisibility={savedMapVisibility}
          setSavedMapVisibility={setSavedMapVisibility}
        ></SavedLocationComponent>
      </TouchableOpacity>
    </View>
  );
};

export default SavedMapLocation;

const styles = StyleSheet.create({});
