import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";

const Home = () => {
  const [activity, setActivity] = useState([]);

  const activityRef = db.collection("activity");

  useEffect(() => {
    activityRef.onSnapshot((querySnapshot) => {
      const activities = [];
      querySnapshot.forEach((doc) => {
        const { user, title, description, imageUrl, location, area } =
          doc.data();
        activities.push({
          id: doc.id,
          user,
          description,
          imageUrl,
          title,
          location,
          area,
        });
        setActivity(activities);
      });
    });
  }, []);

  return (
    <View style={styles.border}>
      <FlatList
        data={activity}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable style={styles.card}>
            <View>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            </View>
            <View style={styles.cardDetails}>
              <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
              <Text>{item.area}</Text>
              <Text>{item.user}</Text>
            </View>
          </Pressable>
        )}
      ></FlatList>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  border: {
    borderWidth: 5,
    marginTop: 40,
    backgroundColor: "#271F29",
  },

  card: {
    backgroundColor: "#B7B5BD",
    margin: 10,
    borderRadius: 18,
    flexDirection: "row",
    shadowColor: "#000000",
    elevation: 20,
  },

  image: {
    width: 150,
    height: 150,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },

  cardDetails: {
    marginLeft: 20,
    justifyContent: "space-evenly",
    flexShrink: 1,
  },
});
