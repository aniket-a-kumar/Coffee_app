import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProfilePic = () => {
  return (
    <View>
      <Image source={require('../assets/ProfilePic.png')} style={{height:50, width:50, borderRadius:10}}/>
    </View>
  )
}

export default ProfilePic

const styles = StyleSheet.create({})