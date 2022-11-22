import {
  addDoc,
  collection,
  query,
  where,
  writeBatch,
  doc,
  snapshot,
  connectFirestoreEmulator,
} from 'firebase/firestore';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  datePick,
  KeyboardAvoidingView,
  Button,
  Pressable,
} from 'react-native';

// import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { db } from '../../firebase';
import * as _ from 'lodash';
import React, { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';

// const deleteEmptyMessages = async () => {
//   console.log("Im in");
//   const snapshot = await db
//     .collection("activity")
//     .where("imageURL", "==", "")
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
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter a title'),
  // date: Yup.string()
  //   .min(9, "Too Short!")
  //   .max(9, "Too Long!")
  //   .required("Please enter a date"),
});

const PostScreen = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setSelectedDate(date);
    // console.log("selectedDate: ", selectedDate.toLocaleDateString());
    hideDatePicker();
  };

  const AddData = (data) => {
    console.log('data: ', data);
    const ref = collection(db, 'activity');

    addDoc(ref, data)
      .then((ref) => {
        console.log('pls work');
        alert('Activity posted successfully');
        navigation.navigate('Tabs');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <KeyboardAvoidingView behavior='height'>
      <Formik
        initialValues={{
          title: '',
          date: selectedDate.toLocaleDateString(),
          time: '',
          description: '',
          imageURL: '',
          area: '',
          location: '',
          user: '',
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
          setFieldValue,
        }) => (
          <View style={styles.wrapper}>
            <View style={styles.formContainer}>
              <Text style={styles.title}> Post an Activity </Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder='Title'
                  onChangeText={handleChange('title')}
                  value={values.Title}
                  onBlur={() => setFieldTouched('title')}
                />
                {errors.title && (
                  <Text style={styles.errorTxt}>{errors.title}</Text>
                )}
              </View>

              <View style={styles.inputWrapper}>
                <View style={styles.dateContainer}>
                  <TextInput
                    style={styles.dateInputStyle}
                    placeholder={'Date'}
                    onChangeText={handleChange('date')}
                    value={selectedDate.toLocaleDateString()}
                  />
                  <Pressable onPress={showDatePicker} style={styles.dateButton}>
                    <FontAwesome
                      name='calendar'
                      size={30}
                      color='#fff'
                      style={styles.buttonIcon}
                    />
                  </Pressable>

                  <DateTimePickerModal
                    date={selectedDate}
                    isVisible={isDatePickerVisible}
                    mode='date'
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                  {errors.Title && (
                    <Text style={styles.errorTxt}>{errors.date}</Text>
                  )}
                </View>
              </View>

              <View style={styles.inputWrapper}>
                <TextInput style={styles.inputStyle} placeholder='Time' />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder='Description...'
                  multiline={true}
                  minHeight={100}
                  textAlignVertical='top'
                />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput style={styles.inputStyle} placeholder='ImageURL' />
                {/* <TextInput
                  style={styles.inputStyle}
                  placeholder="Date"
                  onChangeText={handleChange("date")}
                  value={values.date}
                />
                {errors.Title && (
                  <Text style={styles.errorTxt}>{errors.date}</Text>
                )} */}
                {/* <Text
                  name="date"
                  style={{ fontSize: 20, fontWeight: "bold" }}
                  onChangeText={handleChange("date")}
                  value={values.date}
                  onChange={handleChange("date")}
                >
                  {selectedDate
                    ? selectedDate.toLocaleDateString()
                    : "No date selected"}
                </Text>
                <Button title="Show Date Picker" onPress={showDatePicker} />
                <DateTimePickerModal
                  date={selectedDate}
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                /> */}
              </View>

              <View style={styles.inputWrapper}>
                <TextInput style={styles.inputStyle} placeholder='Location' />
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
  );
};

export default PostScreen;

const styles = StyleSheet.create({
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
    // backgroundcolor: "#395B64",
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
  dateContainer: {
    width: '100%',
  },
});
