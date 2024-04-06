import React, { useState, useEffect,ScrollView } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateEvent = ({ navigation }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTime, setEventTime] = useState(new Date()); 
  const [eventEndTime, setEventEndTime] = useState(new Date()); 
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImage, setEventImage] = useState('');
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
const [room,setRoom]=useState('');
  const [evntdate, setEvntDate] = useState('');
  const [evntTime,setEvntTime] = useState('');
  const [evntEndTime,setEvntEndTime] = useState('');
  const [evntDay,setEvntDay] = useState('');

  const [data, setData] = useState(null);

  const buttonStyles = isButtonPressed
    ? [styles.button, styles.buttonPressed]
    : styles.button;

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setShowDatePicker(Platform.OS === 'ios');
    setEventDate(currentDate);
    const datee = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };

    const formattedDate = currentDate.toLocaleDateString('en-IN', datee);
    const dayOptions = {
      weekday: 'long',
    };
    
    const formDate = currentDate.toLocaleDateString('en-IN', dayOptions);
    const formattedDay = formDate.split(',')[0];
    setEvntDate(formattedDate);
    setEvntDay(formattedDay);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || eventTime;
    setShowTimePicker(Platform.OS === 'ios');
    setEventTime(currentTime);
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    
    const formattedTime = currentTime.toLocaleTimeString('en-IN', timeOptions);
    setEvntTime(formattedTime);
  };

  
  const handleEndTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || eventEndTime;
    setShowEndTimePicker(Platform.OS === 'ios');
    setEventEndTime(currentTime);
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    
    const formattedTime = currentTime.toLocaleTimeString('en-IN', timeOptions);
    setEvntEndTime(formattedTime);
  };


  const handleSubmit = async () => {
    const eventData = {
      eventName,
      eventDate: evntdate, 
      eventTime: evntTime,
      eventEndTime: evntEndTime,
      eventLocation,
      eventDescription,
      eventImage,
      room,
      eventDay : evntDay,
    };

    if (!eventName || !eventDate || !eventLocation || !eventDescription || !eventImage || !eventEndTime || !eventTime || !room) {
      Alert.alert('Please fill in all fields');
      return;
    } else {
      try {
        const response = await axios.post('/auth/event', eventData);
        if (response.status === 200) {
          if (response.data.message === 'room with the same name already exists') {
            Alert.alert('room with the same name already exists');
          } else {
            Alert.alert('room added successfully');
            setEventName('');
            setEventDate(new Date());
            setEventDescription('');
            setEventImage('');
            setEventLocation('');
            setRoom('');
            setData(response.data.event);
            console.log('Date:', eventDate);
          }
        }
      } catch (error) {
        if (error.response && error.response.data.message === 'Event with the same name already exists') {
          Alert.alert('Event with the same name already exists');
        } else {
          Alert.alert('Error creating event: ' + error.message);
        }
      }
    }
  };

  return (
    <LinearGradient colors={['#292E49', '#536976']} style={styles.container}>
      <Text style={styles.text}>Allocate Room</Text>
      <TextInput
        placeholder="Student Name"
        placeholderTextColor="white"
        value={eventName}
        onChangeText={setEventName}
        required
        style={styles.input}
      />
       <View style={styles.dateContainer}>
       <Text style={styles.datelabel}>Date </Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateButtonText}>{eventDate.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={eventDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      </View><Text/>
       <View style={styles.dateContainer}>
      <Text style={styles.datelabel}>Start Time:</Text>
      <TouchableOpacity  style={styles.dateButton} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.dateButtonText}>{eventTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={eventTime}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
      </View><Text/>
      {/* <View style={styles.dateContainer}>
      <Text style={styles.datelabel}>End Time:</Text>
      <TouchableOpacity  style={styles.dateButton} onPress={() => setShowEndTimePicker(true)}>
        <Text style={styles.dateButtonText}>{eventEndTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showEndTimePicker && (
        <DateTimePicker
          value={eventEndTime}
          mode="time"
          display="default"
          onChange={handleEndTimeChange}
        />
      )}
      </View><Text/>  */}
      <TextInput
        placeholder="Hostel Name"
        placeholderTextColor="white"
        value={eventLocation}
        onChangeText={setEventLocation}
        required
        style={styles.input}
      />
      <TextInput
        placeholder="Room No"
        placeholderTextColor="white"
        value={eventDescription}
        onChangeText={setEventDescription}
        required
        multiline
        style={styles.input}
      />
      <TextInput
        placeholder="Block Name"
        placeholderTextColor="white"
        value={eventImage}
        onChangeText={setEventImage}
        required
        style={styles.input}
      />
        <TextInput
        placeholder="Room Preference"
        placeholderTextColor="white"
        value={room}
        onChangeText={setRoom}
        required
        style={styles.input}
      />
      <TouchableOpacity
        style={buttonStyles}
        onPress={handleSubmit}
        onPressIn={() => setIsButtonPressed(true)}
        onPressOut={() => setIsButtonPressed(false)}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#302b63',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  datelabel: {
    fontSize: 16,
    marginBottom: 5,
    paddingRight:30,
    color:'white'
  },
  dateContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  dateButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 8,
  },
  dateButtonText: {
    color: 'white', 
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CreateEvent;
