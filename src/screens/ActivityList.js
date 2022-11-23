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
import SavedScreen from "./SavedScreen";
import SearchScreen from "./SearchScreen";

const ActivityList = () => {
  const [activity, setActivity] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const activityRef = db.collection("activity");


  useEffect(() => {
    activityRef.onSnapshot((querySnapshot) => {
      const activities = [];
      querySnapshot.forEach((doc) => {
        const { user, title, description, imageUrl, location, area, time } =
          doc.data();
        activities.push({
          id: doc.id,
          user,
          description,
          imageUrl,
          title,
          location,
          area,
          time,
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
                <Text>{item.time}</Text>
              </View>
            </Pressable>
          ) : (
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
                <Text>{item.time}</Text>
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
    marginTop: 40,
    backgroundColor: "#1C1924",
  },
  card: {
    backgroundColor: "#3F3947",
    margin: 10,
    borderRadius: 18,
    flexDirection: "row",
    shadowColor: "#000000",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  image: {
    width: 150,
    height: 150,
    aspectRatio: 3 / 2,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },

  fixImage: {
    // width: 150,
    // height: 134,
    flex: 1,
    width: 150,
    height: 'auto',
    resizeMode: 'cover',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },

  cardContainer: {
    flexShrink: 1,
  },
  cardDetailsContainer: {
    flexShrink: 1,
    padding: 12,
  },

  cardDetails: {
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});
