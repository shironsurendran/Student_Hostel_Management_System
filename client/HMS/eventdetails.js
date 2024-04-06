import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView ,TouchableOpacity,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const EventDetailsScreen = ({ route }) => {
  const { event } = route.params;
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [token, setToken] = useState();
  const [name, setName] = useState('');

  const buttonStyles = isButtonPressed
    ? [styles.button, styles.buttonPressed]
    : styles.button;


    const fetchData = async () => {
        const storedToken = await AsyncStorage.getItem('userToken');
        setToken(storedToken);
  }
    
    useEffect(() => {
      fetchData();
    }, [fetchData]);

  
    const handlesubmit = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.post('/auth/eventreg', { token ,event});
  
        if (userResponse.status === 200) {
          setName(userResponse.data.userReg.name);
          console.log(userResponse.data.userReg.name)
          Alert.alert(`${event.eventName} Room Register Successfully`)
        } else {
          console.error('An error occurred while fetching user data');
        }
    } catch (error) {
      console.log('fetch Error:', error);
    }
  }
    
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: event.eventImage }} style={styles.eventImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.eventName}>{event.eventName}</Text>
        <View style={styles.detailRow}>
          <Icon name="calendar" size={20} style={styles.icon} />
          <Text style={styles.detail}>Date: {event.eventDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="clock-o" size={20} style={styles.icon} />
          <Text style={styles.detail}>Start Time: {event.eventTime}</Text>
        </View>
        {/* <View style={styles.detailRow}>
          <Icon name="clock-o" size={20} style={styles.icon} />
          <Text style={styles.detail}>End Time: {event.eventEndTime}</Text>
        </View> */}
        <View style={styles.detailRow}>
          <Icon name="calendar-o" size={20} style={styles.icon} />
          <Text style={styles.detail}>Day: {event.eventDay}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="map-marker" size={20} style={styles.icon} />
          <Text style={styles.detail}>Location: {event.eventLocation}</Text>
        </View>
        <View style={styles.detailRow}>
        <Icon name="list" size={20} style={styles.icon} />
        <Text style={styles.detail}>Room No: {event.eventDescription}</Text>
        </View>
        <View style={styles.detailRow}>
        <Icon name="list" size={20} style={styles.icon} />
        <Text style={styles.detail}>Block Name: {event.eventImage}</Text>
        </View>
        <View style={styles.detailRow}>
        <Icon name="list" size={20} style={styles.icon} />
        <Text style={styles.detail}>Room Preference: {event.room}</Text>
        </View>
        <TouchableOpacity
          style={buttonStyles}
          onPress={handlesubmit}
          onPressIn={() => setIsButtonPressed(true)}
          onPressOut={() => setIsButtonPressed(false)}
        >
          <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#637C80',
  },
  eventImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    position: 'absolute',
    top: 200, 
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: 4,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    color:'#854B5B'
  },
  detail: {
    fontSize: 16,
  },
  
  button: {
    borderRadius: 20,
    backgroundColor: '#955670',
    borderWidth: 3,
    borderColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: 150,
    height:50,
    marginLeft: 70
  },
  buttonPressed: {
    borderColor: 'dodgerblue',
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'wheat',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default EventDetailsScreen;
