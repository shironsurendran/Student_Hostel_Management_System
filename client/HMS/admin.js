import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AdminLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const buttonStyles = isButtonPressed
    ? [styles.button, styles.buttonPressed]
    : styles.button;


  const handleSignin = async ()=>{
    if(!email || !password){
      Alert.alert('Please Fill all the fields');
    }
    const response = await axios.post('/auth/admin',{email,password});
    try{
      if(response.status === 200){
      
        const userEmail = response.data.admin.email;
        const token = response.data.token;
        Alert.alert(`Admin Login Successfull`)
        await AsyncStorage.setItem('token',token);
        await AsyncStorage.setItem('userEmail',userEmail);
        navigation.navigate('AdminScreen',{userEmail});
        setEmail('');
        setPassword('');
      }
    }
    catch(error){
      console.error('error while using Login',error);
    }
   }

  return (
    <ImageBackground
      source={require('../images/admin.png')}
      style={styles.backgroundImage}
    >
    {/* <LinearGradient  colors={['#715C8C','#333F63', '#B6CBE1']}   
   style={styles.backgroundImage}> */}
      <View style={styles.container}>
        <Text style={styles.text}> Admin Login</Text>
        <TextInput
          placeholder="Email"
          value={email}
          placeholderTextColor="white"
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          placeholderTextColor="white"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity
          style={buttonStyles}
          onPress={handleSignin}
          onPressIn={() => setIsButtonPressed(true)}
          onPressOut={() => setIsButtonPressed(false)}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
      {/* </LinearGradient> */}
     </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'white',
  },
  text: {
    paddingBottom: 50,
    fontWeight: '700',
    fontSize: 30,
    color: 'white',
    marginTop:-40
  },
  button: {
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: 150,
  },
  buttonPressed: {
    borderColor: 'dodgerblue',
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'tomato',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default AdminLogin;
