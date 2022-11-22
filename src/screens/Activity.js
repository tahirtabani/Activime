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
  setDoc,
  collection,
  query,
  where,
  writeBatch,
  doc,
  snapshot,
  updateDoc,
  update
} from "firebase/firestore";
import { db } from "../../firebase";
import { back } from "react-native/Libraries/Animated/Easing";
import SavedScreen from "./SavedScreen";
import { getAuth, updateProfile } from "firebase/auth";


const Activity = ({ item, setSelectedId }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const userEmail = getAuth().currentUser.email
  // const [buttonStyle, setButtonStyle] = useState(button)

  const [fontsLoaded] = useFonts({
    creato: require("../../assets/fonts/CreatoDisplay-Light.otf"),
  });

  //save activity to databse functionality

  // const addData = (item) => {
  //   const savedRef = collection(db, "saved");

  //   const savedItem = {
  //     area: item.area,
  //     title: item.title,
  //     description: item.description,
  //     imageUrl: item.imageUrl,
  //     time: item.time,
  //     user: item.user,
  //   };

  //   console.log(savedItem, "saved item");

  //   addDoc(savedRef, savedItem)
  //     .then((savedRef) => {
  //       alert("Activity saved!!!");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // save to doc functionality

  const addData = () => {
    const ref = doc(db, "saved", `${userEmail}`);

    const activityObj = {}
    
    const savedItem = {
      area: item.area,
      description: item.description,
      imageUrl: item.imageUrl,
      time: item.time,
      user: item.user,
    };

    activityObj[`${item.title}`] = savedItem


    updateDoc(ref, activityObj).then((ref) => {
      console.log("pls work");
    });
  };

  // end of save to doc

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
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setDisabled(true);
                //come back and set to blacked out button when null
                disabled ? null : addData(item);
              }}
            >
              <Text style={styles.buttonText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Activity;

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
