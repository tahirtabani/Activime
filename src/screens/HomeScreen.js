import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React from "react";

const Home = ({ navigation }) => {
  const goToProfile = () => {
    navigation.navigate("ProfileScreen");
  };

  return (
    <View>
      <Text style={{ fontSize: 100 }}>Home</Text>
      <TouchableOpacity onPress={goToProfile} style={styles.button}>
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
