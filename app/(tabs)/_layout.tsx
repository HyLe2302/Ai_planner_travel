import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { Ionicons, FontAwesome,MaterialIcons,Feather,AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors'
import Toast from 'react-native-toast-message';
import { useState } from 'react'
import CustomTabBar from './../../Custom/CustomTabBar'
import React from 'react'
import { Tabs } from 'expo-router'

export default function TapLayout() {
  return (  
      <Tabs screenOptions={{ headerShown: false }}  tabBar={(props) => <CustomTabBar {...props} />}> 
        <Tabs.Screen name="mytrip" options={{title:'mytrip'}} />
        <Tabs.Screen name="discover" options={{title:'discover'}}/>
        <Tabs.Screen name="profile" options={{title:'profile'}}/>
        <Tabs.Screen name="aiAgent" options={{title:'aiAgent'}}/>
      </Tabs>
  )
}

const style = StyleSheet.create({

})