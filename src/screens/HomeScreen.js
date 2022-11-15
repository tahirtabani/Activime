import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  collection,
  doc,
  setDoc,
  snapshotEqual,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";

const Home = () => {
  db.collection("activity")
    .doc("VflsyLTv77AmNXj5VRXw")
    .get()
    .then((singleActivity) => {
      console.log(singleActivity.data());
    });

  return (
    <View>
      <Text style={{ fontSize: 100 }}>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
