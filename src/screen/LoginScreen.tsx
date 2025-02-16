import { Alert, Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'react-native-localize';
import DeviceInfo from 'react-native-device-info';
// import { getCode } from 'country-list';

interface LoginScreenProps{
    navigation?:any
}

const LoginScreen:React.FC<LoginScreenProps> = ({navigation}) => {
    
    const [infoData, setInfoData] = useState<any>();
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrongPassword, setWrongPassword] = useState(false)
    const [seePassword, setSeePassword] = useState(false)
    const [isChecked, setIsChecked] = useState(false);
    const [changeEmailText, setChangeEmailText] = useState('Empty');
    const [changePasswordText, setChangePasswordText] = useState('Empty');
    const [isRegistration, setIsRegistration] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [key, setKey] = useState(-1);
    const [textEmail, onChangeTextEmail] = React.useState('');
    const [textPassword, onChangeTextPassword] = React.useState('');
    const windowHeight = Dimensions.get('window').height;
    const passwordRef = useRef(null);

    const data=['Last Name', 'First Name', 'City', 'Country', 'Email' , 'Password'];

      const initialData = [
        {
          username: 'temp@gmail.com',
          password: '12345',
          name:'Temp',
          city: 'X',
          country: 'Y',
          orderItems:[
            // {
            //   name: "Dummy",
            //   id: "C0",
            //   image:'Image',
            //   roasted:'Roasted',
            //   special_ingredient: 'special_ingredient',
            //   values:[
            //     {
            //     size: "S",
            //     price: "$4.5",
            //     value: 0
            //   },
            //   {
            //     size: "M",
            //     price: "$5.5",
            //     value: 0
            //   },
            //   {
            //     size: "L",
            //     price: "$6.5",
            //     value: 0
            //   }
            //   ]
            // }
          ]
        }
      ]

      const func=async()=>{
        try {
          const jsonData = await AsyncStorage.getItem('asyncData');
          if(!jsonData){
             await AsyncStorage.setItem('asyncData', JSON.stringify(initialData));
             setInfoData(initialData);

          }
          else{
            const data = jsonData ? JSON.parse(jsonData) : [];
            setInfoData(data);

          }
        } catch (error) {
          console.log('LogInScreen', error)
        }
      }
    
      useEffect(()=>{
         func()
      },[isRegistration])

      const updateNewRegisterfunc =async(data:any)=>{
        const info={
          username: email,
          password: password,
          name: firstName+' '+lastName,
          city: city,
          country: country,
          orderItems:[]
        }
        data.push(info);
        return data;
      }

    const updateNewRegister =async()=>{
      try {
        const jsonData = await AsyncStorage.getItem('asyncData');
        const data = jsonData ? JSON.parse(jsonData) : [];
        const isEmailPresent= data?.find(e=>e.username == email);
        setLastName('')
        setFirstName('')
        setEmail('')
        setCity('')
        setPassword('')
        setCountry('')
          if(isEmailPresent){
            Alert.alert('This Email is already registered')
            
          }
          else{
            const newData = await updateNewRegisterfunc(data);
            await AsyncStorage.setItem('asyncData', JSON.stringify(newData));
            setIsRegistration(false)
          }
      } catch (error) {
        console.log('updateNewRegister', error)
      }

    }

    const onLogin=async ()=>{
       const isEmailPresent= infoData?.find(e=>e.username == changeEmailText);
      //  if(isEmailPresent){
      //    if(isEmailPresent?.username==changeEmailText && isEmailPresent?.password==changePasswordText){
      //     await AsyncStorage.setItem('asyncSubData', JSON.stringify(isEmailPresent));
      //     onChangeTextEmail('')
      //     onChangeTextPassword('')
      //     setChangeEmailText('Empty')
      //     setChangePasswordText('Empty')
      //     navigation.navigate('Home', {
      //       infoData: isEmailPresent
      //     });
      //    }
      //    else if(isEmailPresent?.username==changeEmailText && isEmailPresent?.password!=changePasswordText){
      //     setWrongPassword(true);
      //     Alert.alert('Password is wrong')
      //    }
      //  }
      //  else if(changeEmailText =='Empty' && changePasswordText=='Empty'){
      //   Alert.alert('Please input Email & Password')
      //  }
      //  else if(changeEmailText =='Empty'){
      //   Alert.alert('Please input Email')
      //  }
      //  else if(changePasswordText=='Empty'){
      //   Alert.alert('Please input Password')
      //  }
      //  else{
      //   Alert.alert('Email is not found.\n Please sign in.')
      //  }
      navigation.navigate('Home', {
              infoData: isEmailPresent
            });
    }
    const onSignin=async ()=>{
        try {
          const isEmailPresent= infoData?.find(e=>e.username == changeEmailText);
          onChangeTextEmail('')
          onChangeTextPassword('')
          setChangeEmailText('Empty')
          setChangePasswordText('Empty')
          if(isEmailPresent){
            Alert.alert('This Email is already registered')
          }
          else{
            setIsRegistration(true)
          }
        } catch (error) {
            console.log(error);
        }
    }

    const handleInputChange = (input:any, index:any) => {
      if (index === 0) {
        setLastName(input);
      } else if (index === 1) {
        setFirstName(input);
      } else if (index === 2) {
        setCity(input);
      }else if (index === 3) {
        setCountry(input);
      } else if (index === 4) {
        setEmail(input);
      }else{
        setPassword(input);
      }
    };
    const handleValueChange = (index:any) => {
      if (index === 0) {
        return lastName;
      } else if (index === 1) {
        return firstName;
      } else if (index === 2) {
        return city;
      }else if (index === 3) {
        return country;
      } else if (index === 4) {
        return email.toLocaleLowerCase();
      }else{
        return password;
      }
    };


    const renderItem = ({ item, index }:any) => (
      <View style={{}}>
        <Text style={isFocused && index == key? [styles.inputText, { color:'blue'}] : styles.inputText}>{item}</Text>
        <TextInput style={isFocused && index == key? [styles.inputs, { borderColor: 'blue', borderWidth:2}] : styles.inputs}
        onFocus={() => (setIsFocused(true), setKey(index))}
        onChangeText={(input) => handleInputChange(input, index)}
        value={handleValueChange(index)}
        />
      </View>
    );

  return (
    <SafeAreaView style={{backgroundColor:'lightgrey', flex:1, justifyContent:'center'}}>
      <View style={{}}>
       <View>
        <Text style={{ alignSelf:'center', fontSize:28, fontWeight:'700'}}>Welcome </Text>
        <Text style={{ alignSelf:'center', fontSize:24, fontWeight:'700'}}>to</Text>
        <Text style={{ alignSelf:'center', fontSize:28, fontWeight:'700'}}>Cafe...</Text>
        <Text style={{marginLeft:24, marginTop:16, fontSize:16}}>Email</Text>
        <TextInput style={{marginHorizontal:24, marginTop:4, height:50, backgroundColor:'white', 
          paddingLeft:8, borderColor:'black', borderRadius:10, borderWidth:1, textTransform: 'none',}}
          value={textEmail.toLocaleLowerCase()}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          onChangeText={(input)=>(setChangeEmailText(input), onChangeTextEmail(input))}/>
        <Text style={{marginLeft:24, marginTop:16, fontSize:16}}>Password</Text>
        <TextInput style={{marginHorizontal:24, marginTop:4, height:50, backgroundColor:'white', 
          paddingLeft:8, borderColor:'black', borderRadius:10, borderWidth:1}}
          value={textPassword}
          ref={passwordRef}
          returnKeyType="done"
          onChangeText={(input)=>(setChangePasswordText(input), onChangeTextPassword(input))}
          secureTextEntry={wrongPassword?false:true}/>

          <View style={{flexDirection:'row', marginLeft:16, marginTop:8, alignItems:'center'}}>

          <Text style={{fontSize:16}}>show password</Text>
          </View>

       </View>
       {/* <CheckBox
          value={isChecked}
          onValueChange={()=>{}}
          style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] , backgroundColor:'red'}}/> */}
       <View style={{flexDirection:'row', marginTop:16,
             alignSelf:'center'}}>
            <TouchableOpacity style={{backgroundColor:'#DC7633', borderRadius:10, padding:12}}
            onPress={()=>{onLogin()}}>
               <Text style={{fontSize:20}}>LOG IN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#DC7633', borderRadius:10, padding:12, marginLeft:24}}
            onPress={()=>{onSignin()}}>
               <Text style={{fontSize:20}}>SIGN IN</Text>
            </TouchableOpacity>
       </View>
      </View>
      <TouchableOpacity style={{position:'absolute', width:'100%', top:0, height:windowHeight*0.5}}
      onPress={()=>setIsRegistration(false)}>
      </TouchableOpacity>
      {isRegistration && <View style={{position:'absolute', backgroundColor:'white', width:'100%', bottom:0, paddingTop:12, 
        borderTopLeftRadius:15, borderTopRightRadius:15, maxHeight:windowHeight*0.9}}>
          <View style={{  flex:1, flexDirection:'row', justifyContent:'center'}}>
           <Text style={{ fontSize:20, fontWeight:'700', marginBottom:12 }}>Please input the details</Text>
          </View>
          <TouchableOpacity style={{marginTop:12, flex:1, alignItems:'flex-end', width:'100%', position:'absolute', paddingRight:22}}
          onPress={()=>setIsRegistration(false)}>
           <Text style={{ color:'red', fontSize:16}}>X</Text>
          </TouchableOpacity>
        
        <ScrollView>
          <FlatList
          data={data}
          renderItem={renderItem}
          />
          <View style={{marginVertical:32}}>
             <Text style={{fontSize:20, textAlign:'center', color:'blue'}} onPress={()=>(updateNewRegister())}>Register</Text>
          </View>
        </ScrollView>
      </View>}
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  inputs:{
    marginHorizontal:24,
    marginTop:4, 
    height:50, 
    backgroundColor:'white', 
    paddingLeft:8, 
    borderColor:'black', 
    borderRadius:10, 
    borderWidth:1
  },
  inputText:{
    marginLeft:24, 
    marginTop:16, 
    fontSize:16
  }
})


