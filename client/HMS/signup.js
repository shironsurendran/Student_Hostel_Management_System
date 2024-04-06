import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [dept, setDept] = useState('');
  const [regno, setRegno] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState();
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [bloodgroup, setBloodgroup] = useState('');
  const [password, setPassword] = useState('');
  const [room, setRoom] = useState('');
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const navigations=useNavigation()


  const buttonStyles = isButtonPressed
    ? [styles.button, styles.buttonPressed]
    : styles.button;

  const handleSignup = async () => {
    if (!name || !email || !password || !dept || !regno || !dob || !address || !bloodgroup || !room || !phone) {
      alert("Error', 'Please fill in all fields")
      Alert.alert('Error', 'Please fill in all fields');
      return;
    } else {
      try {
        // console.log(email, password, name,phone,dept,regno,dob,address,bloodgroup,room)
        const response = await axios.post('/auth/signup',{ email, password, name,phone,dept,regno,dob,address,bloodgroup,room}, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        
        );
        // console.log(response,"kk")
        
        // console.log(email, password, name,phone,dept,regno,dob,address,bloodgroup,room)
        if (response.status === 200) {
          // alert('User registered successfully');
          Alert.alert('Register Successfully');
          setEmail('');
          setName('');
          setPassword('');
          setAddress('');
          setBloodgroup('');
          setDob('');
          setPhone('');
          setRegno('');
          setRoom('');
          setDept('');
      navigations.navigate('AdminScreen');
        } else {
          console.error('An error occurred while registering user');
        }
      } catch (error) {
        console.error('An error occurred while registering user', error);
      }
    }
  };

  return (
    <ScrollView>
    <ImageBackground
      source={require('../images/student.png')}
      style={styles.backgroundImage}
    >
    {/* <LinearGradient  colors={['#5C038C','#333F63', '#896FBC']}   start={{ x: 0, y: 0 }} */}
  {/* end={{ x: 1, y: 1 }}  style={styles.backgroundImage}>  */}
      <View style={styles.container}>
        <Text style={styles.text}>New Student Registration</Text>
        <TextInput
          placeholder="Name"
          placeholderTextColor="white"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
          <TextInput
          placeholder="Department"
          value={dept}
          placeholderTextColor="white"
          onChangeText={(text) => setDept(text)}
          style={styles.input}
        />
          <TextInput
          placeholder="Regno"
          value={regno}
          placeholderTextColor="white"
          onChangeText={(text) => setRegno(text)}
          style={styles.input}
        />
          <TextInput
          placeholder="Email"
          value={email}
          placeholderTextColor="white"
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
          <TextInput
          placeholder="Phone Number"
          value={phone}
          placeholderTextColor="white"
          onChangeText={(number) => setPhone(number)}
          style={styles.input}
        />
          <TextInput
          placeholder="DOB"
          value={dob}
          placeholderTextColor="white"
          onChangeText={(text) => setDob(text)}
          style={styles.input}
        />
          <TextInput
          placeholder="Address"
          value={address}
          placeholderTextColor="white"
          onChangeText={(text) => setAddress(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Blood Group"
          value={bloodgroup}
          placeholderTextColor="white"
          onChangeText={(text) => setBloodgroup(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          placeholderTextColor="white"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
            //  maxLength={8} 
        />
         <TextInput
          placeholder="Room Preference"
          placeholderTextColor="white"
          value={room}
          onChangeText={(text) => setRoom(text)}
          style={styles.input}
        />
         <TouchableOpacity
        style={buttonStyles}
        onPress={ handleSignup }
        onPressIn={() => setIsButtonPressed(true)}
        onPressOut={() => setIsButtonPressed(false)}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      </View>
     {/* </LinearGradient>  */}
     </ImageBackground>
     </ScrollView>
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
    width:150
  },
  buttonPressed: {
    borderColor: 'dodgerblue', 
    backgroundColor: 'transparent',
    colorText:'red'
  },
  buttonText: {
    color: 'violet',
    fontSize: 18,
    textAlign:'center',
    fontWeight: 500,
  },
});

export default SignupScreen;
