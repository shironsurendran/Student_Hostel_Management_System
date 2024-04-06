
import React from 'react';
import { View, Text, FlatList, StyleSheet,Image } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
// import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';

const UserEvent2 = ({ route }) => {
  const event = route.params.event;
  const navigation = useNavigation();
  console.log(event);
  return (
    
    <LinearGradient colors={['#715C8C','#333F63', '#B6CBE1']} style={styles.container}>
     {event ? (
      <>
       <Text style={styles.title}>{event.status}</Text>
          <Card style={styles.card}>
            <Card.Content>
            <View style={styles.detailscard}>
            <Text>Student Name: {event.eventName}</Text>
            <Text>{event.eventDay}, {event.eventDate}</Text>
            <Text>Hostel Name: {event.eventLocation}</Text>
            <Text>Registration Date : {event.Regdate}</Text>
            <Text>Room No: {event.eventDescription}</Text>
            <Text>Block Name: {event.eventImage}</Text>
            <Text>Room Preference: {event.room}</Text>
            <View style={styles.horizontalLine} /><Text/>
            {/* <View style={styles.timecard}>
                <Text>start: {event.eventTime} </Text>
            </View> */}
            </View>
            {/* <View style={styles.qrcard}>
            <QRCode
              value={`${event._id}`}
              size={120}
              style ={styles.qrimage} 
            />
            </View> */}
            </Card.Content>
          </Card>
          </>
     ):null}
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
    marginTop: 45,
    color: 'wheat',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
  },
  detailscard: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    padding:10,
    
  },
  timecard: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    padding:20,
    width:300,
    alignItems: 'center',
  },
  // qrcard: {
  //   marginBottom: 20,
  //   backgroundColor: '#fff',
  //   borderRadius: 8,
  //   elevation: 4,
  //   padding:100,
  //   margin:15,
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  horizontalLine: {
    borderBottomColor: '#334d50', 
    borderBottomWidth: 1,      
    
  },
});

export default UserEvent2;
