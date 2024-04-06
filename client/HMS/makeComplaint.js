// MakeAnnouncement.js

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';

  import axios from 'axios';

const MakeComplaint = () => {
  const [mtext, setMtext] = useState('');
  const [editable, setEditable] = useState(false);

  const handlePress = () => {
    setEditable(true);
  };

  const sendAnnouncement = async () => {
    try {
      console.log(mtext);
      const response = await axios.post('/auth/complaint', { mtext });
       

      if (response.status === 201) {
        Alert.alert('Success', 'Complaint sent successfully');
      } else {
        Alert.alert('Error', 'Failed to send announcement');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send announcement');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
        {editable ? (
          <TextInput
            style={styles.input}
            placeholder="Type here..."
            onChangeText={(t)=>setMtext(t)}
            value={mtext}
            autoFocus={true}
            multiline={true}
          />
        ) : (
          <TextInput
            style={[styles.input, styles.nonEditableInput]}
            placeholder="Tap here to start typing"
            onChangeText={(t)=>setMtext(t)}
            editable={false}
          />
        )}
      </TouchableOpacity>
      {editable && (
        <TouchableOpacity style={styles.submitButton} onPress={sendAnnouncement}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.25, // For iOS shadow
    shadowRadius: 3.84, // For iOS shadow
    padding: 10,
    width: '80%',
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  nonEditableInput: {
    color: '#888',
  },
  submitButton: {
    backgroundColor: 'blue',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MakeComplaint;
