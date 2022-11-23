import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  HorizontalScrollView,
} from 'react-native';
import React from 'react';

const Badges = () => {
  const dataArr = [
    { badge1: '😊' },
    { badge1: '❤️' },
    { badge1: '🥳' },
    { badge1: '🧑' },
    { badge1: '❤️' },
    { badge1: '😊' },
    { badge1: '😊' },
    { badge1: '❤️' },
    { badge1: '🥳' },
    { badge1: '🧑' },
    { badge1: '❤️' },
    { badge1: '😊' },
    { badge1: '😊' },
    { badge1: '❤️' },
    { badge1: '🥳' },
    { badge1: '🧑' },
    { badge1: '❤️' },
    { badge1: '😊' },
    { badge1: '😊' },
    { badge1: '❤️' },
    { badge1: '🥳' },
    { badge1: '🧑' },
    { badge1: '❤️' },
    { badge1: '😊' },
  ];

  return (
    <View style={styles.badgeContainer}>
      <FlatList
        horizontal
        data={dataArr}
        numColumns={1}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.emojis}>{item.badge1}</Text>
          </View>
        )}
      ></FlatList>
    </View>
  );
};

export default Badges;

const styles = StyleSheet.create({
  badgeContainer: {
    marginVertical: 22.5,
    backgroundColor: '#3F3947',

    height: 70,
  },
  emojis: {
    paddingHorizontal: 20,
    fontSize: 50,
    justifyContent: 'center',
  },
});
