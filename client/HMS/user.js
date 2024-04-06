import React, { useState } from 'react';
import { View,Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


function UserLog({ navigation }) {
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleSignUp = () => {
    navigation.navigate('Signup');
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  const buttonStyles = isButtonPressed
    ? [styles.button, styles.buttonPressed]
    : styles.button;

  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'#6A4973'}}>
      
      <Text style={styles.text}>
        Hi Students... <Text style={styles.colorText}>Your Hostel is the Second Home</Text> We Heartly Welcomes You!
      </Text>
    
      {/* <TouchableOpacity
        style={buttonStyles}
        onPress={handleSignUp}
        onPressIn={() => setIsButtonPressed(true)}
        onPressOut={() => setIsButtonPressed(false)}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={buttonStyles}
        onPress={handleSignIn}
        onPressIn={() => setIsButtonPressed(true)}
        onPressOut={() => setIsButtonPressed(false)}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    
    </View>

  );
}

const styles = StyleSheet.create({
  text: {
    paddingBottom: 50,
    fontWeight: '700',
    fontSize: 30,
    marginLeft: 18,
    color: 'white',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%', 
    height: '100%', 
  },
  colorText: {
    color: '#FB8DA0',
  },
  button: {
    borderRadius: 20, 
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width:200
  },
  buttonPressed: {
    borderColor: 'dodgerblue', 
    backgroundColor: 'transparent',
    colorText:'red'
  },
  buttonText: {
    color: '#6A4973',
    fontSize: 18,
    textAlign:'center',
    fontWeight: 500,
  },
});

export default UserLog;