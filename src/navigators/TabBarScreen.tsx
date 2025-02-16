import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screen/HomeScreen';
import PaymentScreen from '../screen/PaymentScreen';
import FavouriteScreen from '../screen/FavouriteScreen';
import OrderHistoryScreen from '../screen/OrderHistoryScreen';
import Icon from 'react-native-vector-icons/AntDesign'
import LoginScreen from '../screen/LoginScreen';
const TabBarScreen = () => {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={({ route }) => ({headerShown :false, 
     tabBarStyle: styles.tabbar , tabBarActiveTintColor: 'tomato',
     tabBarInactiveTintColor: 'gray',
     tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name == 'Home') {
          iconName = focused ? 'home' : 'home';
        } else if (route.name == 'Payment') {
          iconName = focused ? 'home' : 'home';
        } else if (route.name == 'Favourite') {
          iconName = focused ? 'home' : 'home';
        } else if (route.name == 'OrderHistory') {
          iconName = focused ? 'home' : 'home';
        }

        return <Icon name="home" size ={25} color={color} />;
      },})} >
        <Tab.Screen 
         name ="Home" 
         component={HomeScreen}
         ></Tab.Screen>
        <Tab.Screen 
         name ="Payment" 
         component={PaymentScreen}
         ></Tab.Screen>
         <Tab.Screen 
         name ="Favourite" 
         component={FavouriteScreen}
         ></Tab.Screen>
         <Tab.Screen 
         name ="OrderHistory" 
         component={OrderHistoryScreen}
         ></Tab.Screen>
    </Tab.Navigator>
  )
}

export default TabBarScreen

const styles = StyleSheet.create({
    tabbar:{
        backgroundColor:'red',
    }
})