// import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'

// const Time = ({navigation}) => {
//     const [currentDateTime, setCurrentDateTime] = useState(new Date());

//     useEffect(() => {
//       const intervalId = setInterval(() => {
//         setCurrentDateTime(new Date());
//       }, 1000);

//       return () => clearInterval(intervalId); // Cleanup interval on component unmount
//     }, []);

//     const hours=`${((currentDateTime.getHours()*30)+((currentDateTime.getMinutes()/60)*30))}deg`;
//     const minutes=`${((currentDateTime.getMinutes())*6+((currentDateTime.getSeconds()/60))*6)}deg`;
//     const seconds=`${(currentDateTime.getSeconds())*6}deg`;

//   return (
//     <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
//       <Text onPress={()=>{navigation.goBack()}}>Back</Text>
//     <View style={{flex:1/3, justifyContent:'center', alignItems:'center'}}><Text>Time</Text></View>
//     <View style={{justifyContent:'center', alignItems:'center', flex:1/3}}>
//     <View style={{alignItems:'center', borderWidth:5, height:307, width:307,
//           justifyContent:'center',borderRadius:300, padding:70, position:'absolute'}}/>
//       <View style={{alignItems:'center', borderWidth:1, height:300, width:300,
//           justifyContent:'center',borderRadius:300, padding:70, position:'absolute'}}>
//           <View style={{position:'absolute'}}>
//              <Text style={{color:'black', fontSize:20, top:-130, transform:[{rotate:'0deg'}]}}>12</Text>
//           </View>
//           <View style={{position:'absolute'}}>
//              <Text style={{color:'black', fontSize:20, top:-115, left:65, transform:[{rotate:'0deg'}]}}>1</Text>
//           </View>
//           <Text style={{color:'black', fontSize:20, left:110, top:-65, transform:[{rotate:'0deg'}]}}>2</Text>
//           <View style={{position:'absolute'}}>
//              <Text style={{color:'black', fontSize:20, right:-130, transform:[{rotate:'0deg'}]}}>3</Text>
//           </View>
//           <View style={{position:'absolute'}}>
//              <Text style={{color:'black', fontSize:20, left:115, top:65, transform:[{rotate:'0deg'}]}}>4</Text>
//           </View>
//           <View style={{position:'absolute'}}>
//              <Text style={{color:'black', fontSize:20, top:115, left:65, transform:[{rotate:'0deg'}]}}>5</Text>
//           </View>
//           <View style={{position:'absolute'}}>
//              <Text style={{color:'black', fontSize:20, top:130, transform:[{rotate:'0deg'}]}}>6</Text>
//           </View>
//           <View style={{position:'absolute'}}>
//              <Text style={{color:'black', fontSize:20, top:115, left:-65, transform:[{rotate:'0deg'}]}}>7</Text>
//           </View>
//           <View style={{position:'absolute'}}>
//              <Text style={{color:'black', fontSize:20, top:65, left:-115, transform:[{rotate:'0deg'}]}}>8</Text>
//           </View>
//           <View style={{position:'absolute'}}>
//              <Text style={{color:'black', fontSize:20, right:130, transform:[{rotate:'0deg'}]}}>9</Text>
//           </View>
//           <View style={{position:'absolute'}}>
//              <Text style={{color:'black', fontSize:20, top:-65, left:-115, transform:[{rotate:'0deg'}]}}>10</Text>
//           </View>
//           <View style={{position:'absolute'}}>
//              <Text style={{color:'black', fontSize:20, top:-115, left:-65, transform:[{rotate:'0deg'}]}}>11</Text>
//           </View>

//           {/* hours */}
//           <View style={{position:'absolute', backgroundColor:'white', transform:[{rotate: hours}]}}>
//              <Text style={{color:'black', fontSize:7, height:140}}>|</Text>
//           </View>
//           <View style={{position:'absolute', height:140 , transform:[{rotate: hours}]}}>
//              <Text style={{fontSize:10, height: '50%',
//               backgroundColor:'black'}}>|</Text>
//           </View>
//           {/* minute */}
//           <View style={{position:'absolute', backgroundColor: 'transparent', transform:[{rotate: minutes}]}}>
//              <Text style={{color:'black', fontSize:7, height:190}}>|</Text>
//           </View>
//           <View style={{position:'absolute', height:190 , transform:[{rotate: minutes}]}}>
//              <Text style={{fontSize:7, height: '50%',
//               backgroundColor:'black'}}>|</Text>
//           </View>
//           <View style={{position:'absolute', backgroundColor:'black', borderRadius:300, width:7, height:7}}/>
//           {/* <View style={{position:'absolute', backgroundColor:'black', height:200, borderWidth:1, transform:[{rotate: '0deg'}]}}/> */}
//           {/* seconds */}
//           <View style={{position:'absolute', backgroundColor: 'transparent', transform:[{rotate:seconds}]}}>
//              <Text style={{color:'black', fontSize:2, height:250}}>|</Text>
//           </View>
//           <View style={{position:'absolute', backgroundColor: 'transparent', height:250 , transform:[{rotate: seconds}]}}>
//              <Text style={{fontSize:2, height: '60%',
//               backgroundColor:'black'}}>|</Text>
//           </View>
//     </View>
//     </View>
//     </SafeAreaView>
//   )
// }

// export default Time

// const styles = StyleSheet.create({})
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const data = [
  ['Header 1', 'Header 2', 'Header 3'],
  ['Data 1', 'Data 2', 'Data 3'],
  ['Data 4', 'Data 5', 'Data 6'],
  ['Data 7', 'Data 8', 'Data 9'],
];

const Table = () => {
  return (
    <ScrollView horizontal>
      <View style={styles.table}>
        {data.map((row, rowIndex) => (
          <View
            key={rowIndex}
            style={[
              styles.tableRow,
              rowIndex === 0 && styles.headerRow, // Apply different style for header row
            ]}
          >
            {row.map((cell, cellIndex) => (
              <Text
                key={cellIndex}
                style={[
                  styles.cell,
                  rowIndex === 0 && styles.headerCell, // Apply different style for header cell
                ]}
              >
                {cell}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerRow: {
    backgroundColor: '#f0f0f0',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  headerCell: {
    fontWeight: 'bold',
  },
});

export default Table;

