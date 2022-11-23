import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  addDoc,
  collection,
  query,
  where,
  writeBatch,
  doc,
  snapshot,
  deleteDoc,
} from "firebase/firestore";
import Modal from "react-native-modal";
import { db } from "../../firebase";
import { useFonts } from "expo-font";
import MapScreen from "./MapScreen";
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import SavedMapLocation from "./SavedMapLocation";

const SavedActivity = ({ item, setSelectedId, location }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [disabled, setDisabled] = useState(false);

  // const [buttonStyle, setButtonStyle] = useState(button)
  // getAuth().currentUser.email;
  const [fontsLoaded] = useFonts({
    creato: require("../../assets/fonts/CreatoDisplay-Light.otf"),
  });
  const deleteData = async (item) => {
    const userEmail = getAuth().currentUser.email;
    const res = await db.collection(`${userEmail}`).doc(item.id).delete();
    alert("Activity deleted");
  };

  return (
    <View>
      <Modal
        isVisible={modalVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={400}
        transparent={true}
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
            <Text style={styles.textLocation}>Location: {item.area}</Text>
            <Text style={styles.textUser}>Created By: {item.user}</Text>
          </View>

          <View>
            <MapScreen
              PostsLocation={location}
              ActivityTitle={item.title}
            ></MapScreen>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.textDescription}>{item.description}</Text>
          </View>
          <View style={styles.timeAndDateContainer}>
            <Text style={styles.timeAndDate}>
              Activity starts: {item.date} at {item.time}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={(values) => {
                setDisabled(true);
                disabled ? null : deleteData(item);
              }}
            >
              <Text style={styles.buttonText}>Delete Activity</Text>
            </TouchableOpacity>
          </View>
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

  timeAndDateContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  timeAndDate: {
    color: "white",
  },

  text: {
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#446E80",
  },

  descriptionContainer: {
    marginTop: 20,
    borderRadius: 15,
    padding: 10,
    width: "90%",
    height: "25%",
    backgroundColor: "#3F3947",
  },

  textTitle: {
    color: "white",
    fontFamily: "creato",
    fontSize: 26,
    marginTop: 20,
  },
  textDescription: {
    color: "white",
    fontFamily: "creato",
    fontSize: 18,
    marginTop: 20,
  },
  textUser: {
    color: "white",
    fontFamily: "creato",
    fontSize: 20,
    paddingVertical: 10,
  },
  textLocation: {
    color: "white",
    fontFamily: "creato",
    fontSize: 20,
    marginTop: 20,
  },
  imageContainer: {
    marginTop: 0,
    width: "100%",
    height: "33%",
    alignItems: "center",
    borderBottomColor: "#446E80",
    borderBottomWidth: 2,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    overflow: "hidden",
  },

  centeredView: {
    borderRadius: 15,
    backgroundColor: "#1C1924",
    flex: 1,
    alignItems: "center",
    // shadowColor: "#0000",
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

  buttonContainer: {},

  button: {
    width: 150,
    height: 40,
    backgroundColor: "#446E80",

    marginTop: 10,
    marginBottom: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: 18,
    textAlign: "center",
    padding: 5,
    color: "white",
  },
});
