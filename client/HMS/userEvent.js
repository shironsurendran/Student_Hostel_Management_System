import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet ,TextInput} from 'react-native'; 
import { Card } from 'react-native-paper';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const UserEventList = ({route}) => {
  const [events, setEvents] = useState([]);

  const userEmail = route.params.userEmail;
  const userName = route.params.userName;
  const navigation = useNavigation(); 

  useEffect(() => {
    axios.get('/auth/eventRegFetch')
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

  return (
    
    <LinearGradient colors={['#715C8C','#333F63', '#B6CBE1']}  style={styles.container}>
      <Text style={styles.title}>Your Registered Room</Text>
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card style={styles.card}
          onPress={()=>{
            navigation.navigate('YourRoom',{event:item})
          }}>
            <Card.Content>
              <Text>Student Name: {item.eventName}</Text>
              <Text> Date: {item.eventDate}</Text>
              <Text>Hostel Name: {item.eventLocation}</Text>
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
  }
});

export default UserEventList;


