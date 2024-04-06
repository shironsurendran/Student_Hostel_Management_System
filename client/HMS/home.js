import React from 'react';
import { useState } from 'react';
import { ImageBackground, Button,TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
 function HomeScreen({ navigation }) {
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleAdmin = () => {
    navigation.navigate('Admin');
  };

  const handleUser = () => {
    navigation.navigate('User');
  };

  const handleQr = () => {
    navigation.navigate('QrScan');
  };

  const buttonStyles = isButtonPressed
    ? [styles.button, styles.buttonPressed]
    : styles.button;
  return (
    <ImageBackground
      source={require('../images/home.png')} 
      style={styles.backgroundImage} 
   >
    {/* <LinearGradient  colors={['#715C8C','#333F63', '#B6CBE1']}   start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}  style={styles.container}> */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',marginTop:400}}>
        {/* <Text style={styles.text}>HMS</Text> */}
        <TouchableOpacity
        style={buttonStyles}
        onPress={handleAdmin}
        onPressIn={() => setIsButtonPressed(true)}
        onPressOut={() => setIsButtonPressed(false)}>
        <Text style={styles.buttonText}>Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={buttonStyles}
        onPress={handleUser}
        onPressIn={() => setIsButtonPressed(true)}
        onPressOut={() => setIsButtonPressed(false)}>
        <Text style={styles.buttonText}>User</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={buttonStyles}
        onPress={handleQr}
        onPressIn={() => setIsButtonPressed(true)}
        onPressOut={() => setIsButtonPressed(false)}>
        <Text style={styles.buttonText}>Scan</Text>
      </TouchableOpacity> */}
      <Text style={styles.slogantext}>RVS College of arts and science</Text>
      </View>
      {/* </LinearGradient> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%', 
    height: '100%', 
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  text: {

    fontWeight: '500',
    fontSize: 30,
    color: '#C3E0E5', 
  }, 
  slogantext: {
    paddingBottom: 50,
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black', 
  }, 
  button: {
    borderRadius: 20, 
    backgroundColor: 'red',
    borderWidth: 3,
    borderColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width:100
  },
  buttonPressed: {
    borderColor: 'dodgerblue', 
    backgroundColor: 'transparent',
    colorText:'red'
  },
  buttonText: {
    color: '#E2D9CA',
    fontSize: 18,
    textAlign:'center',
    fontWeight: 500,
  },
});
export default HomeScreen;
