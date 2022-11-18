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
import Activity from "./Activity";

const ActivityList = () => {
  const [activity, setActivity] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

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
        renderItem={({ item }) =>
          item.id === selectedId ? (
            <Pressable
              style={styles.card}
              onPress={() => {
                setSelectedId(null);
                console.log(item.id);
              }}
            >
              <Activity item={item} setSelectedId={setSelectedId} />
              <View>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
              </View>

              <View style={styles.cardDetails}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text>{item.area}</Text>
                <Text>{item.user}</Text>
              </View>
            </Pressable>
          ) : (
            // </Pressable>
            <Pressable
              style={styles.card}
              onPress={() => {
                setSelectedId(item.id);
              }}
            >
              <View>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
              </View>
              <View style={styles.cardDetails}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text>{item.area}</Text>
                <Text>{item.user}</Text>
              </View>
            </Pressable>
          )
        }
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      ></FlatList>
    </View>
  );
};

export default ActivityList;

const styles = StyleSheet.create({
  border: {
    borderWidth: 5,
    marginTop: 40,
    backgroundColor: "#271F29",
  },

  card: {
    backgroundColor: "#FAEBD7",
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
