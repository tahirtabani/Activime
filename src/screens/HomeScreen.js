import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import ActivityList from "./ActivityList";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View>
      <Modal
        animationType={"fancy"}
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <ActivityList />
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
