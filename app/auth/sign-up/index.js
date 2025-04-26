import { View, Text, TextInput, TouchableOpacity,  KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, StyleSheet, Image, Keyboard, Platform, ToastAndroid} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Ionicons, FontAwesome,MaterialIcons,Feather,AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { Colors } from '@/constants/Colors'
import { auth } from './../../../configs/FireBaseConfig'
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [configPasswordFocused, setConfigPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfigPassword, setShowConfigPassword] = useState(false);

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState(String);
  const [configPassword, setConfigPassword] = useState(String);


  useEffect(() => {
    navigation.setOptions({
      headerShow: false 
    })
  },[])

  const resetState = () => {
    setPasswordFocused(false);
    setConfigPasswordFocused(false);
    setShowPassword(false);
    setShowConfigPassword(false);
    Keyboard.dismiss(); // Ẩn bàn phím
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const OnCreateAccount = () =>{

    if(!name || !email || !password || !configPassword)
    {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Please enter full details',
        visibilityTime: 2000,
      });
      return;
    }

    if (!isValidEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Email InValid',
        text2: 'example@gmail.com',
        visibilityTime: 3000,
      });
      return;
    }

    if(password !== configPassword){
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Please check password again!',
        visibilityTime: 2000,
      });
      return;
    }

    if(password.length <6){
      Toast.show({
        type: 'error',
        text1: 'Password too short',
        text2: 'Password must have at least 6 charaters',
        visibilityTime: 2000,
      });
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user);
      Toast.show({
        type: 'success',
        text1: 'Congratualte',
        text2: 'Create a successful account ✅ ',
        visibilityTime: 2000,
      });
      setTimeout(() => {router.push('./sign-in')}, 1000);


      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage,errorCode);
      if(errorCode == 'auth/email-already-in-use'){
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Email has been used',
          visibilityTime: 2000,
        });
      }
      // ..
    });
  }

  return ( 
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={resetState}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">

          <Image 
            source={require('./../../../assets/images/bluebg.png')}
            style={{
              width:400,
              height:400
            }}
          />

          <View>
            <Text style={styles.title}>Sign Up</Text>
          </View>

          <View style={[styles.inputContainer,{marginTop:-47}, nameFocused && styles.inputFocused]}>
            <Ionicons 
              name='person-outline'
              style={[styles.icon, nameFocused && styles.focusedIcon]}
              size={nameFocused ? 24 : 20}
            />
            <TextInput
              style = {styles.textInput}
              placeholder='Full name'
              onChangeText={(value) => setName(value)}
              placeholderColor={Colors.GRAY} 
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
            />     
          </View>

          <View style={[styles.inputContainer, emailFocused && styles.inputFocused]}>
            <Ionicons 
              name='mail-outline'
              style={[styles.icon, emailFocused && styles.focusedIcon]}
              size={emailFocused ? 24 : 20}
            />
            <TextInput
              style = {styles.textInput}
              placeholder='email'
              onChangeText={(value) => setEmail(value)}
              placeholderColor={Colors.GRAY} z
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />     
         </View>

          <View style={styles.inputContainer}>   
            <AntDesign
                name='lock'
                style={[styles.icon, passwordFocused && styles.focusedIcon]}
                size={passwordFocused ? 26 : 22}
              />
            <TextInput
              style = {styles.textInput}
              placeholder='password'
              onChangeText={(value) => setPassword(value)}
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

          <View style={[styles.inputContainer, configPasswordFocused && styles.inputFocused]}>   
            <AntDesign
                name='lock1'
                style={[styles.icon, configPasswordFocused && styles.focusedIcon]}
                size={configPasswordFocused ? 25 : 21}
              />
            <TextInput
              style = {styles.textInput}
              placeholder='Config Password'
              onChangeText={(value) => setConfigPassword(value)}
              placeholderColor={Colors.GRAY} 
              secureTextEntry={!showConfigPassword}
              onFocus={() => setConfigPasswordFocused(true)}
              onBlur={() => setConfigPasswordFocused(false)}
            />       
            <TouchableOpacity onPress={() => setShowConfigPassword(!showConfigPassword)}>
              <Ionicons
                name={showConfigPassword ? "eye-outline" : "eye-off-outline"}
                size={configPasswordFocused ? 24 : 20}
                style={[styles.icon, configPasswordFocused && styles.focusedIcon]}
              />
            </TouchableOpacity> 
          </View>

          <TouchableOpacity style={styles.button}
            onPress={OnCreateAccount}
          >
            <Text style={{
                color:Colors.WHITE,
                textAlign:'center',
                fontFamily:'outfit-bold',
                fontSize:22
            }}>Sign Up</Text>
            </TouchableOpacity>

        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    backgroundColor:Colors.WHITE,
    height: '100%'
  },
  scrollContainer: {
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: 'row', 
    marginLeft:37,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 2,
    borderBottomColor: Colors.MAIN,
    borderRightColor: Colors.WHITE,
    borderTopColor: Colors.WHITE,
    borderLeftColor: Colors.WHITE,
    paddingHorizontal: 10,
    marginBottom:25,
    height: 50,
    width:330,
  },
  textInput: { 
    flex: 1, 
    fontSize: 16,
    color: '#333',
    
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
    marginLeft: 100,
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
    marginTop:'10%',
    marginLeft:35
  }
})