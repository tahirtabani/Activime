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
  return (
    <View>
      <ActivityList />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
