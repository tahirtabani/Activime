import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from './Chat';
import HomeScreen from './HomeScreen';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostScreen from './PostScreen';

const Tab = createBottomTabNavigator();
const homePic = require('../../Images/Home.png');
const searchPic = require('../../Images/search.png');
const postPic = require('../../Images/plus.png');
const profilePic = require('../../Images/user.png');
const chatPic = require('../../Images/chat.png');

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 35,
        backgroundColor: '#446E80',
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        // style: {
        //   postion: "absolute",
        //   bottom: 25,
        //   left: 20,
        //   right: 20,
        //   backgroundColor: "#FFFFFF",
        //   borderRadius: 15,
        //   height: 90,
        //   ...styles.shadow,
        // },
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
              }}
            >
              <Image
                source={homePic}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#3F3947' : '#446E80',
                }}
              />
              <Text
                style={{
                  height: 35,
                  color: focused ? '#3F3947' : '#446E80',
                  fontSize: 12,
                }}
              >
                HOME
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='Search'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
              }}
            >
              <Image
                source={searchPic}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#3F3947' : '#446E80',
                }}
              />
              <Text
                style={{
                  height: 35,
                  color: focused ? '#3F3947' : '#446E80',
                  fontSize: 12,
                }}
              >
                SEARCH
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='PostScreen'
        component={PostScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={postPic}
              resizeMode='contain'
              style={{
                width: 30,
                height: 30,
                tintColor: '#fff',
              }}
            />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
              }}
            >
              <Image
                source={profilePic}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#3F3947' : '#446E80',
                }}
              />
              <Text
                style={{
                  height: 35,
                  color: focused ? '#3F3947' : '#446E80',
                  fontSize: 12,
                }}
              >
                PROFILE
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
              }}
            >
              <Image
                source={chatPic}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#3F3947' : '#446E80',
                }}
              />
              <Text
                style={{
                  height: 35,
                  color: focused ? '#3F3947' : '#446E80',
                  fontSize: 12,
                }}
              >
                CHAT
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
