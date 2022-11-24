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
} from 'firebase/firestore';
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
} from 'react-native';
import Activity from './Activity';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { db } from '../../firebase';
import * as _ from 'lodash';
import React, { useState } from 'react';

const SignupSchema = Yup.object().shape({
  search: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter a search parameter'),
});

const SearchScreen = ({ navigation }) => {
  const [searchParam, setSearchParam] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [searchResults, setSearchResults] = useState();

  const AddData = (searchParam) => {
    const ref = collection(db, 'activity');
    const q = query(ref, where('tags', 'array-contains-any', ['park']));

    onSnapshot(q, (snapshot) => {
      let searched = [];
      //   console.log(snapshot, "snapshot");
      snapshot.docs.forEach((doc) => {
        searched.push({ ...doc.data(), id: doc.id });
      });
      console.log(searched, 'searched');
      setSearchResults(searched);
    });
  };
  return searchParam === '' ? (
    <KeyboardAvoidingView behavior='height' style={styles.border}>
      <Formik
        initialValues={{
          search: '',
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
                  placeholder='Search'
                  onChangeText={handleChange('search')}
                  value={values.search}
                  onBlur={() => setFieldTouched('search')}
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
                  { backgroundColor: isValid ? '#446E80' : '#A5C9CA' },
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
    <View style={styles.flatListContainer}>
      <FlatList
        style={styles.list}
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
              <View style={styles.cardContainer}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.fixImage}
                />
              </View>

              <View style={styles.cardDetailsContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDetails}>{item.area}</Text>
                <Text style={styles.cardDetails}>{item.date}</Text>
                <Text style={styles.cardDetails}>Hosted by: {item.user}</Text>
              </View>
            </Pressable>
          ) : (
            <Pressable
              style={styles.card}
              onPress={() => {
                setSelectedId(item.id);
              }}
            >
              <View style={styles.cardContainer}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />

                <View style={styles.cardDetailsContainer}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDetails}>{item.area}</Text>
                  <Text style={styles.cardDetails}>{item.date}</Text>
                  <Text style={styles.cardDetails}>Hosted by: {item.user}</Text>
                </View>
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
  list: {
    backgroundColor: '#1C1924',
    height: '100%',
  },

  card: {
    backgroundColor: '#3F3947',
    marginTop: 30,
    marginHorizontal: 10,
    borderRadius: 18,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#446E80',
  },

  image: {
    width: 150,
    height: '100%',
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },

  fixImage: {
    // width: 150,
    // height: 134,
    flex: 1,
    width: 150,
    height: 'auto',
    resizeMode: 'cover',
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },

  cardContainer: {
    flexShrink: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },

  cardDetailsContainer: {
    flexShrink: 1,
    paddingLeft: 30,
    borderLeftWidth: 1,
    height: '100%',
    borderLeftColor: '#446E80',
  },

  cardDetails: {
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },

  cardTitle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3F3947',
    paddingHorizontal: 15,
    paddingTop: 'auto',
    height: '100%',
  },
  inputWrapper: {
    flex: 1,
    width: '50%',
  },

  dateButton: {
    position: 'absolute',
    right: 10,
    top: 8,
  },

  formContainer: {
    backgroundColor: '#1C1924',
    padding: 20,
    borderRadius: 20,
    width: '100%',
  },
  dateContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  inputStyle: {
    borderColor: '#3F3947',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#3F3947',
    color: '#fff',
  },
  dateInputStyle: {
    borderColor: '#16213E',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#3F3947',
    color: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '400',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 15,
  },

  errorTxt: {
    fontSize: 12,
    color: '#FF0D10',
  },
  submitBtn: {
    backgroundcolor: '#395B64',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
  },
  submitBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
});
