import React, { useState, useEffect } from "react";
import { Button, Platform, Text, View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import SavedMapLocation from "./SavedMapLocation";
import Modal from "react-native-modal";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

import MapComponent from "./MapComponent";

// location from geolocation
// region is for mapview

function MapScreen({
  setMapVisibility,
  mapVisibility,
  PostsLocation,
  ActivityTitle,
  setChosenLocation,
}) {
  const dummy_marker = {
    latlng: { latitude: 53.45773759071978, longitude: -2.750744316726923 },
    title: "bob",
    description: "heres bob",
  };
  const dummy_marker2 = {
    latlng: { latitude: 53.459842665717744, longitude: -2.7442201785743237 },
    title: "teresa",
    description: "shes here",
  };

  const dummyRegion = {
    latitude: 53.45773759071978,
    longitude: -2.750744316726923,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [location, setLocation] = useState(null);

  const [mapRegion, setMapRegion] = useState(dummyRegion);
  const [markers, setMarkers] = useState([]);
  const [hasLocationPermissions, setHasLocationPermissions] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [meetMarker, setMeetMarker] = useState({
    latlng: { latitude: 53.459842665717744, longitude: -2.7442201785743237 },
    title: "teresa",
    description: "shes here",
  });

  // add a marker to map every 3 seconds
  /*
    useEffect(() => {
        setTimeout( ()=>{
	    setMarkers( oldMarkers => {
		let newMarkers = [...oldMarkers];
		const lastMarker = oldMarkers[oldMarkers.length - 1];
		console.log("lastMarker= " , lastMarker);
		
		newMarkers.push({ latlng: {latitude: lastMarker.latlng.latitude + 0.001 ,
					   longitude: lastMarker.latlng.longitude + 0.001 },
				  title: "random" ,
				  description: "pick me"})
		console.log(newMarkers);
		return newMarkers;
	    })} , 30000);	
    });
    */

  useEffect(() => {}, [meetMarker]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      setHasLocationPermissions(true);
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      //  https://snack.expo.dev/@professorxii/expo-map-and-location-example
      // assuming latitude delta , longitude delta is size area around the location gps given by phone
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setMeetMarker({
        latlng: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        title: "Meet",
        description: "meet here",
      });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  function onRegionChange(region) {
    //  console.log(region);
    //  console.log("");
    //  console.log("latitude = ",region.latitude);
    //  console.log("longitude = ",region.longitude);
    //  console.log("latitudeDelta = ",region.latitudeDelta);
    // console.log("longitudeDelta = ",region.longitudeDelta);
    // region.latitudeDelta
    // region.longitudeDelta
    const newMarker = {
      latlng: { latitude: region.latitude, longitude: region.longitude },
      title: "Meet",
      description: "meet here",
    };

    setMeetMarker(newMarker);
    setMarkers((oldMarkers) => [newMarker]);
    //console.log(location);
    //setMapRegion(mapRegionNew);
  }

  // markers are pins in the map

  // <SearchComponent />
  // <MapComponent markers={markers} mapRegion={mapRegion} />
  // <DatePickerComponent />
  const [selectedLocation, setSelectedLocation] = useState();
  const onSelectLocation = () => {
    setChosenLocation(selectedLocation);
    setSelectedLocation(meetMarker);
  };

  // <View style={{ flexDirection : "row" }} >
  //     <View style={{flex: 1}}>
  // 	  <View style={{ flex : 1 }}>
  // 	      <Text style={{ color: "blue" }} >SCROLL MAP</Text>
  //     </View>
  //     <View style={{flex: 1}}>
  // </View>

  //   const [modalVisible, setModalVisible] = useState(false);
  if (PostsLocation !== undefined) {
    return (
      <SavedMapLocation
        selectedLocation={PostsLocation}
        markers={markers}
        mapRegion={mapRegion}
        onRegionChange={onRegionChange}
        ActivityTitle={ActivityTitle}
      ></SavedMapLocation>
    );
  } else {
    return (
      <View>
        <Modal
          isVisible={mapVisibility}
          animationIn="fadeIn"
          animationOut="fadeOut"
          animationInTiming={400}
          animationOutTiming={400}
          transparent={true}
          hideCloseButton={false}
          backdropOpacity={0}
          onBackButtonPress={() => {
            setMapVisibility(false);
          }}
        >
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ flex: 1 }} />

            <MapComponent
              markers={markers}
              mapRegion={mapRegion}
              onRegionChange={onRegionChange}
            />
            <Button
              onPress={onSelectLocation}
              title="Select Location"
              color="#841584"
              accessibilityLabel="Select Location on map"
              style={styles.selectButton}
            />
            <Button
              onPress={() => {
                setMapVisibility(false);
              }}
              title="Close"
              accessibilityLabel="Close map"
              style={styles.closeButton}
            />
            <View style={{ flex: 1 }} />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
  },
  paragraph: {
    color: "red",
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  selectButton: {
    borderWidth: 4,
    borderRadius: 6,
    backgroundColor: "#271F29",
    color: "#271F29",
  },
});

export default MapScreen;
