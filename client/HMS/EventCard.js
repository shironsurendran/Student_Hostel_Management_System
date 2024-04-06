import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const EventCard = ({ events }) => {
  const navigation = useNavigation();
  const [selectedCard, setSelectedCard] = useState(null);
  const [nowTime,SetNowTime] = useState();
  const [nowDate,SetNowDate] = useState();

  useEffect(()=>{
    const changeTime = () => {
      const currentDate = new Date();
      const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
      };
      const formattedTime = currentDate.toLocaleTimeString('en-In', timeOptions);
      const dateOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      };
      const formattedDate = currentDate.toLocaleDateString('en-IN', dateOptions);
      SetNowTime(formattedTime);
      SetNowDate(formattedDate);
    };
    changeTime();
    const interval = setInterval(changeTime, 60000);
    return () => clearInterval(interval);
  },[nowTime]);

  const onCardPress = (item) => {
    navigation.navigate('RoomDetails', { event: item });
  };
  
  const renderCard = ({ item, index }) => {
    const isCardSelected = selectedCard === index;
    const eventTime = item.eventTime;
    const isEventOver = eventTime <= nowTime;
    const EventDate = item.eventDate;
    const eventEndDate = EventDate === nowDate;
    if (!isEventOver || !eventEndDate) {
      return (
        <TouchableOpacity onPress={() => onCardPress(item)}>
          <Animatable.View
            animation={isCardSelected ? 'zoomIn' : null}
            duration={500}
            style={[
              styles.card,
              isCardSelected && styles.selectedCard,
            ]}
          >
            {/* <Image source={{ uri: item.eventImage }} style={styles.image} /> */}
            <Text style={styles.title}>{item.eventName}</Text>
            <Text style={styles.text}>Date: {item.eventDate}</Text>
            <Text style={styles.text}>Hostel Name: {item.eventLocation}</Text>
            <Text style={styles.text}>Room No: {item.eventDescription}</Text>
            <Text style={styles.text}>Block Name: {item.eventImage}</Text>
            <Text style={styles.text}>Room Preference: {item.room}</Text>
          </Animatable.View>
        </TouchableOpacity>
      );
    } else {
      return null; 
    }
  };

  return (
    <FlatList
      data={events}
      renderItem={renderCard}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#D6DFE0',
    borderRadius: 15,
    padding: 3,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: '#fff',
  },
  selectedCard: {
    transform: [{ scale: 1.1 }],
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#54086B',
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 15,
  },
  text: {
    marginLeft: 10,
    marginTop: 5,
  },
});

export default EventCard;
