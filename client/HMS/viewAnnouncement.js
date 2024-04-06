import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const ViewAnnouncement = () => {
  const [latestAnnouncement, setLatestAnnouncement] = useState('');

  useEffect(() => {
    const fetchLatestAnnouncement = async () => {
      try {
        const response = await axios.get('/auth/viewannouncement');
        // Assuming the backend API returns announcements sorted by timestamp in descending order
        const sortedAnnouncements = response.data.reverse();
        const latestText = sortedAnnouncements.length > 0 ? sortedAnnouncements[0].text : '';
        setLatestAnnouncement(latestText);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLatestAnnouncement();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Latest Announcement</Text>
      <Text style={styles.announcement}>{latestAnnouncement}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  announcement: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ViewAnnouncement;
