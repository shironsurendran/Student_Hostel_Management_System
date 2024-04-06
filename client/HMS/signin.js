

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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const buttonStyles = isButtonPressed
    ? [styles.button, styles.buttonPressed]
    : styles.button;

  const handleSignin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    } else {
      try {
        const response = await axios.post('/auth/login', { email, password }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          console.log('User Login successfully');
          Alert.alert('Login Successfully');
          const userEmail = response.data.email;
          const userName = response.data.name;
          const token = response.data.token
          await AsyncStorage.setItem('userToken',token);
          navigation.navigate('UserScreen', { userEmail,userName });
          
          setEmail('');
          setPassword('');
        } 
      } catch (error) {
        console.error('An error occurred while Login user', error);
      }
    }
  };

  return (
    <ImageBackground
      source={require('../images/student.png')}
      style={styles.backgroundImage}
    >
    {/* <LinearGradient  colors={['#8E2DE2','#170B3B', '#9388A2']}   start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}  style={styles.backgroundImage}> */}
      <View style={styles.container}>
        <Text style={styles.text}> User Login Here</Text>
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

export default LoginScreen;
