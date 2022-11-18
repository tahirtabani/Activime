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
  return (
    <View style={styles.profileContainer}>
      <View style={styles.header}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "30%",
          }}
        >
          <Image
            source={{ uri: currentUser.photoURL }}
            style={styles.image}
          ></Image>
        </View>
        <View style={styles.profileUsername}>
          <Text
            style={{
              fontSize: 30,
              color: "#C68CEA",
              marginTop: 30,
              fontWeight: "bold",
            }}
          >
            {currentUser.displayName}'s Profile
          </Text>
        </View>
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
    backgroundColor: "#271F29",
    width: "100%",
    height: "100%",
  },
  profileUsername: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#E56262",
    position: "absolute",
  },
  header: {
    height: "60%",
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
    borderColor: "#C68CEA",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 300,
    width: 120,
    height: 120,
  },
});
export default ProfileScreen;
