import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
  disabled,
} from "react-native";
import Modal from "react-native-modal";
import { useFonts } from "expo-font";
import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  query,
  where,
  writeBatch,
  doc,
  snapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { back } from "react-native/Libraries/Animated/Easing";
import SavedScreen from "./SavedScreen";

const SavedActivity = ({ item, setSelectedId }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [disabled, setDisabled] = useState(false);
  // const [buttonStyle, setButtonStyle] = useState(button)

  const [fontsLoaded] = useFonts({
    creato: require("../../assets/fonts/CreatoDisplay-Light.otf"),
  });

  return (
    <View>
      <Modal
        isVisible={modalVisible}
        animationIn="fadeIn"
        animationOut="SlideOutUp"
        animationInTiming={400}
        onSwipeComplete={() => {
          setSelectedId(null);
          setModalVisible(false);
        }}
        transparent={true}
        swipeDirection="up"
        onBackButtonPress={() => {
          setSelectedId(null);
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          </View>

          <View style={styles.text}>
            <Text style={styles.textTitle}>{item.title}</Text>
            <Text style={styles.textLocation}>{item.area}</Text>
            <Text style={styles.textUser}>{item.user}</Text>
            <Text style={styles.textDescription}>{item.description}</Text>
          </View>
          {/* // maybe add delete from saved functionality */}
          {/* <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setDisabled(true);
                  disabled ? null : addData(item);
                }}
              >
                <Text style={styles.buttonText}>un join</Text>
              </TouchableOpacity>
            </View> */}
        </View>
      </Modal>
    </View>
  );
};
export default SavedActivity;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  textTitle: {
    color: "white",
    fontFamily: "creato",
    fontWeight: "bold",
    fontSize: 20,
  },
  textDescription: {
    color: "white",
    fontFamily: "creato",
  },
  textUser: {
    color: "white",
    fontFamily: "creato",
  },
  textLocation: {
    color: "white",
    fontFamily: "creato",
  },
  imageContainer: {
    marginTop: 80,
    width: "100%",
    height: "33%",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    overflow: "hidden",
  },

  centeredView: {
    borderRadius: 15,
    backgroundColor: "#3F3947",
    flex: 1,
    alignItems: "center",
    shadowColor: "#0000",
  },
  border: {
    borderWidth: 5,
    marginTop: 40,
    backgroundColor: "#271F29",
  },

  card: {
    backgroundColor: "black",
    margin: 10,
    borderRadius: 18,
    flexDirection: "row",
    shadowColor: "#000000",
    elevation: 20,
  },

  image: {
    width: "100%",
    height: "100%",
    borderWidth: 10,
  },

  expandedImage: {
    width: "auto",
    height: "auto",
    aspectRatio: 3 / 2,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },

  expandedCardDetails: {
    marginLeft: 20,
    justifyContent: "space-evenly",
    flexShrink: 1,
    padding: 12,
  },

  button: {
    width: "auto",
    borderWidth: 2,
    borderColor: "rgba(175, 196, 249, 1)",
    backgroundColor: "white",
    margin: 10,
    borderRadius: 150,
    shadowColor: "#000000",
  },

  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
  },
});
