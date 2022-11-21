import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  HorizontalScrollView,
} from "react-native";
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import Badges from "./Badges";

const ProfileScreen = ({ navigation }) => {
  const { currentUser } = getAuth();

  return (
    <View style={styles.profileContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: currentUser.photoURL }}
            style={styles.image}
          ></Image>
        </View>

        <View style={styles.profileUsername}>
          <Text
            style={{
              fontSize: 30,
              color: "#FFBD70",
              fontWeight: "bold",
            }}
          >
            {currentUser.displayName}'s Profile
          </Text>
        </View>
      </View>
      <Badges></Badges>

      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            getAuth().signOut();
            navigation.navigate("LoginScreen");
            alert(`Signed out of ${currentUserEmail}'s account`);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: "#1C1924",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  profileUsername: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,

    backgroundColor: "#E56262",

    borderRadius: 10,
    shadowColor: "#000000",
  },
  headerContainer: {
    height: "30%",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  image: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#FFBD70",
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
  },

  badgeBar: {
    backgroundColor: "gray",
    height: 100,
    width: "100%",
  },
});
export default ProfileScreen;
