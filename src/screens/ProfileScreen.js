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
import { getAuth, signOut } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';

const ProfileScreen = ({ navigation }) => {
  const { currentUser } = getAuth();

  return (
    <View style={styles.profileContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: currentUser.photoURL }}
            style={styles.image}
          ></Image>
        </View>

        <View style={styles.profileUsername}>
          <Text
            style={{
              fontSize: 30,
              color: '#C68CEA',
              fontWeight: 'bold',
            }}
          >
            {currentUser.displayName}'s Profile
          </Text>
        </View>
      </View>

      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            getAuth().signOut();
            navigation.navigate('LoginScreen');
            alert(`Signed out of ${currentUserEmail}'s account`);
          }}
          style={styles.button}
        >
          <Text
            style={{
              backgroundColor: '#E56262',
              position: 'absolute',
              left: 163,
              top: 600,
              width: 'auto',
              borderRadius: 5,
              color: 'white',
              fontSize: 20,
              alignItem: 'center',
            }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: '#271F29',
    width: '100%',
    height: '100%',
  },
  profileUsername: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#E56262',
    position: 'absolute',
  },
  headerContainer: {
    height: '30%',
  },

  buttonText: {
    position: 'absolute',
    left: 140,
    top: 70,
    width: 77,
    color: 'black',
    fontSize: 20,
    fontStyle: 'normal',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  image: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#C68CEA',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
  },

  badgeBar: {
    backgroundColor: 'gray',
    height: 100,
    width: '100%',
  },
});
export default ProfileScreen;
