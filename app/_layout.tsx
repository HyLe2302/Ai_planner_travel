import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import Toast from 'react-native-toast-message';
import { toastConfig } from '../Custom/ToastConfig';
import { useState } from "react";


export default function RootLayout() {
  
  useFonts({
    'outfit':require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium':require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold':require('./../assets/fonts/Outfit-Bold.ttf')

  })

  const [tripData, setTripData] = useState([])

  return (
    <>
      

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)"/>
      </Stack>

      <Toast config={toastConfig} />
      
    </>
  );
}
