import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";

import { db } from "../../firebase";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";

const BioPage = ({ user }) => {
  const [userBio, setUserBio] = useState("");
  const [currentBio, setCurrentBio] = useState("");
  const currentUser = user;

  const handleUpdatedBio = () => {
    if (userBio !== "") {
      db.collection("users")
        .doc(currentUser)
        .update({
          bio: userBio,
        })
        .then((user) => {})
        .catch((err) => {
          alert(err);
        });
    }
  };

  db.collection("users")
    .doc(currentUser)
    .get()
    .then((user) => {
      if (user.data() === undefined) {
        db.collection("users")
          .doc(currentUser)
          .set({
            bio: "",
            age: "",
            gender: "",
          })
          .then((user) => {
            console.log("successfully created");
          })
          .catch((err) => {
            alert(err);
          });
      } else {
        setCurrentBio(user.data().bio);
      }
    });

  return (
    <View style={styles.bioContainer}>
      <TextInput
        multiline
        style={styles.bio}
        onChangeText={setUserBio}
        value={userBio}
        editable
        placeholder={currentBio}
        placeholderTextColor="#FFFF"
        numberOfLines={6}
        textAlignVertical="top"
      />
      <TouchableOpacity
        style={styles.saveBioButton}
        onPressOut={() => {
          handleUpdatedBio();
        }}
      >
        <Text style={styles.button}>Save Bio</Text>
      </TouchableOpacity>
      <View></View>
    </View>
  );
};

export default BioPage;

const styles = StyleSheet.create({
  bioContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  bio: {
    color: "white",
    height: 150,
    width: 350,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "white",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#3F3947",
    textAlign: "center",
  },
  saveBioButton: {
    width: 130,
    height: 40,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#446E80",
    color: "white",
    textAlign: "center",
    padding: 5,
    borderRadius: 10,
  },
});
