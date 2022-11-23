import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import Activity from './Activity';

const ActivityList = () => {
  const [activity, setActivity] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const activityRef = db.collection('activity');


  useEffect(() => {
    activityRef.onSnapshot((querySnapshot) => {
      const activities = [];
      querySnapshot.forEach((doc) => {
        const {
          user,
          title,
          description,
          imageUrl,
          location,
          area,
          time,
          date,
        } = doc.data();
        activities.push({
          id: doc.id,
          user,
          description,
          imageUrl,
          title,
          location,
          area,
          time,
          date,
        });
        setActivity(activities);
      });
    });
  }, []);

  return (
    <View style={styles.flatListContainer}>
      <FlatList
        ListFooterComponent={
          <View style={{ height: 0, marginBottom: 40 }}></View>
        }
        style={styles.list}
        data={activity}
        numColumns={1}
        renderItem={({ item }) =>
          item.id === selectedId ? (
            <Pressable
              style={styles.card}
              onPress={() => {
                setSelectedId(null);
              }}
            >
              <Activity item={item} setSelectedId={setSelectedId} />

              <View>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.fixImage}
                />
              </View>

              <View style={styles.cardDetailsContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDetails}>{item.area}</Text>
                <Text style={styles.cardDetails}>{item.time}</Text>
              </View>
            </Pressable>
          ) : (
            <Pressable
              style={styles.card}
              onPress={() => {
                setSelectedId(item.id);
              }}
            >
              <View style={styles.cardContainer}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />

                <View style={styles.cardDetailsContainer}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDetails}>{item.area}</Text>
                  <Text style={styles.cardDetails}>{item.date}</Text>
                </View>
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
  list: {
    backgroundColor: '#1C1924',
  },

  card: {
    backgroundColor: '#3F3947',
    marginTop: 30,
    marginHorizontal: 10,
    borderRadius: 18,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#446E80',
  },

  image: {
    width: 150,
    height: '100%',
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
    borderBottomLeftRadius: 18,
  },

  cardContainer: {
    flexShrink: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },

  cardDetailsContainer: {
    flexShrink: 1,
    paddingLeft: 30,
    borderLeftWidth: 1,
    height: '100%',
    borderLeftColor: '#446E80',
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
