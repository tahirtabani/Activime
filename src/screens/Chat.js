
import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from 'react';

import { StyleSheet, TouchableOpacity, Text,  View , ScrollView , Button } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection ,getDocs, doc ,addDoc , orderBy , query , onSnapshot , setDoc , snapshotEqual} from 'firebase/firestore';
import { firebase , auth , db} from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Chat = ({navigation}) => {
    const [messages, setMessages] = useState([]);   
    const [refresh, setRefresh] = useState(false);   
    
    const onSignOut = () => {
	signOut(auth).catch(error => console.log('Error logging out: ', error));
    };

    useLayoutEffect(() => {
	navigation.setOptions({
	    headerRight: () => (
		<TouchableOpacity
		    style={{
			marginRight: 10
		    }}
		    onPress={onSignOut}
		>
		    <Text>Logout</Text>
		</TouchableOpacity>
	    )
	});
    }, [navigation]);

    useEffect(() => {
	if (!(auth?.currentUser?.email)){
	    setTimeout( () => {
		setRefresh(!refresh);
	    } , 1000);
	}
    }, [refresh]);
   
    useEffect(() => {
	const collectionRef = collection(db, 'chats');
	const q = query(collectionRef, orderBy('createdAt', 'desc'));

	const unsubscribe = onSnapshot(q, querySnapshot => {
	    setMessages(
		querySnapshot.docs.map(doc => ({
		    _id: doc.data()._id,
		    createdAt: doc.data().createdAt.toDate(),
		    text: doc.data().text,
		    user: doc.data().user
		}))
	    );
	});

	return () => unsubscribe();
    }, []);


    const onSend = useCallback((messages = []) => {
	setMessages(previousMessages =>
	    GiftedChat.append(previousMessages, messages)
	);
	const { _id, createdAt, text, user } = messages[0];    
	var myCreatedAt = firebase.firestore.Timestamp.fromDate(new Date());
	addDoc(collection(db, 'chats'), {
	    _id,
	    myCreatedAt,
	    text,
	    user
	}).catch( e => {
		console.log(e);
	});
    }, []);

    return (
	auth?.currentUser?.email  ?
	     (	
   	<GiftedChat  messages={messages} showAvatarForEveryMessage={true}
    onSend={messages => onSend(messages)}
    user={{  _id: auth?.currentUser?.email,  avatar: 'https://i.pravatar.cc/300' }}
	/>) :
	    ( <View style={{ flex: 1 }}><Text>Loading ...</Text></View>
	    ))
    
}

export default Chat;




