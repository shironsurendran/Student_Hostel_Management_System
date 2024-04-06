
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet ,TextInput,Button,TouchableOpacity,Alert} from 'react-native'; 
import { Card } from 'react-native-paper';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({route}) => {
  const [events, setEvents] = useState([]);
  const userEmail = route.params.userEmail;
  const navigation = useNavigation(); 
  const [isEditing, setIsEditing] = useState(false);
  const [name,setName] = useState();
  const [phone,setPhone] = useState();
  const [password,setPassword] = useState();
      const clearAsyncStorage = async () => {
      try {
        await AsyncStorage.clear();
        console.log('cleared Async storage')
        navigation.navigate('Home'); 
      } catch (error) {
        console.log('clearAsync error', error)
      }
    };

  useEffect(() => {
    axios.get('/auth/getuser')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching event data', error);
      });
  }, [events]);


  const filteredEvents = events.filter((item) =>
    item.email.toLowerCase().includes(userEmail.toLowerCase())
  );

  const handleSubmit = async () => {
    setIsEditing(!isEditing);
    if (!name || !password || !phone) {
      Alert.alert('Error', 'Please fill in all fields');
    } else {

      try {
        const response = await axios.post('/auth/userprofile', {userEmail, name, phone, password });
        if (response.status === 200) {
          console.log('update profile successfully');
          Alert.alert('update Profile Successfully');
          setName('');
          setPassword('');
          setPhone('');
        } 
      } catch (error) {
        console.error('An error occurred while Login user', error);
      }
    }
  };

  return (
    
    <LinearGradient colors={['#715C8C','#333F63', '#B6CBE1']}  style={styles.container}>
    <TouchableOpacity style={styles.redButton} onPress={clearAsyncStorage}>
        <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
      <Text style={styles.title}>Profile</Text>
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
            {isEditing ? (
            <View>
            <Text>Name: </Text>
            <TextInput style={styles.textInput} placeholder="Enter your name" value={name} onChangeText={setName}/>
            <Text>Phone No: </Text>
            <TextInput style={styles.textInput} placeholder="Enter Phone no" value={phone} onChangeText={setPhone}/>
            <Text>Password: </Text>
            <TextInput style={styles.textInput} placeholder="Enter Password" value={password} onChangeText={setPassword}/>
            </View>
          ) : (
            <View>
                <Text>Name: {item.name}</Text>
                <Text>Phone no: {item.phone}</Text>
                <Text>Email: {item.email}</Text>
            </View>
          )}
           <TouchableOpacity style={styles.Button} onPress={handleSubmit}>
                 <Text style={styles.buttonText}>{isEditing ? "Save" : "Edit"}</Text>
            </TouchableOpacity>
            </Card.Content>
          </Card>
        )}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  redButton: {
    backgroundColor: '#F95450',
    padding: 10,
    marginTop:80,
    borderRadius: 5,
    width: 70, 
    alignSelf:'flex-end',
  },
  Button: {
    backgroundColor: '#715C8C',
    alignSelf:'flex-start',
    padding: 10,
    borderRadius: 5,
    width: 100, 
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:45,
    color:'wheat'
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
  },
  smallButton: {
    width: 50,
    backgroundColor:'red'
  },

});

export default SettingsScreen;


