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
import { BlurView } from "@react-native-community/blur";
import React, { useState, useEffect } from "react";

const Activity = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={styles.blurry}>
      <Modal
        style={{ content: { backgroundColor: "black" } }}
        animationType={"fancy"}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView} BlurRadius={5}>
          <View>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          </View>

          <View style={styles.cardDetails}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>{item.area}</Text>
            <Text>{item.user}</Text>
            <Text>{item.description}</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({
  blurry: {
    blueRadius: 50,
  },
  centeredView: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    margin: 20,
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    width: 150,
    height: 150,
    aspectRatio: 3 / 2,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },

  expandedImage: {
    width: "auto",
    height: "auto",
    aspectRatio: 3 / 2,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },

  cardDetails: {
    marginLeft: 20,
    justifyContent: "space-evenly",
    flexShrink: 1,
  },

  cardTitle: {
    paddingBottom: 15,
    fontWeight: "bold",
  },

  expandedCardDetails: {
    marginLeft: 20,
    justifyContent: "space-evenly",
    flexShrink: 1,
    padding: 12,
  },

  expandedCard: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 18,
    flexDirection: "column",
    shadowColor: "#000000",
    elevation: 20,
    height: "auto",
  },

  button: {
    width: "auto",
    borderWidth: 8,
    borderColor: "lightcoral",
    margin: 10,
    borderRadius: 180,
    shadowColor: "#000000",
  },

  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
  },
});
