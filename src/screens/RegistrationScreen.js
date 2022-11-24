import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { getAuth, updateProfile } from "firebase/auth";

const Registration = ({ navigation }) => {
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationPassword, setRegistrationPassword] = useState("");
  const [confirmRegistrationPassword, setConfirmRegistrationPassword] =
    useState("");
  const [username, setUsername] = useState("");

  const handleRegistration = () => {
    if (registrationPassword === "" || confirmRegistrationPassword === "") {
      alert("must type a password");
    } else if (registrationPassword !== confirmRegistrationPassword) {
      alert("Passwords does not match");
    } else {
      auth
        .createUserWithEmailAndPassword(registrationEmail, registrationPassword)
        .then((userCredentials) => {
          const user = getAuth().currentUser;

          updateProfile(user, {
            displayName: username,

            photoURL:
              "https://s3-alpha-sig.figma.com/img/80c4/6a70/aee752c86eca80bb4f8c81a1334d647e?Expires=1670198400&Signature=ftMNwI--vTn6cBcjTIFvrzxJvTt8vBjK786yyZKJWOPw7-JODBuNP-82TCfppcYnDHdmtlxEbzafBZyByRxnAb5gXHSxJZ1e844S6oV7Uk3HkKdfeczXdjmvSpUzFuXQOX1CBN00Qz9fUzLxrPAqbV5RMVJEhkQ134SeAPhX9lTPhcugO-CPGH2Mkn-a94vcGGgou-NCZkPRaUez6P0PdGw4nZ76eXr7WQlO2bxn4LcrrcSSWQmdRI4E54DfTeowcFXYolEZ67BsvK5Fl6TELUzSyWAt1d0EG8-N83j2HLHd2MeR8QQ-SKTxiIJrLocRBzE68qUzyZzfWvD3NDLMrg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
          });
        })
        .then((userCredentials) => {
          navigation.navigate("LoginScreen");
          alert("Account successfully created");
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../Images/activime_logo_white.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={registrationEmail}
          onChangeText={(text) => setRegistrationEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={registrationPassword}
          onChangeText={(text) => setRegistrationPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmRegistrationPassword}
          onChangeText={(text) => setConfirmRegistrationPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleRegistration}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register Link</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#1C1924",
  },
  inputContainer: {
    width: "80%",
  },

  input: {
    backgroundColor: "#3F3947",
    color: "white",
    placeholderTextColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 25,
    fontSize: 18,
    textAlign: "center",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "#446E80",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonOutlineText: {
    color: "white",

    fontWeight: "700",
    fontSize: 16,
  },
  logoContainer: {
    width: 300,
    height: 100,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
});
