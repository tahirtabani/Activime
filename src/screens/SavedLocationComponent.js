import React, { useState, useEffect } from "react";
import {
  Button,
  Platform,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import MapView from "react-native-maps";
import Modal from "react-native-modal";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";

/*
  map component requires props as 
  mapRegion
  markers
  
*/

function SavedLocationComponent({
  selectedLocation,
  markers,
  mapRegion,
  onRegionChange,
  savedMapVisibility,
  setSavedMapVisibility,
}) {
  const [savedLocation, setSavedLocation] = useState(undefined);

  useEffect(() => {
    if (selectedLocation === undefined) {
      setSavedLocation(selectedLocation);
    }
  }, []);

  if (selectedLocation === undefined) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Modal
        isVisible={savedMapVisibility}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={400}
        animationOutTiming={400}
        transparent={true}
        hideCloseButton={false}
        backdropOpacity={0}
        onBackdropPress={() => {
          setSavedMapVisibility(false);
        }}
        onBackButtonPress={() => {
          setSavedMapVisibility(false);
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MapView
            style={{
              height: 650,
              width: 350,
            }}
            region={mapRegion}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
              />
            ))}
          </MapView>
        </View>

        <Text style={{ color: "white" }}></Text>
      </Modal>
    </View>
  );
}
//   console.log(props.mapRegion);
//  const [pins] = props;
//  const [markers, setMarkers] = useState([]);
//  const [mapRegion, setMapRegion] = useState(null);
//  const [location, setLocation] = useState(null);
// const [hasLocationPermissions, setHasLocationPermissions] = useState(false);
// const [errorMsg, setErrorMsg] = useState(null);

export default SavedLocationComponent;
