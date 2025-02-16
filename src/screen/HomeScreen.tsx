import { FlatList, Image, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStore } from '../store/store'
import Header from '../components/Header'
import CoffeeList from '../data/CoffeeData'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TabBarScreen from '../navigators/TabBarScreen'
interface HomeScreenProps{
  navigation?:any,
  route:any
}

const HomeScreen:React.FC<HomeScreenProps> = ({route, navigation}) => {

  const { infoData } = route.params;
  const getAllCoffelist=(data: any)=>{

    let list:any =[];
    for(let i=0;i<data.length;i++){
     if(list[data[i].name]== 'undefined'){
      list[data[i].name]==1;
     }
     else{
       list[data[i].name]++
     }''
    }
    let categories=Object.keys(list);
    categories.unshift('All');
    return categories;
  }
  console.log('Aniket', infoData)

  //  const CoffeeList = useStore((state:any)=>state.CoffeeList);
 const BeansList = useStore((state:any)=>state.BeansList);
  //  console.log('Aniket01', CoffeeList, CoffeeList.length);
  //  console.log('Aniket21', BeansList, BeansList.length);

 const [categories, setCategories] = useState(getAllCoffelist(CoffeeList));
 const [categoryIndex, setCategoryIndex] = useState({
    index:0,
    category: categories[0]
 })
 const getSortedCoffee=(category:any, data: any)=>{

  if(category == 'All'){
   return data;
  }
  return (data.filter((e:any)=>e.name == category))
 }

 const [sorted, setSorted] = useState(getSortedCoffee(categoryIndex.category, CoffeeList));
 const [searchText, setSearchText] = useState('');
 const [refreshing, setRefreshing] = useState(false);
 const [asyncStore, setAsyncStore] = useState(false);

 const name = infoData?.name
 const city = infoData?.city
 const country = infoData?.country

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      // Add new data to the list
      setRefreshing(false);
    }, 500); // Simulate network delay
  };

  return (
    <>
  <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      
    <Header title={name} city={city} country={country} navigation={navigation}/>
    <View style={styles.description}>
      <Text style={styles.descriptionText} onPress={()=>navigation.navigate('Cart')}>Find the best{'\n'}coffee for you</Text>
    </View>
    <View style={{flexDirection:'row', alignContent:'space-between',}}>
    <View style={{marginHorizontal:12, marginRight:36, marginTop:8, borderRadius:10, backgroundColor:'#FFFFFF',
       flexDirection:'row',  alignItems:'center'}}>
      {!searchText?<Image source={require('../assets/old.png')}
        style={{height:18, width:18, marginLeft:16}}/>:
        <Image source={require('../assets/new.png')}
        style={{height:20, width:20, marginLeft:15,}}/>}
      <TextInput placeholder='Find Your Coffee..' placeholderTextColor='black' 
        style={{backgroundColor:'white', height:40, paddingLeft:8, borderRadius:10, width:300}} 
        value={searchText} 
        onChangeText={(text)=>{setSearchText(text), setSorted(getSortedCoffee(text, CoffeeList))}}>
      </TextInput>
      </View>
      {searchText && <TouchableOpacity style={{alignSelf:'center', marginLeft:-60, paddingTop:8}}>
      <Text style={{fontSize:14, fontWeight:'500'}}onPress={()=>{setSearchText(''), setCategoryIndex({index:0, category:categories[0]})}}>X</Text>
      </TouchableOpacity>}
    </View>
    <ScrollView horizontal>
    <View style={{marginLeft:16, flexDirection:'row', marginTop:12}}>
      {categories.map((e,index)=> (
               <TouchableOpacity style={{alignItems:'center', paddingHorizontal:8}} 
                onPress={(e)=>{setCategoryIndex({index:index, category:categories[index]}), setSorted(getSortedCoffee(categories[index], CoffeeList))}}>
                   {categoryIndex.index == index?<Text style={{fontSize:16, color:'#DC7633'}}>{e}</Text>:<Text style={{fontSize:16, color:'white'}}>{e}</Text>}
                   {categoryIndex.index == index && <View style={{backgroundColor:'#DC7633', height:5, width:5, borderRadius:5, marginTop:4}}/>}
               </TouchableOpacity> 
           )// missing closing brace of map function
      )}
    </View>
    </ScrollView>
    <View style={{marginLeft:4}}>
      {sorted && <FlatList
        data={sorted}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>{navigation.navigate('Details', {items: item})}}>
          <View style={{backgroundColor:'#1B2631', marginHorizontal:8, marginTop:24, borderRadius:20, width:155, height:270}}>
            <View style={{ flexDirection:'row', alignSelf:'stretch'}}>
              <Image source={item.imagelink_square} style={{height:130, width:130, margin:12, borderRadius:20}}/>
               <View style={{ flexDirection:'row',  backgroundColor: 'rgba(28, 40, 51, 0.4)', height:22, width:55,
                 marginLeft:-67, borderBottomLeftRadius:20, marginTop:12, paddingLeft:8, paddingTop:2
                }}>
                  <Text style={{color:'#DC7633', fontSize:16, fontWeight:'700'}}>*</Text>
                  <Text style={{color:'white', fontSize:16, marginLeft:4, fontWeight:'700'}}>{item.average_rating}</Text>
               </View>
            </View>
            <View style={{margin:12, marginTop:4}}>
              <Text style={{color:'white', fontSize:16}}>{item.name}</Text>
              <Text style={{color:'white', marginTop:8}}>{item.roasted}</Text>
            </View>
            <View style={{margin:12, marginTop:4, flexDirection:'row', justifyContent:'space-between'}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={{color:'#DC7633', fontSize:16, fontWeight:'700'}}>$</Text>
              <Text style={{color:'white', fontSize:16, marginLeft:4, fontWeight:'700'}}>{item.prices[1].price}</Text>
              </View>
              <View style={{backgroundColor:'#DC7633', paddingVertical:6, paddingHorizontal:10, borderRadius:8}}>
                <Text style={{textAlign:'right', color:'white', fontSize:16}}>+</Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>
        )}
      />}
      {sorted.length==0 && 
        <ScrollView scrollEnabled={false}>
          <View style={{backgroundColor:'grey', width:'95%', marginHorizontal:12, borderRadius:10, height:200, justifyContent:'center', marginTop:16}}>
            <Text style={{color:'white', textAlign:'center', fontSize:20}}>No Search available.</Text>
          </View>
        </ScrollView>
      }
      <Text style={{color:'white', fontSize:18, marginLeft:12, marginTop:16}}>Coffee beans</Text>
      <FlatList
        data={BeansList}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>{navigation.navigate('Details', {items: item})}}>
          <View style={{backgroundColor:'#1B2631', marginHorizontal:8, marginTop:16, borderRadius:20, width:155, height:270}}>
            <View style={{ flexDirection:'row', alignSelf:'stretch'}}>
              <Image source={item.imagelink_square} style={{height:130, width:130, margin:12, borderRadius:20}}/>
               <View style={{ flexDirection:'row',  backgroundColor: 'rgba(28, 40, 51, 0.4)', height:22, width:55,
                 marginLeft:-67, borderBottomLeftRadius:20, marginTop:12, paddingLeft:8, paddingTop:2
                }}>
                  <Text style={{color:'#DC7633', fontSize:16, fontWeight:'700'}}>*</Text>
                  <Text style={{color:'white', fontSize:16, marginLeft:4, fontWeight:'700'}}>{item.average_rating}</Text>
               </View>
            </View>
            <View style={{margin:12, marginTop:4}}>
              <Text style={{color:'white', fontSize:16}}>{item.name}</Text>
              <Text style={{color:'white', marginTop:8}}>{item.roasted}</Text>
            </View>
            <View style={{margin:12, marginTop:4, flexDirection:'row', justifyContent:'space-between'}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={{color:'#DC7633', fontSize:16, fontWeight:'700'}}>$</Text>
              <Text style={{color:'white', fontSize:16, marginLeft:4, fontWeight:'700'}}>{item.prices[1].price}</Text>
              </View>
              <View style={{backgroundColor:'#DC7633', paddingVertical:6, paddingHorizontal:10, borderRadius:8}}>
                <Text style={{textAlign:'right', color:'white', fontSize:16}}>+</Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>
        )}
      />
    </View>
    
  </ScrollView>
  </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black'
  },
  description:{
    marginTop:16,
    marginHorizontal:12,
  },
  descriptionText:{
   fontWeight:'700',
   fontSize:24,
   color:'white'
  },
  title:{
    textAlign:'center',
    fontWeight:'500',
    color:'#DC7633',
    fontSize:32,
    fontStyle:'normal',
 },
 content2:{
  color:'white',
  fontWeight: '700',
  fontSize:14,
  textAlign:'right',
  marginHorizontal:16,
  marginBottom:8
},
})

