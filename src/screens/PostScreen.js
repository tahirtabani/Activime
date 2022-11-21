import {
  addDoc,
  collection,
  query,
  where,
  writeBatch,
  doc,
  snapshot,
} from "firebase/firestore";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  datePick,
} from "react-native";

import { Formik } from "formik";
import * as Yup from "yup";
import { db } from "../../firebase";
import * as _ from "lodash";

// const deleteEmptyMessages = async () => {
//   console.log("Im in");
//   const snapshot = await db
//     .collection("activity")
//     .where("ImageURL", "==", "")
//     .get();
//   const MAX_WRITES_PER_BATCH = 500; /** https://cloud.google.com/firestore/quotas#writes_and_transactions */

//   const batches = _.chunk(snapshot.docs, MAX_WRITES_PER_BATCH);
//   const commitBatchPromises = [];

//   batches.forEach((batch) => {
//     console.log("batch: ", batch);
//     const writeBatch = db.batch();
//     batch.forEach((doc) => writeBatch.delete(doc.ref));
//     commitBatchPromises.push(writeBatch.commit());
//   });

//   await Promise.all(commitBatchPromises);
// };
const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter a title"),
  Date: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter a date"),
});

const PostScreen = ({ navigation }) => {
  const AddData = (data) => {
    console.log("data: ", data);
    const ref = collection(db, "activity");

    addDoc(ref, data)
      .then((ref) => {
        console.log("pls work");
        alert("Activity posted successfully");
        navigation.navigate("Tabs");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Formik
      initialValues={{
        title: "",
        Date: "",
        Time: "",
        Description: "",
        ImageURL: "",
        Area: "",
        Location: "",
        User: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        console.log(values);
        AddData(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        setFieldTouched,
        handleChange,
        isValid,
      }) => (
        <View style={styles.wrapper}>
          <View style={styles.formContainer}>
            <Text style={styles.title}> Post an Activity </Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Title"
                onChangeText={handleChange("title")}
                value={values.Title}
                onBlur={() => setFieldTouched("title")}
              />
              {errors.title && (
                <Text style={styles.errorTxt}>{errors.title}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Date"
                onChangeText={handleChange("Date")}
                value={values.Date}
              />
              {errors.Title && (
                <Text style={styles.errorTxt}>{errors.Date}</Text>
              )}
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
              // onPress={AddData(values)}
              // onPress={deleteEmptyMessages}
              onPress={handleSubmit}
              disabled={!isValid}
              style={[
                styles.submitBtn,
                { backgroundColor: isValid ? "#395B64" : "#A5C9CA" },
              ]}
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
    // backgroundcolor: "#395B64",
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
