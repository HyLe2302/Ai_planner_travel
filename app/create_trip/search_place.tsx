import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from './../../constants/Colors'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import { useRouter } from 'expo-router';


export default function SearchPlace() {

  const router = useRouter();

  const [tripData, setTripData] = useState({
      name: "",
      coordinates: {
        lat: 0,
        lng: 0,
      },
      photoRef: "",
      url: "",
      traveler: {
        id: 1,
        title: "Just Me",
        description: "A solo traveler in exploration",
        icon: "🛩",
        people: "1 people",
      },
      time: {
        startDate: null,
        endDate: null,
        totalNoOfDays: 0,
      },
      budget: {
        id: 1,
        title: "Cheap",
        description: "Stay conscious of costs",
        icon: "💵",
      },
    });

    useEffect(() => {
      if (tripData.name !== "") {
        router.push({
                  pathname: '/create_trip/select_traveler',
                  params: {
                    tripData: JSON.stringify(tripData), 
                  },
                })
      }
    }, [tripData]);

  return (
    <View
    style = {{
        padding:9,
        paddingTop:75,
        backgroundColor: Colors.WHITE,
        height:'100%'
    }}>

    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <GooglePlacesAutocomplete
            placeholder="Search cities..."            
            fetchDetails = {true}
            textInputProps={{
              autoFocus: true, 
            }}
            onFail={(error) => console.log(error)}
            onPress={(data, details = null) => {
                setTripData({
                  name: data.description,
                  coordinates: details?.geometry.location as { lat: number; lng: number },
                  photoRef: details?.photos[0]?.photo_reference,
                  url: details?.url as string,
                  traveler: {
                    id: 1,
                    title: "Just Me",
                    description: "A solo traveler in exploration",
                    icon: "🛩",
                    people: "1 people",
                  },
                  time: {
                    startDate: null,
                    endDate: null,
                    totalNoOfDays: 0,
                  },
                  budget: {
                    id: 1,
                    title: "Cheap",
                    description: "Stay conscious of costs",
                    icon: "💵",
                  },
                })
            }}
            query={{
                key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                language: 'en',
            }}
            styles={{
              textInputContainer: {
                padding: 4,
                borderWidth: 1,
                borderColor: "lightgray",
                borderRadius: 10,
              },
            }}
        /> 
        </TouchableWithoutFeedback>
    </View>
  )
}

