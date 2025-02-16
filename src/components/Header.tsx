import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ProfilePic from '../screen/ProfilePic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCode } from 'country-list';

interface HeaderProps {
  title?: string;
  navigation?:any;
  city?:string;
  country?:string;
};

const Header: React.FC<HeaderProps> = ({title, navigation, city, country}) => {
  const [isNameClick, setIsNameClick] = useState(false);
  const [newName, setNewName] = useState(title);
  const [getName, setName] = useState(title);
  const code = getCode('Japan');

 const onLogout=async ()=>{
   try {
    //  await AsyncStorage.removeItem('Email')
    //  await AsyncStorage.removeItem('Password')
      navigation.navigate('LogIn')
   } catch (error) {
     console.log(error)
     console.log('Bye')
   }
 }


 const updateProfileNameFunc = async (data:any)=>{
  return data.map(item=>{
    return{
      ...item,
      name: newName
    }
  })
 }

 const updateProfileName = async()=>{
  try {
    setIsNameClick(false);
    const jsonData = await AsyncStorage.getItem('asyncData');
    const data = jsonData ? JSON.parse(jsonData) : [];
    const newData = await updateProfileNameFunc(data);
    await AsyncStorage.setItem('asyncData', JSON.stringify(newData));
    const jsonData2 = await AsyncStorage.getItem('asyncData');
    const data2 = jsonData2 ? JSON.parse(jsonData2) : [];
    setName(data2?.[0]?.name)
  } catch (e) {}
 }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Image
        source={require('../assets/cafe.jpg')} 
        style={{height:70, width:50, alignSelf:'center'}}/> */}
      <Text style={styles.title}>Cafe's</Text>
      <Text style={styles.content2} onPress={()=>onLogout()}>LOG OUT</Text>
      <View style={styles.contentView}>
        <View style={styles.subcontentView}>
          <View>
          {!isNameClick?<Text onPress={(e)=>setIsNameClick(true)}style={styles.content1}>{getName}</Text>:
          <View style={{flexDirection:'row'}}>
          <TextInput placeholder="Change Your name"  onChangeText={setNewName}></TextInput>
          <TouchableOpacity onPress={()=>{updateProfileName()}}>
          <Text style={{paddingLeft:8, fontWeight:'700'}}>Save</Text>
          </TouchableOpacity>
          </View>}
          <Text style={styles.content3}>{city}</Text>
          </View>
          <ProfilePic/>
        </View>
      </View>
      
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
  container:{
    borderRadius:50,
  },
  title:{
     textAlign:'center',
     fontWeight:'500',
     color:'#DC7633',
     fontSize:32,
     fontStyle:'normal',
  },
  contentView:{
    backgroundColor:'lightgrey',
    marginHorizontal:8,
    marginTop:8,
    padding:12,
    borderRadius:20
  },
  subcontentView:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  content1:{
    fontWeight: '700',
    fontSize:16,
    marginTop:4,
    
  },
  content2:{
    color:'white',
    fontWeight: '700',
    fontSize:14,
    textAlign:'right',
    marginHorizontal:16,
    marginBottom:8
  },
  content3:{
    fontSize:16,
    marginTop:8,
  },
})