import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Ionicons, FontAwesome,MaterialIcons,Feather,AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors'
import {auth} from './../../../configs/FireBaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";
import Toast from 'react-native-toast-message';



export default function SignInScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerShow: false 
    })
  },[])

  const OnSignIn = () =>{

    if(!email || !password){
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Please enter full details',
        visibilityTime: 2000,
      });
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      Toast.show({
        type: 'success',
        text1: 'Congratualte',
        text2: 'Login  successful ',
        visibilityTime: 1000,
      });
      setTimeout(() => {router.push('/(tabs)/mytrip')}, 1000);
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorMessage,errorCode);

      // if(errorCode !== )
      const errorMessages = {
        'auth/user-not-found': 'Account dont exist',
        'auth/wrong-password': 'Password fail',
        'auth/invalid-email': 'Email invalid',
        'auth/too-many-requests': 'You have logged in wrong too many times. Try again later !',
        'auth/invalid-credential' : 'Invalid login information'
      };
    
      Toast.show({
        type: 'error', 
        text1: 'Sign In Wrong',
        text2: errorMessages[errorCode] || 'Error',
        visibilityTime: 3000,
      });

    });
  }


  return (

    <View style={styles.container}>
      <Image 
        source={require('./../../../assets/images/bluebg.png')}
        style={{
          width:400,
          height:400
        }}
      />
      <View>
        <Text style={styles.title}>Welcome</Text>
      </View>

      <View style={[styles.inputContainer, emailFocused && styles.inputFocused]}>
        <Ionicons 
          name='mail-outline'
          style={[styles.icon, emailFocused && styles.focusedIcon]}
          size={emailFocused ? 24 : 20}
        />
        <TextInput
          placeholder='email'
          onChangeText={(value)=>setEmail(value)}
          placeholderColor={Colors.GRAY} 
          style = {styles.textInput}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
        />     
      </View>

      <View style={[styles.inputContainer, passwordFocused && styles.inputFocused]}>   
        <AntDesign
            name='lock'
            style={[styles.icon, passwordFocused && styles.focusedIcon]}
            size={passwordFocused ? 27 : 23}
          />
        <TextInput
          style = {styles.textInput}
          placeholder='password'
          onChangeText={(value => setPassword(value))}
          placeholderColor={Colors.GRAY} 
          secureTextEntry={!showPassword}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
        />       
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-outline" : "eye-off-outline"} 
            size={passwordFocused ? 24 : 20}
            style={[styles.icon, passwordFocused && styles.focusedIcon]}
          />
        </TouchableOpacity>

      </View>  

      <View>
        <Text style={{
          fontFamily:'outfit',
          fontSize:16,
          color:Colors.MAIN,
          marginTop:15,
          marginLeft:200
        }}>Forgot password ?</Text>
      </View>

      <TouchableOpacity style={styles.button}
        onPress={OnSignIn}
      >
        <Text style={{
            color:Colors.WHITE,
            textAlign:'center',
            fontFamily:'outfit-bold',
            fontSize:22
        }}>Sign In</Text>
        </TouchableOpacity>

        <View style={{
          flexDirection: 'row',
          textAlign:'center'
        }}>
          <Text style={{
            fontFamily:'outfit',
            fontSize:16,
            color:Colors.GRAY,
            marginTop:40,
          }}>Don't have account?</Text>
 
        <TouchableOpacity onPress={() => router.push('./sign-up')}>
          <Text style={{
              fontFamily:'outfit-bold',
              fontSize:18,
              color:Colors.MAIN,
              marginTop:37,
            }}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    backgroundColor:Colors.WHITE,
    height: '100%'
  },
  inputContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    borderWidth: 1,
    borderBottomColor: Colors.MAIN,
    borderRightColor: Colors.WHITE,
    borderTopColor: Colors.WHITE,
    borderLeftColor: Colors.WHITE,
    paddingHorizontal: 10,
    marginBottom:20,
    height: 50,
    width:330,
    margin: 10,
  },
  textInput: { 
    flex: 1, 
    fontSize: 16,
    color: '#333',
    backgroundColor: Colors.WHITE,
  },
  inputFocused: {
    borderBottomColor: '#5DADE2',
    borderWidth: 2,
  },
  focusedIcon: {
    color: '#5DADE2',

  },
  icon: {
    marginRight: 10,
    color: Colors.GRAY
  },
  title:{
    marginTop: -280,
    fontFamily: 'outfit-bold',
    fontSize:50,
    color: Colors.WHITE
  },
  button:{
    padding:15,
    width:330,
    height:60,
    backgroundColor: Colors.MAIN,
    borderRadius:30,
    marginTop:'16%',
  }
}) 