import {
  addDoc,
  collection,
  query,
  where,
  writeBatch,
  doc,
  snapshot,
  connectFirestoreEmulator,
  onSnapshot,
} from "firebase/firestore";
import {
  StatusBar,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  datePick,
  KeyboardAvoidingView,
  FlatList,
  Pressable,
} from "react-native";
import Activity from "./Activity";

import { Formik } from "formik";
import * as Yup from "yup";
import { db } from "../../firebase";
import * as _ from "lodash";
import React, { useState } from "react";

const SignupSchema = Yup.object().shape({
  search: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter a search parameter"),
});

const SearchScreen = ({ navigation }) => {
  const [searchParam, setSearchParam] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [searchResults, setSearchResults] = useState();

  const AddData = (searchParam) => {
    const ref = collection(db, "activity");
    const q = query(ref, where("tags", "array-contains-any", ["park"]));

    onSnapshot(q, (snapshot) => {
      let searched = [];
      //   console.log(snapshot, "snapshot");
      snapshot.docs.forEach((doc) => {
        searched.push({ ...doc.data(), id: doc.id });
      });
      console.log(searched, "searched");
      setSearchResults(searched);
    });
  };
  return searchParam === "" ? (
    <KeyboardAvoidingView behavior="height" style={styles.border}>
      <Formik
        initialValues={{
          search: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          setSearchParam(values.search);
          AddData(searchParam);
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
          setFieldValue,
        }) => (
          <View style={styles.wrapper}>
            <View style={styles.formContainer}>
              <Text style={styles.title}> Search Activities </Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Search"
                  onChangeText={handleChange("search")}
                  value={values.search}
                  onBlur={() => setFieldTouched("search")}
                />
                {errors.title && (
                  <Text style={styles.errorTxt}>{errors.title}</Text>
                )}
              </View>

              <TouchableOpacity
                // onPress={AddData(values)}
                // onPress={deleteEmptyMessages}
                onPress={handleSubmit}
                disabled={!isValid}
                style={[
                  styles.submitBtn,
                  { backgroundColor: isValid ? "#446E80" : "#A5C9CA" },
                ]}
              >
                <Text style={styles.submitBtnTxt}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  ) : (
    <View style={styles.border}>
      <FlatList
        data={searchResults}
        numColumns={1}
        renderItem={({ item }) =>
          item.id === selectedId ? (
            <Pressable
              style={styles.card}
              onPress={() => {
                setSelectedId(null);
                console.log(item.id);
              }}
            >
              <Activity
                item={item}
                setSelectedId={setSelectedId}
                location={item.location}
              />
              <View>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
              </View>

              <View style={styles.cardDetails}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text>{item.area}</Text>
                <Text>{item.time}</Text>
              </View>
            </Pressable>
          ) : (
            <Pressable
              style={styles.card}
              onPress={() => {
                setSelectedId(item.id);
              }}
            >
              <View>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
              </View>
              <View style={styles.cardDetails}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text>{item.area}</Text>
                <Text>{item.time}</Text>
              </View>
            </Pressable>
          )
        }
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      ></FlatList>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3F3947",
    paddingHorizontal: 15,
    paddingTop: "auto",
    height: "100%",
  },
  inputWrapper: {
    flex: 1,
    width: "50%",
  },

  dateButton: {
    position: "absolute",
    right: 10,
    top: 8,
  },

  formContainer: {
    backgroundColor: "#1C1924",
    padding: 20,
    borderRadius: 20,
    width: "100%",
  },
  dateContainer: {
    flexDirection: "row",
    flex: 1,
  },
  inputStyle: {
    borderColor: "#3F3947",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#3F3947",
    color: "#fff",
  },
  dateInputStyle: {
    borderColor: "#16213E",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#3F3947",
    color: "#fff",
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "400",
    marginBottom: 15,
    textAlign: "center",
  },
  inputWrapper: {
    marginBottom: 15,
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
  dateContainer: {
    width: "100%",
  },
  border: {
    backgroundColor: "#1C1924",
  },

  card: {
    backgroundColor: "#3F3947",
    margin: 10,
    borderRadius: 18,
    flexDirection: "row",
    shadowColor: "#000000",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },

  image: {
    width: 150,
    height: 150,
    aspectRatio: 3 / 2,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },

  expandedImage: {
    width: "auto",
    height: "auto",
    aspectRatio: 3 / 2,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },

  cardDetails: {
    marginLeft: 20,
    justifyContent: "space-evenly",
    flexShrink: 1,
  },

  cardTitle: {
    paddingBottom: 15,
    fontWeight: "bold",
    color: "#FFBD70",
    fontSize: 15,
  },

  expandedCardDetails: {
    marginLeft: 20,
    justifyContent: "space-evenly",
    flexShrink: 1,
    padding: 12,
  },

  expandedCard: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 18,
    flexDirection: "column",
    shadowColor: "#000000",
    elevation: 20,
    height: "auto",
  },

  button: {
    width: "auto",
    borderWidth: 8,
    borderColor: "lightcoral",
    margin: 10,
    borderRadius: 180,
    shadowColor: "#000000",
  },

  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
  },
});
