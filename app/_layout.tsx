import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import Toast from 'react-native-toast-message';
import { toastConfig } from '../Custom/ToastConfig';

export default function RootLayout() {
  
  useFonts({
    'outfit':require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium':require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold':require('./../assets/fonts/Outfit-Bold.ttf')

  })
  return (
    <>
      {/* <Stack screenOptions={{
        headerShown: false
      }}>
      </Stack> */}
      {/* <Stack.Screen name="(tabs)"/> */}
      <Stack screenOptions={{ headerShown: false }}>
        {/* Nếu bạn có folder /app/(tabs)/ thì mới xài được cái này */}
        <Stack.Screen name="(tabs)"/>
      </Stack>

      
      <Toast config={toastConfig} />
    </>
  );
}
