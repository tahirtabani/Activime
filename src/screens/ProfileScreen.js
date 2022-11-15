import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React from "react";
import { getAuth, signOut } from "firebase/auth";

const ProfileScreen = ({ navigation }) => {
  const currentUserEmail = getAuth().currentUser.email;
  const currentUser = getAuth();

  const handleLogout = () => {
    signOut(currentUser);
    navigation.navigate("LoginScreen");
    alert(`Successfully signed out of ${currentUserEmail}'s account`);

    return (
      <View>
        <Text style={{ fontSize: 100 }}>Home</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({});
};
export default ProfileScreen;
