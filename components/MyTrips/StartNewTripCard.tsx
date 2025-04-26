import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

export default function StartNewTripCard() {
  return (
    <View style={{
        padding:20,
        marginTop:30, 
        display:'flex',
        alignItems:'center',
        gap:20
    }}>

        <Entypo name="location" size={30} color="black" />

        <Text style={{
            fontSize:25,
            fontFamily:'outfit-medium',
            marginTop:10    
        }}>
            No trips planer yet
        </Text>

        <Text style={{
            fontSize:15,
            fontFamily:'outfit',
            textAlign:'center',
            color:Colors.GRAY
        }}>
            Looks like it's time to plan{'\n'}
            a new travel experience! Get started below
        </Text>

        <TouchableOpacity style={{
            padding:15,
            marginTop:15,
            backgroundColor:Colors.MAIN,
            borderRadius:15,
            paddingHorizontal:30    
        }}>
            <Text style={{
                color:Colors.WHITE,
                fontFamily:'outfit-medium',
                fontSize:17
            }}>
                Start a new trip             
            </Text>
        </TouchableOpacity>

    </View>
  )
}