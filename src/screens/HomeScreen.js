import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';

const Home = () => {
  const [activity, setActivity] = useState([]);

  const activityRef = db.collection('activity');

  useEffect(() => {
    activityRef.onSnapshot((querySnapshot) => {
      const activities = [];
      querySnapshot.forEach((doc) => {
        const { User, description } = doc.data();
        activities.push({
          id: doc.id,
          User,
          description,
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
              <Text>{item.description}</Text>
              <Text>{item.id}</Text>
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
  },

  card: {
    backgroundColor: 'green',
  },
});
