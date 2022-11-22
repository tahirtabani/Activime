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
    const [saved, setSaved] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const user = getAuth().currentUser;
    console.log(user.email, "user")
  
    const savedRef = db.collection("saved");
  
    useEffect(() => {
      savedRef.onSnapshot((querySnapshot) => {
        const saves = [];
        querySnapshot.forEach((doc) => {
          const { user, title, description, imageUrl, location, area, time } =
            doc.data();
          saves.push({
            id: doc.id,
            user,
            description,
            imageUrl,
            title,
            location,
            area,
            time,
          });
          setSaved(saves);
        });
      });
    }, []);
  
    return (
      <View style={styles.border}>
        <FlatList
          data={saved}
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
                <SavedActivity item={item} setSelectedId={setSelectedId} />
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
  
  export default SavedScreen;
  
  const styles = StyleSheet.create({
    border: {
      marginTop: 40,
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
  