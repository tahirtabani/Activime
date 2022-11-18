import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

const AddData = (data) => {
  const ref = collection(db, "activity");

  addDoc(ref, data).then((ref) => {
    console.log("pls work");
  });
};

const SignupSchema = Yup.object().shape({
  Title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  Description: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  Area: Yup.string().email("Invalid email").required("Required"),
});

const PostScreen = () => {
  return (
    <Formik
      initialValues={{
        Title: "",
        Date: "",
        Time: "",
        Description: "",
        ImageURL: "",
        Area: "",
        Location: "",
        User: "",
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, errors, touched, handleSubmit, handleChange }) => (
        <View style={styles.wrapper}>
          <StatusBar barStyle={"light-content"}> </StatusBar>
          <View style={styles.formContainer}>
            <Text style={styles.title}> Post an Activity</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Title"
                onChangeText={handleChange("title")}
                value={values.title}
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput style={styles.inputStyle} placeholder="Date" />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput style={styles.inputStyle} placeholder="Time" />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput style={styles.inputStyle} placeholder="Description" />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput style={styles.inputStyle} placeholder="ImageURL" />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput style={styles.inputStyle} placeholder="Area" />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput style={styles.inputStyle} placeholder="Location" />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput style={styles.inputStyle} placeholder="User" />
            </View>
            <TouchableOpacity
              onPress={AddData(values)}
              style={styles.submitBtn}
            >
              <Text style={styles.submitBtnTxt}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C3333",
    paddingHorizontal: 15,
  },
  formContainer: {
    backgroundColor: "#F5EDDC",
    padding: 20,
    borderRadius: 20,
    width: "100%",
  },
  title: {
    color: "#16213E",
    fontSize: 26,
    fontWeight: "400",
    marginBottom: 15,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  inputStyle: {
    borderColor: "#16213E",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  errorTxt: {
    fontSize: 12,
    color: "#FF0D10",
  },
  submitBtn: {
    backgroundcolor: "#395B64",
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
  },
  submitBtnTxt: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
});
