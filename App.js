
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/screens/LoginScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ChatScreen from "./src/screens/Chat";
import Tabs from "./src/screens/Tabs";
import PostScreen from "./src/screens/PostScreen";
import MapComponent from "./src/screens/MapComponent";
import MapScreen from "./src/screens/MapScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  const displayLogo = () => {
    return (
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('./Images/activime_logo_white.png')}
        ></Image>
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group options={{ headerStyle: { backgroundColor: '#1C1924' } }}>
          <Stack.Screen
            name='LoginScreen'
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Tabs'
            component={Tabs}
            options={{
              headerStyle: { backgroundColor: '#446E80' },
              headerTintColor: '#fff',
              headerTitle: displayLogo,
            }}
          />
          <Stack.Screen
            name='PostScreen'
            component={PostScreen}
            options={{
              headerStyle: { backgroundColor: '#1C1924' },
              headerTintColor: '#fff',
              headerTitle: displayLogo,
            }}
          />

          <Stack.Screen
            name='HomeScreen'
            component={HomeScreen}
            options={{
              headerStyle: { backgroundColor: '#1C1924' },
              headerTintColor: '#fff',
              headerTitle: displayLogo,
            }}
          />
          <Stack.Screen
            name='RegistrationScreen'
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='ChatScreen'
            component={ChatScreen}
            options={{
              headerStyle: { backgroundColor: '#1C1924' },
              headerTintColor: '#fff',
              headerTitle: displayLogo,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textColor: "white",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    marginVertical: 10,
    width: 200,
    height: 30,
  },

  logo: {
    resizeMode: 'contain',
    flex: 1,
    width: 200,
    height: 50,
    alignItems: 'center',
    marginLeft: 20,
  },
});
