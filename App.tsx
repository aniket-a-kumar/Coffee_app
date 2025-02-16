import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import DetailsScreen from './src/screen/DetailsScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import TabBarScreen from './src/navigators/TabBarScreen'
import LoginScreen from './src/screen/LoginScreen'
import HomeScreen from './src/screen/HomeScreen'
import HeaderScreen from './src/components/Header'
import Time from './src/screen/Time'
import CartScreen from './src/screen/CartScreen'
import PaymentScreen from './src/screen/PaymentScreen'
import OrderHistoryScreen from './src/screen/OrderHistoryScreen'

const Stack=createNativeStackNavigator();

const App = () => {
  
  return (
     <NavigationContainer>
       <Stack.Navigator screenOptions={{headerShown:false}}>
       <Stack.Screen
         name= "LogIn"
         component ={LoginScreen}
        >
        </Stack.Screen>
       <Stack.Screen
         name= "Home"
         component ={HomeScreen}
         >
         </Stack.Screen>
       <Stack.Screen
         name= "Header"
         component ={HeaderScreen}
        ></Stack.Screen>
        <Stack.Screen
         name= "Payment"
         component ={PaymentScreen}
        ></Stack.Screen>
         <Stack.Screen
         name= "Cart"
         component ={CartScreen}
        ></Stack.Screen>
        <Stack.Screen
         name= "OrderHistory"
         component ={OrderHistoryScreen}
        ></Stack.Screen>
        <Stack.Screen
         name= "Time"
         component ={Time}
         >
         </Stack.Screen>
       <Stack.Screen
         name= "TabBar"
         component ={TabBarScreen}
         >
         </Stack.Screen>
        <Stack.Screen
         name= "Details"
         component ={DetailsScreen}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})