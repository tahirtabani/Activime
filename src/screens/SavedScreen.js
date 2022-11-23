import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import SavedActivity from "./SavedActivity";

const SavedScreen = () => {
  const [activity, setActivity] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const userEmail = getAuth().currentUser.email;

  const activityRef = db.collection(`${userEmail}`);

  useEffect(() => {
    activityRef.onSnapshot((querySnapshot) => {
      const activities = [];
      querySnapshot.forEach((doc) => {
        const { user, title, description, imageUrl, location, area, time } =
          doc.data();
        activities.push({
          id: doc.id,
          user,
          description,
          imageUrl,
          title,
          location,
          area,
          time,
        });
        setActivity(activities);
      });
    });
  }, []);

  return (
    <View style={styles.flatListContainer}>
      <FlatList
        ListFooterComponent={
          <View style={{ height: 0, marginBottom: 40 }}></View>
        }
        style={styles.list}
        data={activity}
        numColumns={1}
        renderItem={({ item }) =>
          item.id === selectedId ? (
            <Pressable
              style={styles.card}
              onPress={() => {
                setSelectedId(null);
              }}
            >
              <SavedActivity
                item={item}
                setSelectedId={setSelectedId}
                location={item.location}
              />

              <View>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.fixImage}
                />
              </View>

              <View style={styles.cardDetailsContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDetails}>{item.area}</Text>
                <Text style={styles.cardDetails}>{item.time}</Text>
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
                  <Text style={styles.cardDetails}>{item.time}</Text>
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

export default SavedScreen;

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#1C1924",
  },

  card: {
    backgroundColor: "#3F3947",
    marginTop: 30,
    marginHorizontal: 10,
    borderRadius: 18,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#446E80",
  },

  image: {
    width: 150,
    height: "100%",
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },

  fixImage: {
    // width: 150,
    // height: 134,
    flex: 1,
    width: 150,
    height: "auto",
    resizeMode: "cover",
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },

  cardContainer: {
    flexShrink: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },

  cardDetailsContainer: {
    flexShrink: 1,
    paddingLeft: 30,
    borderLeftWidth: 1,
    height: "100%",
    borderLeftColor: "#446E80",
  },

  cardDetails: {
    color: "#fff",
    marginTop: 20,
    marginBottom: 10,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
    justifyContent: "center",
    flexWrap: "wrap",
  },

  flatListContainer: {
    height: "100%",
  },
});

// const SavedScreen = () => {
//   const [saved, setSaved] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const userEmail = getAuth().currentUser.email;

// const savedRef = db.collection("saved").doc(userEmail);

// useEffect(() => {
//   savedRef.onSnapshot((querySnapshot) => {
//     console.log(querySnapshot, "query")
//     const saves = [];
//     querySnapshot.forEach((doc) => {
//       const { user, title, description, imageUrl, location, area, time } =
//         doc.data();
//       saves.push({
//         id: doc.id,
//         user,
//         description,
//         imageUrl,
//         title,
//         location,
//         area,
//         time,
//       });

//       setSaved(saves);
//       console.log(saved, "saved oh pls work plspls")
//     });
//   });
// }, []);

//   const test = [];
//   db.collection("saved")
//     .doc(userEmail)
//     .get()
//     .then((singleActivity) => {
//       test.push(singleActivity.data());

//       const { user, title, description, imageUrl, location, area, time } =
//         singleActivity.data();

//       setSaved(test.flat());

//     });

//   return (
//     <View style={styles.border}>
//       <FlatList
//         data={test}
//         numColumns={1}
//         renderItem={({ item }) =>
//           item.id === selectedId ? (
//             <Pressable
//               style={styles.card}
//               onPress={() => {
//                 setSelectedId(null);
//                 console.log(item.id);
//               }}
//             >
//               <SavedActivity item={item} setSelectedId={setSelectedId} />
//               <View>
//                 <Image source={{ uri: item.imageUrl }} style={styles.image} />
//               </View>

//               <View style={styles.cardDetails}>
//                 <Text style={styles.cardTitle}>{item.title}</Text>
//                 <Text>{item.area}</Text>
//                 <Text>{item.time}</Text>
//               </View>
//             </Pressable>
//           ) : (
//             <Pressable
//               style={styles.card}
//               onPress={() => {
//                 setSelectedId(item.id);
//               }}
//             >
//               <View>
//                 <Image source={{ uri: item.imageUrl }} style={styles.image} />
//               </View>
//               <View style={styles.cardDetails}>
//                 <Text style={styles.cardTitle}>{item.title}</Text>
//                 <Text>{item.area}</Text>
//                 <Text>{item.time}</Text>
//               </View>
//             </Pressable>
//           )
//         }
//         keyExtractor={(item) => item.id}
//         extraData={selectedId}
//       ></FlatList>
//     </View>
//   );
// };

// export default SavedScreen;

// const styles = StyleSheet.create({
//   border: {
//     marginTop: 40,
//     backgroundColor: "#1C1924",
//   },

//   card: {
//     backgroundColor: "#3F3947",
//     margin: 10,
//     borderRadius: 18,
//     flexDirection: "row",
//     shadowColor: "#000000",
//     elevation: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//   },

//   image: {
//     width: 150,
//     height: 150,
//     aspectRatio: 3 / 2,
//     borderTopLeftRadius: 18,
//     borderBottomLeftRadius: 18,
//   },

//   expandedImage: {
//     width: "auto",
//     height: "auto",
//     aspectRatio: 3 / 2,
//     borderTopLeftRadius: 18,
//     borderTopRightRadius: 18,
//   },

//   cardDetails: {
//     marginLeft: 20,
//     justifyContent: "space-evenly",
//     flexShrink: 1,
//   },

//   cardTitle: {
//     paddingBottom: 15,
//     fontWeight: "bold",
//     color: "#FFBD70",
//     fontSize: 15,
//   },

//   expandedCardDetails: {
//     marginLeft: 20,
//     justifyContent: "space-evenly",
//     flexShrink: 1,
//     padding: 12,
//   },

//   expandedCard: {
//     backgroundColor: "white",
//     margin: 10,
//     borderRadius: 18,
//     flexDirection: "column",
//     shadowColor: "#000000",
//     elevation: 20,
//     height: "auto",
//   },

//   button: {
//     width: "auto",
//     borderWidth: 8,
//     borderColor: "lightcoral",
//     margin: 10,
//     borderRadius: 180,
//     shadowColor: "#000000",
//   },

//   buttonText: {
//     fontWeight: "bold",
//     textAlign: "center",
//     padding: 5,
//   },
// });
