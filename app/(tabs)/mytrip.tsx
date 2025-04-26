import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import StartNewTripCard from '@/components/MyTrips/StartNewTripCard';

export default function Mytrip() {

  const [userTrip, setUserTrip] = useState([]);

  return (
    <View style={{
      padding: 20,
      paddingTop: 30,
      backgroundColor:Colors.WHITE,
      height: '100%',
    }}>
      
      <View style={{
        display:'flex',
        flexDirection:'row',
        alignContent: 'center',
        justifyContent: 'space-between'
      }}> 
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize:35,
        }}> MyTrip</Text>

        <Ionicons name='add-circle' size={50} color={Colors.MAIN}/>
      </View>

      {userTrip?.length==0?
        <StartNewTripCard/>
        :null
      }

    </View>
  )
}