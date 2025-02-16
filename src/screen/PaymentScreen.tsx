import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import CoffeeList from '../data/CoffeeData'
import BeansList from '../data/BeansData';


interface PaymentScreenprops{
  data:any
  orderItems:any
}

const PaymentScreen:React.FC<PaymentScreenprops> = ({navigation}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [index, setIndex]=useState(-1)

  const paymentmethod =[
    {
      name:'Credit Card',
      image: require('../assets/cardlogo.jpg'),
      index:0,
    },
    {
      name:'Wallet',
      image: require('../assets/wallet.jpg'),
      index:1,
      value:'$100'
    },
    {
      name:'Google Pay',
      image: require('../assets/gpay.jpg'),
      index:2,
    },
    {
      name:'Apple Pay',
      image: require('../assets/apay.jpg'),
      index:3,
    },
    {
      name:'Amazon Pay',
      image: require('../assets/amazon.jpg'),
      index:4,
    }
  ]
  const getTotalPrice=async ()=>{
    try {
      const jsonData = await AsyncStorage.getItem('asyncData');
      const data = jsonData ? JSON.parse(jsonData) : [];
      let price =0;
      data?.[0]?.orderItems?.map(e=>
        e?.values?.map(e1=>
          price+=parseFloat(e1?.price)
        )
      )
      setTotalPrice(price);
    } catch (error) {
      console.log('PaymentScreen', error)
    }
   
  }
 
  const onClickingButton =()=>{

    if(index == -1){
      setIndex(0);
    }
    else{
      navigation.navigate('OrderHistory')
    }
  }

  useFocusEffect(
    useCallback(() => {
        getTotalPrice()
    }, [])
  );

  console.log('Aniket', index)

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
      <View style={styles.mainview}>
        <View style={{flex:1/3}}>
         <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <Image source={require('../assets/back.jpg')} 
           style={{width: 30, height: 30, borderRadius:10
           }}/>
         </TouchableOpacity>
        </View>
        <View style={{flex:1/3, alignItems:'center'}}>
          <Text style={styles.cart}>Payment</Text>
        </View>
      </View>
      <View style={{flex:14/15, marginTop:24}}>
       <View style={{flex:9/10}}>
        {paymentmethod.map(e=>(
          <TouchableOpacity style={e.index==index?styles.indexcardview:styles.noncardview} onPress={()=>{setIndex(e.index)}}>
            {(index!=e.index || e.index!=0) && index!=e.index &&<View style={{flexDirection:'row'}}><Image source={e.image} style={{width:30, height:30}}/><Text style={styles.name}>{e.name}</Text></View> }
            {(index==e.index && e.index==0) && 
            <View style={styles.card}>
              <Text style={styles.cardname}>{e.name}</Text>
              <Image source={require('../assets/Card.jpg')} style={{width:315, height:180, borderRadius:10}}/>
            </View>}
            {(index==e.index && e.index!=0) && 
            <View>
              <View style={{flexDirection:'row'}}>
                <Image source={e.image} style={{width:30, height:30}}/>
                <Text style={styles.name}>{e.name}</Text>
              </View>
              {e.index!=1?<View><Text style={styles.description}>Connect your {e.name}</Text></View>:<View style={{flexDirection:'row'}}><Text style={styles.description}>Balance:</Text><Text style={[styles.description,{fontWeight:'700', marginLeft:8} ]}>{e.value}</Text></View>}
            </View>}
          </TouchableOpacity>
          
        ))}
       </View>
       <View style={{flexDirection:'row', borderRadius:30, flex:1/10, marginTop:56, marginHorizontal:16}}>
       <View style={{alignItems:'flex-start', flex:0.3, justifyContent:'center'}}>
        <View style={{flexDirection:'row'}}>
          <View style={{alignSelf:'flex-end'}}>
            <Text style={{color:'#DC7633', fontSize:20, fontWeight:'700'}}>$</Text>
          </View>
          <View style={{flexDirection: 'column', marginLeft:8}}>
            <Text style={{color:'white', fontSize:16, fontWeight:'700'}}>Price</Text>
          <Text style={{color:'white', fontSize:20, fontWeight:'700', marginTop:4}}>{totalPrice}</Text>
        </View>
        </View>
        </View>
        <TouchableOpacity onPress={()=>{onClickingButton()}}style={{backgroundColor:'#DC7633', flex:0.7, borderRadius:20, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
          {paymentmethod.map(e=>e?.index == index?
          <Text style={{color:'white', fontSize:18, fontWeight:'700', paddingVertical:16}}>Pay from {e.name}</Text>:<></>)}
          {index == -1?<Text style={{color:'white', fontSize:18, fontWeight:'700', paddingVertical:16}}>Select payment</Text>:<></>}
        </TouchableOpacity>
       </View>
     </View>
     </SafeAreaView>
    </ScrollView>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
  container:{
    backgroundColor:'black',
    flex:1
  },
  indexcardview:{
    flexDirection:'row',
    borderWidth:1,
    borderRadius:30, 
    backgroundColor: 'transparent', 
    padding:16,
    marginBottom:12, 
    marginLeft:12,
    marginRight:12,
    borderColor:'#DC7633'
  },
  noncardview:{
    flexDirection:'row',
    borderWidth:1,
    borderRadius:30, 
    backgroundColor:'#1B2631', 
    padding:16,
    marginBottom:12, 
    marginHorizontal:12
  },
  name:{
    fontSize:20,
    color:'white',
    fontWeight:'700',
    marginLeft:12,
  },
  description:{
    marginTop:16,
    fontSize:20,
    color:'white',
  },
  cardname:{
    fontSize:20,
    color:'white',
    fontWeight:'700',
    marginBottom:12
  },
  card:{
  },
  cart:{
    fontSize:24,
    fontWeight:'700',
    color:'white'
  },
  mainview:{
    alignItems:'center',
    marginTop: 12,
    flexDirection:'row',
    flex:1/15
  },
})