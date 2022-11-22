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
    <View style={styles.bio}>
      <TextInput
        multiline
        style={styles.input}
        onChangeText={setUserBio}
        value={userBio}
        editable
        placeholder={currentBio}
        placeholderTextColor="#FFFF"
        numberOfLines={6}
        defaultValue="nio"
        textAlignVertical="top"
      />
      <TouchableOpacity
        onPressOut={() => {
          handleUpdatedBio();
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text style={styles.button}>Save✔️</Text>
        </View>
      </TouchableOpacity>
      <View></View>
    </View>
  );
};

export default BioPage;

const styles = StyleSheet.create({
  input: {
    color: "white",
    height: "auto",
    width: 400,
    margin: 12,
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#3F3947",
  },
  button: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "purple",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    borderRadius: 10,
    shadowColor: "#000000",
  },
});
