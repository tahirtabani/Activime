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
  Pressable,
} from 'react-native';
import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import Badges from './Badges';
import BioPage from './BioPage';
import { db } from '../../firebase';
import ChangeProfilePic from './ChangeProfilePic';
import MapComponent from './MapComponent';
import MapScreen from './MapScreen';
import MapButton from './MapButton';
import { useState } from 'react';

const ProfileScreen = ({ navigation }) => {
  const { currentUser } = getAuth();
  const [mapVisibility, setMapVisibility] = useState(false);
  return (
    <KeyboardAvoidingView behavior='height' style={styles.profileContainer}>
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
              position: 'absolute',
              top: 0,
              fontSize: 20,
              color: 'white',
            }}
          >
            {currentUser.displayName}'s Profile
          </Text>
        </View>
      </View>

      <View>
        <Badges></Badges>
        <BioPage user={currentUser.displayName}></BioPage>
      </View>

      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            getAuth().signOut();
            navigation.navigate('LoginScreen');
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: '#1C1924',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  profileUsername: {
    marginTop: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,

    backgroundColor: '#E56262',

    borderRadius: 10,
    shadowColor: '#000000',
  },
  headerContainer: {
    height: '30%',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  image: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#446E80',
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
