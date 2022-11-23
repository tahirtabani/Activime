import React, { useState, useEffect } from "react";
import { Button, Platform, Text, View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";

/*
  map component requires props as 
  mapRegion
  markers
  
*/

function MapComponent(props) {
  console.log(props.mapRegion);
  //  const [pins] = props;
  //  const [markers, setMarkers] = useState([]);
  //  const [mapRegion, setMapRegion] = useState(null);
  //  const [location, setLocation] = useState(null);
  // const [hasLocationPermissions, setHasLocationPermissions] = useState(false);
  // const [errorMsg, setErrorMsg] = useState(null);

  return (
    <MapView
      style={{ alignSelf: "stretch", height: 400 }}
      region={props.mapRegion}
      onRegionChange={props.onRegionChange}
    >
      {props.markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
        />
      ))}
    </MapView>
  );
}

export default MapComponent;
