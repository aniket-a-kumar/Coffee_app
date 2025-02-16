import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
interface DetailsScreenProps{
  navigation?:any
  route:any
}

const DetailsScreen:React.FC<DetailsScreenProps> = ({navigation, route}) => {
  // const [currentDate, setCurrentDate] = useState('');
  // const [currentTime, setCurrentTime] = useState('');
  // useEffect(() => {
  //   let date = new Date();
  //   // Get the current date
  //   const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  //   setCurrentDate(formattedDate);
    
    

  //  const time= setInterval(()=> {
  //    // Get the current time
  //    const date = new Date();
  //    console.log('Aniket',date.getHours(), date.getMinutes(), date.getSeconds())
  //   const formattedTime = date.getHours()+':'+date.getMinutes()
  //   +':'+date.getSeconds();
  //   setCurrentTime(formattedTime);
  //  })

  // }, []);
  const {items}= route.params;
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const size:any =[];
  for(let i=0;i<items.prices.length;i++){
     size.push(items.prices[i].size)
  }
  const [selectSize, setSelectSize] = useState(0)
  const [selectSizevalue, setSelectSizeValue] = useState(size[0])

  const price =items.prices.filter((e)=>(e.size == selectSizevalue))[0].price;

   const updateValue = (data:any) => {
    return data.map(user => {
      return {
        ...user,
        orderItems: user.orderItems.map(item => {
          if (item.id === items.id) { // Specify the item to update
            const size =item?.values?.some((e)=>e.size == selectSizevalue)
            if(!size){
              return {
                ...item,
                values: [...item.values, { size: selectSizevalue, price: price, value: 1  }]
              };
            }
            else{
              return {
                ...item,
                values: item?.values?.map(res => {
                  if(res?.size == selectSizevalue){
                     return {
                      ...res,
                      value: res?.value+1
                     }
                  }
                  return res
                })
              }

            }
          }
          return item;
        })
      };
    });
   };

   const addValue = (data:any) => {
    return data.map(item => {
      return {
        ...item,
        orderItems: [...item.orderItems, { name: items.name, id: items.id, 
          special_ingredient: items.special_ingredient, roasted: items.roasted, 
          image: items.imagelink_square.toString(), temp:2,
          type: items.type, values:[{size: selectSizevalue, price: price,
          value: 1}] }]
      };
    });
   };

   const addToCart=async()=>{
         try {
          const jsonData = await AsyncStorage.getItem('asyncData');
          const data = jsonData ? JSON.parse(jsonData) : [];
          const name =data?.[0]?.orderItems?.some((e)=>e.id == items.id)
          const updatedData = name?updateValue(data):addValue(data);
          await AsyncStorage.setItem('asyncData', JSON.stringify(updatedData));
         } catch (error) {
          console.log('AniketDetailerror', error)
         }
   }

  //  useEffect(()=>{
  //     func()
  //  },[selectSize, selectSizevalue ])



  return (
  <ScrollView style={{backgroundColor:'black', flex:1}}>
    <View style={{marginTop:16, alignSelf:'center', flex:1, backgroundColor:'yellow', width: 400, height: 420}}>
      <Image source={items.imagelink_square} style={{width: '100%', height: '100%', position:'absolute'}}/>
      <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} style={{ flex:1}}>
         <Image source={require('../assets/back.jpg')} 
         style={{width: 30, height: 30, borderRadius:10,
           position:'absolute', top:'10%', left:'5%'
         }}/>
      </TouchableOpacity>
      <View style={{flex:1, backgroundColor:'rgba(28, 40, 51, 0.5)', position:'absolute', top:'76%', width:400, height:100,
        paddingTop:16, borderTopLeftRadius:20, borderTopRightRadius:20}}>
       <View style={{flexDirection:'row', flex:1}}>
        <View style={{paddingLeft:16, flex:1}}>
          <Text style={{fontSize:18, fontWeight:'700'}}>{items.name}</Text>
          <Text style={{marginTop:4}}>{items.special_ingredient}</Text>
        </View>
        <View style={{flex:1, flexDirection:'row',borderRadius:1, alignItems:'center', justifyContent:'center'}}>
          <View style={{backgroundColor:'#1B2631', padding:8, borderRadius:10}}>
            <Text style={{fontSize:14, color:'white', fontWeight:'700'}}>{items.type}</Text>
          </View>
          <View style={{backgroundColor:'#1B2631', padding:8, borderRadius:10, marginLeft:16,}}>
            <Text style={{fontSize:14, fontWeight:'700', color:'white'}}>{items.ingredients}</Text>
          </View>
        </View>
       </View>
       <View style={{flexDirection:'row', flex:1, marginBottom:12,}}>
        <View style={{flexDirection:'row', alignItems:'center', paddingLeft:16, flex:1}}>
          <Text style={{fontWeight:'700', fontSize:30, color:'#DC7633', marginTop:8 }}>*</Text>
          <Text style={{marginLeft:4 ,fontWeight:'700', fontSize:16,}}>{items.average_rating}</Text>
          <Text style={{ marginLeft:4, fontSize:12,}}>({items.ratings_count})</Text>
        </View>
        <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
          <View style={{flexDirection:'row', borderRadius:10,backgroundColor:'#1B2631', }}>
            <Text style={{fontSize:14,padding:8,borderRadius:10, fontWeight:'700', color:'white'}}>{items.special_ingredient}</Text>
            </View>
        </View>
       </View>
      </View>
    </View>
    <View style={{flex:1}}>
    <View style={{marginTop:16, marginHorizontal:12}}>
      <Text style={{color:'white', fontSize:16, fontWeight:'700'}}>Description</Text>
      <Text style={{color:'white', marginTop:8}}>{items.description}</Text>
    </View>

    <View style={{marginTop:16, marginHorizontal:12}}>
      <Text style={{color:'white', fontSize:16, fontWeight:'700'}}>Size</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {size.map((e,index)=> (
               <TouchableOpacity onPress={()=>{setSelectSize(index), setSelectSizeValue(e)}}
                  style={{alignItems:'center', borderWidth:1, borderColor: index==selectSize?'#DC7633':'#1B2631',
                          marginTop:8, paddingHorizontal:8, backgroundColor:'#1B2631', marginRight:28, padding:12, paddingLeft:44, paddingRight:44, borderRadius:10}}>  
                   <Text style={{fontSize:16, color: index==selectSize?'#DC7633':'white'}}>{e}</Text>
               </TouchableOpacity> 
           )
        )}
      </ScrollView>
    </View>
    <View style={{flexDirection:'row', marginTop:24, marginHorizontal:12,}}>
      <View style={{alignItems:'flex-start', flex:0.3, justifyContent:'center'}}>
        <View style={{flexDirection:'row'}}>
          <View style={{alignSelf:'flex-end'}}>
            <Text style={{color:'#DC7633', fontSize:20, fontWeight:'700'}}>$</Text>
          </View>
          <View style={{flexDirection: 'column', marginLeft:8}}>
            <Text style={{color:'white', fontSize:16, fontWeight:'700'}}>Price</Text>
          <Text style={{color:'white', fontSize:20, fontWeight:'700', marginTop:4}}>{price}</Text>
        </View>
        </View>
      </View>
      <TouchableOpacity onPress={()=>addToCart()}style={{backgroundColor:'#DC7633', flex:0.7, borderRadius:20, alignItems:'center', justifyContent:'center'}}>
          <Text style={{color:'white', fontSize:18, fontWeight:'700', paddingVertical:16}}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({})

