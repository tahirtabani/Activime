import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase";

const BioPage = ({ user }) => {
  const [userBio, setUserBio] = useState("");
  const [updatedBio, setUpdatedBio] = useState({ bio: "" });
  //   const [currentBio, setCurrentBio] = useState({ bio: "" });
  const currentUser = user;

  const handleUpdatedBio = () => {
    setUpdatedBio({ bio: userBio });

    if (updatedBio.bio !== "") {
      db.collection("users")
        .doc(currentUser)
        .update({
          bio: updatedBio.bio,
        })
        .then((user) => {});
    }
  };

  //   const docRef = doc(db, "users", currentUser);

  return (
    <View style={styles.bio}>
      <TextInput
        multiline
        style={styles.input}
        onChangeText={setUserBio}
        value={userBio}
        editable
        placeholder={"bio"}
        numberOfLines={6}
        defaultValue="bio"
        textAlignVertical="top"
      />
      <TouchableOpacity
        onPress={() => {
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
          <Text style={styles.button}>Save</Text>
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
