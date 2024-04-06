import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet ,TextInput} from 'react-native'; 
import { Card } from 'react-native-paper';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
const AdminEventList = () => {
  const [events, setEvents] = useState([]);

  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/auth/eventRegFetch')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching event data', error);
      });
  }, [events]);

  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <LinearGradient colors={['#606c88', '#3f4c6b']} style={styles.container}>
      <Text style={styles.title}>Room Allotment List</Text>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search student by name"
          onChangeText={(text) => setSearch(text)}
          value={search}
          placeholderTextColor="#aaa"
        />
      </View><Text/>
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text>Email : {item.email}</Text>
              <Text>Name: {item.name}</Text>
              <Text>Registration Date: {item.Regdate}</Text>
              <Text>Student Name: {item.eventName}</Text>
              <Text>Allocated Date: {item.eventDate}</Text>
               <Text>Start Time: {item.eventTime}</Text>
               {/* <Text>EndTime: {item.eventEndTime}</Text>  */}
              <Text>Hostel Name: {item.eventLocation}</Text>
              <Text>Room Preference: {item.room}</Text>
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
  },
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#606c88',
    borderRadius: 15,
    paddingLeft: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
    width:"80%",
    marginLeft:35
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1, 
    height: 40,
    color: '#000', 
  },
});

export default AdminEventList;


