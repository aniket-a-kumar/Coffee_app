import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import CoffeeList from '../data/CoffeeData'
import BeansList from '../data/BeansData';
import jestConfig from '../../jest.config';


interface OrderHistoryScreenprops{
  data:any
  orderItems:any
}

const OrderHistoryScreen:React.FC<OrderHistoryScreenprops> = ({navigation}) => {

   const [data, setData]= useState('');
  useEffect(()=>{
    fetch('https://restcountries.com/v3.1/all')
    .then((response)=>response.json())
    .then((json)=>{setData(json)})
  },[])
  console.log('AniketM', data)
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
      <View style={styles.mainview}>
        <View style={{flexDirection:'row', position:'absolute'}}>
         <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <Image source={require('../assets/back.jpg')} 
           style={{width: 30, height: 30, borderRadius:10
           }}/>
         </TouchableOpacity>
         </View>
         <View style={{position:'absolute', alignItems:'center', backgroundColor:'green'}}>
           <Text onPress={()=>{navigation.goBack()}} style={styles.cart}>OrderHistory</Text>
         </View>
      </View>
     </SafeAreaView>
    </ScrollView>
  )
}

export default OrderHistoryScreen

const styles = StyleSheet.create({
  container:{
    backgroundColor:'black',
    flex:1
  },
  mainview:{
    alignItems:'center',
    marginTop: 12,
    flexDirection:'row',
    flex:1,
    backgroundColor:'blue'
  },
  cart:{
    fontSize:24,
    fontWeight:'700',
    color:'white',
  },
})