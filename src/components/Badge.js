import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Badge = ({ item }) => {
  return (
    <View style={styles.test}>
      <Text style={{ fontSize: 50 }}>😀</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  test: {
    fontSize: 10,
    color: 'white',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
  },
});
