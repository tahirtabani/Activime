import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { auth } from '../../firebase';

const Registration = ({ navigation }) => {
  const [registrationEmail, setRegistrationEmail] = useState('');
  const [registrationPassword, setRegistrationPassword] = useState('');
  const [confirmRegistrationPassword, setConfirmRegistrationPassword] =
    useState('');

  const handleRegistration = () => {
    if (registrationPassword === '' || confirmRegistrationPassword === '') {
      alert('must type a password');
    } else if (registrationPassword !== confirmRegistrationPassword) {
      alert('Passwords does not match');
    } else {
      auth
        .createUserWithEmailAndPassword(registrationEmail, registrationPassword)
        .then((userCredentials) => {
          navigation.navigate('LoginScreen');
          alert('Account successfully created');
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          value={registrationEmail}
          onChangeText={(text) => setRegistrationEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='Password'
          value={registrationPassword}
          onChangeText={(text) => setRegistrationPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder='Confirm Password'
          value={confirmRegistrationPassword}
          onChangeText={(text) => setConfirmRegistrationPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleRegistration}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});
