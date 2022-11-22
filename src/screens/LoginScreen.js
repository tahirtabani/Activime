import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,

  Image,
} from 'react-native';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { auth } from '../../firebase';

const LoginScreen = ({ navigation }) => {
  const [loginEmail, setLoginEmail] = useState('Testing@test.com');
  const [loginPassword, setLoginPassword] = useState('Testing');

  const [fontsLoaded] = useFonts({
    creato: require('../../assets/fonts/CreatoDisplay-Light.otf'),
  });


  const handleSignIn = () => {
    auth
      .signInWithEmailAndPassword(loginEmail, loginPassword)
      .then((userCredentials) => {
        navigation.navigate('Tabs');
      })
      .catch((err) => alert(err.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../Images/activime_logo_white.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          value={loginEmail}
          onChangeText={(text) => setLoginEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='Password'
          value={loginPassword}
          onChangeText={(text) => setLoginPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('RegistrationScreen');
          }}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#1C1924',

  },
  inputContainer: {
    width: '80%',
  },
  input: {

    backgroundColor: '#3F3947',
    color: 'white',
    placeholderTextColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 25,
    fontSize: 18,
    textAlign: 'center',

  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {

    backgroundColor: '#446E80',

    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',

    marginTop: 20,

  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: 'white',

    marginTop: 20,
    borderColor: '#446E80',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: '#446E80',

    fontWeight: '700',
    fontSize: 16,
  },
  logoContainer: {
    width: 300,
    height: 100,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
});
