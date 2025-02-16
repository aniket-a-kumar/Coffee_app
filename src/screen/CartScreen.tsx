import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import CoffeeList from '../data/CoffeeData'
import BeansList from '../data/BeansData';
import Toast from 'react-native-toast-message';


interface CartScreenprops{
  data:any
  orderItems:any
}

const CartScreen:React.FC<CartScreenprops> = ({navigation}) => {

  const [data, setData] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [updateData, setUpdateData] = useState();
  
  const showToast = () => {
    console.log('toast')
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'Item has been updated successfully!',
    });
  };

  const updateValuefunc = async(operation:string, size:string, id:string)=>{
    try {
      const jsonData = await AsyncStorage.getItem('asyncData');
      const data = jsonData ? JSON.parse(jsonData) : [];
      return data.map(user=>{
        return{
           ...user,
           orderItems: user.orderItems.map(item=>{
               if(item?.id == id){
                   return{
                    ...item,
                    values: item.values.map(res=>{
                         if(res?.size == size && operation == 'add'){
                          return{
                            ...res,
                            value: res?.value+1
                          }
                         }
                         else if(res?.size == size && operation == 'sub' && res?.value == 1){
                          return;
                         }
                         else if(res?.size == size && operation == 'sub'){
                          return{
                            ...res,
                            value: res?.value-1
                          }
                         }
                        return res;
                    })
                   }
               }
               return item;
           })
       };
      })
    } catch (error) {
      console.log('CartScreen', error)
    }
  }

  const refactorValue = (data:any)=>{
   
    return data?.[0]?.orderItems?.map(user=>{
      return{
        ...user,
        values: user?.values?.filter(item=>item!=null)
      }
    })
  }


  const updateValue=async (operation:string, size:string, id:string)=>{
    try {
    const data= await updateValuefunc(operation, size, id);
    console.log('Anni1', JSON.stringify(data))
    const refactorData = refactorValue(data);
    console.log('Anni2', JSON.stringify(refactorData))
    setUpdateData(refactorData);
    setData(refactorData)
    } catch (error) {
      console.log('CartScreenUpdateValuea', error)
    }
  }

  const func=async()=>{
    try {
      const jsonData = await AsyncStorage.getItem('asyncData');
      const data = jsonData ? JSON.parse(jsonData) : [];
      console.log('AniketNew', JSON.stringify(data))
      setData(data)
    } catch (error) {
      console.log('CartScreen', error)
    }
   
  }

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
      console.log('CartScreen', error)
    }
   
  }

  useFocusEffect(
    useCallback(() => {
        func()
        getTotalPrice()
    }, [updateData])
);

  return (
    <ScrollView style={styles.container}>
      <Toast /><View style={styles.mainview}>
        <View style={{flex:1/3}}>
         <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <Image source={require('../assets/back.jpg')} 
           style={{width: 30, height: 30, borderRadius:10
           }}/>
         </TouchableOpacity>
        </View>
        <View style={{flex:1/3, alignItems:'center'}}>
          <Text style={styles.cart}>Cart</Text>
        </View>
      </View>
      {data && data?.[0]?.orderItems?.map((e)=>(
        <View style={{flex:1}}>
         {e.type == 'Coffee' ?CoffeeList.map(e1=>(e.id == e1.id?e?.values?.length == 1?
         <View style={styles.singleitem}>
          <View style={{flexDirection:'row'}}>
             <View style={{flex:1/2}}>
             <Image source={e1.imagelink_square} style={{width: 140, height: 150, borderRadius:20}}/>
             </View>
             <View style={{flex:1/1.6, marginLeft:16}}>
               <Text style={{color:'white', fontSize:20}}>{e1.name}</Text>
               <Text style={{color:'white'}}>{e1.special_ingredient}</Text>
               <View style={{marginTop:16, flexDirection:'row'}}>
                <View style={{padding:8, flex:1/2, backgroundColor:'grey', borderRadius:10, alignItems:'center'}}>
                  <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{e.values[0]?.size}</Text>
                </View>
                <View style={{padding:8,flex:1/2, alignItems:'flex-end', borderRadius:10, flexDirection:'row'}}>
                  <Text style={{color:'#DC7633', fontSize:20, fontWeight:'700'}}>{'$ '}</Text>
                  <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{(e.values?.[0]?.price*e.values[0].value).toFixed(2)}</Text>
                </View>
               </View>
               <View style={{marginTop:16, flexDirection:'row', flex:1}}>
                <TouchableOpacity style={{padding:8, backgroundColor:'grey', borderRadius:10, alignItems:'center', justifyContent:'center', flex:1/6}}>
                  <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>+</Text>
                </TouchableOpacity>
                <View style={{flex:1/6}}/>
                <View style={{padding:8, borderColor:'#DC7633', borderWidth:1, borderRadius:10, alignItems:'center', flex:2/6}}>
                  <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{e.values[0]?.value}</Text>
                </View>
                <View style={{flex:1/6}}/>
                <TouchableOpacity style={{padding:8, backgroundColor:'grey', borderRadius:10, alignItems:'center', flex:1/6}}>
                  <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>-</Text>
                </TouchableOpacity>
               </View>
             </View>
          </View>
  
         </View>:
         <View style={styles.multipleitems}>
          <View style={{flexDirection:'column'}}>
            <View style={{flex:1/2}}>
              <View style={{flexDirection:'row'}}>
                <Image source={e1.imagelink_square} style={{width: 100, height: 100, borderRadius:20}}/>
                <View style={{marginLeft:20}}>
                  <Text style={{color:'white', fontSize:20}}>{e1.name}</Text>
                  <Text style={{color:'white'}}>{e1.special_ingredient}</Text>
                  <View style={{backgroundColor:'grey', marginTop:12, padding:12, borderRadius:10}}>
                  <Text style={{color:'white'}}>{e1.roasted}</Text>
                  </View>
                </View>
              </View>
        
            </View>
            <View style={{flex:1/2, marginTop:12, flexDirection:'column'}}>
            {e?.values?.map(e=>e?.size == 'S' ?
            <View style={{flexDirection:'row', flex:1, marginBottom:12}}>
            <View style={{flex:1/2, flexDirection:'row'}}>
              <View style={{flex:1/2, backgroundColor:'grey', alignItems:'center', padding:8, borderRadius:10}}>
                 <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{e?.size}</Text>
              </View>
                <View style={{flex:1/2, alignItems:'center',justifyContent:'center', flexDirection:'row', marginLeft:8}}>
                  <Text style={{color:'#DC7633', fontSize:20, fontWeight:'700'}}>{'$ '}</Text>
                  <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{(e?.price*e?.value).toFixed(2)}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row', flex:1/2, marginLeft:8}}>
              <TouchableOpacity onPress={()=>{updateValue('add', 'S', e1.id)}} style={{padding:8, backgroundColor:'grey', borderRadius:10, alignItems:'center', justifyContent:'center', flex:1/6}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>+</Text>
              </TouchableOpacity>
              <View style={{flex:1/6}}/>
              <View style={{padding:8, borderColor:'#DC7633', borderWidth:1, borderRadius:10, alignItems:'center', flex:2/6}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{e.value}</Text>
              </View>
              <View style={{flex:1/6}}/>
              <TouchableOpacity onPress={()=>{updateValue('sub', 'S', e1.id)}} style={{padding:8, backgroundColor:'grey', borderRadius:10, alignItems:'center', flex:1/6}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>-</Text>
              </TouchableOpacity>
             </View>
          </View>:<></>)}
            {e?.values?.map(e=>e?.size == 'M' ?
            <View style={{flexDirection:'row', flex:1, marginBottom:12}}>
            <View style={{flex:1/2, flexDirection:'row'}}>
              <View style={{flex:1/2, backgroundColor:'grey', alignItems:'center', padding:8, borderRadius:10}}>
                 <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{e.size}</Text>
              </View>
                <View style={{flex:1/2, alignItems:'center',justifyContent:'center', flexDirection:'row', marginLeft:8}}>
                  <Text style={{color:'#DC7633', fontSize:20, fontWeight:'700'}}>{'$ '}</Text>
                  <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{(e.price*e.value).toFixed(2)}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row', flex:1/2, marginLeft:8}}>
              <TouchableOpacity style={{padding:8, backgroundColor:'grey', borderRadius:10, alignItems:'center', justifyContent:'center', flex:1/6}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>+</Text>
              </TouchableOpacity>
              <View style={{flex:1/6}}/>
              <View style={{padding:8, borderColor:'#DC7633', borderWidth:1, borderRadius:10, alignItems:'center', flex:2/6}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{e.value}</Text>
              </View>
              <View style={{flex:1/6}}/>
              <TouchableOpacity style={{padding:8, backgroundColor:'grey', borderRadius:10, alignItems:'center', flex:1/6}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>-</Text>
              </TouchableOpacity>
             </View>
          </View>:<></>)}
          {e?.values?.map(e=>e?.size == 'L' ?
            <View style={{flexDirection:'row', flex:1, marginBottom:12}}>
            <View style={{flex:1/2, flexDirection:'row'}}>
              <View style={{flex:1/2, backgroundColor:'grey', alignItems:'center', padding:8, borderRadius:10}}>
                 <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{e.size}</Text>
              </View>
                <View style={{flex:1/2, alignItems:'center',justifyContent:'center', flexDirection:'row', marginLeft:8}}>
                  <Text style={{color:'#DC7633', fontSize:20, fontWeight:'700'}}>{'$ '}</Text>
                  <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{e.price*(e.value)}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row', flex:1/2, marginLeft:8}}>
              <TouchableOpacity style={{padding:8, backgroundColor:'grey', borderRadius:10, alignItems:'center', justifyContent:'center', flex:1/6}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>+</Text>
              </TouchableOpacity>
              <View style={{flex:1/6}}/>
              <View style={{padding:8, borderColor:'#DC7633', borderWidth:1, borderRadius:10, alignItems:'center', flex:2/6}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{e.value}</Text>
              </View>
              <View style={{flex:1/6}}/>
              <TouchableOpacity style={{padding:8, backgroundColor:'grey', borderRadius:10, alignItems:'center', flex:1/6}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>-</Text>
              </TouchableOpacity>
             </View>
          </View>:<></>)}
            </View>
          </View>
          </View>:<></>))
         :BeansList.map(e1=>(e?.id == e1?.id?e?.values?.length == 1?
          <View style={styles.singleitem}>
          <View style={{flexDirection:'row'}}>
             <View style={{flex:1/2}}>
             <Image source={e1.imagelink_square} style={{width: 140, height: 150, borderRadius:20}}/>
             </View>
             <View style={{flex:1/1.6, marginLeft:16}}>
               <Text style={{color:'white', fontSize:20}}>{e1.name}</Text>
               <Text style={{color:'white'}}>{e1.special_ingredient}</Text>
               <View style={{marginTop:16, flexDirection:'row'}}>
                <View style={{padding:8, flex:1/1.5, backgroundColor:'grey', borderRadius:10, alignItems:'center'}}>
                  <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{e.values[0]?.size}</Text>
                </View>
                <View style={{padding:8,flex:1/2, alignItems:'flex-end', borderRadius:10, flexDirection:'row'}}>
                  <Text style={{color:'#DC7633', fontSize:20, fontWeight:'700'}}>{'$ '}</Text>
                  <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{e.values[0]?.price*e.values[0]?.value}</Text>
                </View>
               </View>
               <View style={{marginTop:16, flexDirection:'row', flex:1}}>
                <TouchableOpacity style={{padding:8, backgroundColor:'grey', borderRadius:10, alignItems:'center', justifyContent:'center', flex:1/6}}>
                  <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>+</Text>
                </TouchableOpacity>
                <View style={{flex:1/6}}/>
                <View style={{padding:8, borderColor:'#DC7633', borderWidth:1, borderRadius:10, alignItems:'center', flex:2/6}}>
                  <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{e.values[0]?.value}</Text>
                </View>
                <View style={{flex:1/6}}/>
                <View style={{padding:8, backgroundColor:'grey', borderRadius:10, alignItems:'center', flex:1/6}}>
                  <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>-</Text>
                </View>
               </View>
             </View>
          </View>
  
         </View>:
         <View style={styles.multipleitems}>
          <View style={{flexDirection:'column'}}>
            <View style={{flex:1/2}}>
              <View style={{flexDirection:'row'}}>
                <Image source={e1.imagelink_square} style={{width: 100, height: 100, borderRadius:20}}/>
                <View style={{marginLeft:20}}>
                  <Text style={{color:'white', fontSize:20}}>{e1.name}</Text>
                  <Text style={{color:'white'}}>{e1.special_ingredient}</Text>
                  <View style={{backgroundColor:'grey', marginTop:12, padding:12, borderRadius:10}}>
                  <Text style={{color:'white'}}>{e1.roasted}</Text>
                  </View>
                </View>
              </View>
        
            </View>
            <View style={{flex:1/2, marginTop:12, flexDirection:'column'}}>
            {e?.values?.map(e=>e?.size == '250gm' ?
            <View style={{flexDirection:'row', flex:1, marginBottom:12}}>
            <View style={{flex:1/2, flexDirection:'row'}}>
              <View style={{flex:1/1.5, backgroundColor:'grey', alignItems:'center', padding:8, borderRadius:10}}>
                 <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{e.size}</Text>
              </View>
                <View style={{flex:1/2, alignItems:'center',justifyContent:'center', flexDirection:'row', marginLeft:8}}>
                  <Text style={{color:'#DC7633', fontSize:20, fontWeight:'700'}}>{'$ '}</Text>
                  <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{e.price*(e.value)}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row', flex:1/2, marginLeft:8}}>
              <TouchableOpacity style={{padding:8, backgroundColor:'grey', borderRadius:10, alignItems:'center', justifyContent:'center', flex:1/6}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>+</Text>
              </TouchableOpacity>
              <View style={{flex:1/6}}/>
              <View style={{padding:8, borderColor:'#DC7633', borderWidth:1, borderRadius:10, alignItems:'center', flex:2/6}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{e.value}</Text>
              </View>
              <View style={{flex:1/6}}/>
              <TouchableOpacity style={{padding:8, backgroundColor:'grey', borderRadius:10, alignItems:'center', flex:1/6}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>-</Text>
              </TouchableOpacity>
             </View>
          </View>:<></>)}
            {e?.values?.map(e=>e?.size == '500gm' ?
            <View style={{flexDirection:'row', flex:1, marginBottom:12}}>
            <View style={{flex:1/2, flexDirection:'row'}}>
              <View style={{flex:1/1.5, backgroundColor:'grey', alignItems:'center', padding:8, borderRadius:10}}>
                 <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{e.size}</Text>
              </View>
                <View style={{flex:1/2, alignItems:'center',justifyContent:'center', flexDirection:'row', marginLeft:8}}>
                  <Text style={{color:'#DC7633', fontSize:20, fontWeight:'700'}}>{'$ '}</Text>
                  <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{e.price*(e.value)}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row', flex:1/2, marginLeft:8}}>
              <TouchableOpacity style={{padding:8, backgroundColor:'grey', borderRadius:10, alignItems:'center', justifyContent:'center', flex:1/6}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>+</Text>
              </TouchableOpacity>
              <View style={{flex:1/6}}/>
              <View style={{padding:8, borderColor:'#DC7633', borderWidth:1, borderRadius:10, alignItems:'center', flex:2/6}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{e.value}</Text>
              </View>
              <View style={{flex:1/6}}/>
              <TouchableOpacity style={{padding:8, backgroundColor:'grey', borderRadius:10, alignItems:'center', flex:1/6}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>-</Text>
              </TouchableOpacity>
             </View>
          </View>:<></>)}
          {e?.values?.map(e=>e?.size == '1Kg' ?
            <View style={{flexDirection:'row', flex:1, marginBottom:12}}>
            <View style={{flex:1/2, flexDirection:'row'}}>
              <View style={{flex:1/2, backgroundColor:'grey', alignItems:'center', padding:8, borderRadius:10}}>
                 <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{e.size}</Text>
              </View>
                <View style={{flex:1/2, alignItems:'center',justifyContent:'center', flexDirection:'row', marginLeft:8}}>
                  <Text style={{color:'#DC7633', fontSize:20, fontWeight:'700'}}>{'$ '}</Text>
                  <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{e.price*(e.value)}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row', flex:1/2, marginLeft:8}}>
              <TouchableOpacity style={{padding:8, backgroundColor:'grey', borderRadius:10, alignItems:'center', justifyContent:'center', flex:1/6}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>+</Text>
              </TouchableOpacity>
              <View style={{flex:1/6}}/>
              <View style={{padding:8, borderColor:'#DC7633', borderWidth:1, borderRadius:10, alignItems:'center', flex:2/6}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>{e.value}</Text>
              </View>
              <View style={{flex:1/6}}/>
              <TouchableOpacity onPress={()=>{console.log('Aniket')}} style={{padding:8, backgroundColor:'grey', borderRadius:10, alignItems:'center', flex:1/6}}>
                <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>-</Text>
              </TouchableOpacity>
             </View>
          </View>:<></>)}
            </View>
          </View>
          </View>:<></>))}
        </View>
      )
    )}
    <View style={{flexDirection:'row', marginTop:24, marginHorizontal:12,}}>
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
      <TouchableOpacity onPress={()=>{navigation.navigate('Payment')}}style={{backgroundColor:'#DC7633', flex:0.7, borderRadius:20, alignItems:'center', justifyContent:'center'}}>
          <Text style={{color:'white', fontSize:18, fontWeight:'700', paddingVertical:16}}>Pay</Text>
      </TouchableOpacity>
    </View>
    <Toast/>
    </ScrollView>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container:{
    backgroundColor:'black'
  },
  cart:{
    fontSize:24,
    fontWeight:'700',
    color:'white'
  },
  mainview:{
    alignItems:'center',
    marginTop: 32,
    flex:1,
    flexDirection:'row'
  },
  singleitem:{
    backgroundColor:'#1B2631',
    borderRadius:20,
    marginTop:20,
    marginHorizontal:12,
    padding:16,
    flex:1
  },
  multipleitems:{
    borderRadius:20,
    marginTop:20,
    marginHorizontal:12,
    padding:16,
    backgroundColor:'#1B2631',
    flex:1
  }
})