import { View, Text, Image,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { router } from 'expo-router';
import SignIn from './../app/auth/sign-in/index';

export default function Login() {
  
  const route = useRoute();
  
  
  return (
    <View>
      <Image 
        source = {require('./../assets/images/login1.jpg')}
        style={{
            width:'100%',
            height:510
      }}
      />
      <View style = {styles.container}>
        <Text style={{
              fontSize:30,
              fontFamily:'outfit-bold',
              textAlign: 'center',
              marginTop: 10
          }}>Ai Travel planner</Text>

        <Text style = {{
              fontFamily:'outfit',
              fontSize: 17,
              textAlign: 'center',
              color: Colors.GRAY,
              marginTop:20
        }}>since the 1500s, when an unknown printer took a galley orem Ipsum passages, and more recently with desktop</Text>
      
      <TouchableOpacity style={styles.button}
          onPress={()=>router.push('./auth/sign-in')}
      >
          <Text style={{
              color:Colors.WHITE,
              textAlign:'center',
              fontFamily:'outfit-bold',
              fontSize:18
          }}>Get Start</Text>
      </TouchableOpacity>


      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
    container:{
      backgroundColor:Colors.WHITE,
      height:'100%',
      borderTopRightRadius:25,
      borderTopLeftRadius:25,
      marginTop:-20,
      padding:25
    },
    button:{
      padding:15,
      backgroundColor: Colors.MAIN,
      borderRadius:30,
      marginTop:'16%'
    }
})
    