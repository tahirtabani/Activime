import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";

const ProfileScreen = ({ navigation }) => {
  const currentUserEmail = getAuth().currentUser.email;
  const { currentUser } = getAuth();
  console.log(currentUser.displayName);
  return (
    <View styles={styles.profileContainer}>
      <View styles={styles.profileUsername}>
        <Text style={{ fontSize: 50 }}>
          {currentUser.displayName}'s Profile
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={{ uri: currentUser.photoURL }}
          style={styles.image}
        ></Image>
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            getAuth().signOut();
            navigation.navigate("LoginScreen");
            alert(`Signed out of ${currentUserEmail}'s account`);
          }}
          style={styles.button}
        >
          <Text
            style={{
              backgroundColor: "#E56262",
              position: "absolute",
              left: 163,
              top: 600,
              width: "auto",
              borderRadius: 5,
              color: "white",
              fontSize: 20,
              alignItem: "center",
            }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  profileUsername: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#E56262",
    position: "absolute",
  },
  buttonText: {
    position: "absolute",
    left: 140,
    top: 70,
    width: 77,
    color: "black",
    fontSize: 20,
    fontStyle: "normal",
  },
  imageContainer: {},
  image: {
    borderRadius: 15,
    borderWidth: 5,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: "50%",
  },
});
export default ProfileScreen;
