
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, VirtualizedList } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
 const QrScan= () => {
  const [events, setEvents] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [display,setDisplay] = useState(true);

  const navigation = useNavigation();
  const handleBarCodeScanned = ({ type, data }) => {
    setScannedData(data);
    if (!isScanning) {
      BarCodeScanner.reinitializeAsync().then(() => {
        setIsScanning(true);
      });
    }
  };

  useEffect(() => {
    axios.get('/auth/eventRegFetch')
    .then((response) => {
      const matchingEvent = response.data.find(event => event._id === scannedData);

      if (matchingEvent) {
        setEvents(matchingEvent);

      } else {
        setEvents([]); 
      }
    })
    .catch((error) => {
      console.error('Error fetching event data', error);
    });
    if (scannedData) {
      // console.log('EventId: ', scannedData);
    }
  }, [scannedData]);
  

  const startScanning = () => {
    setIsScanning(true);
    setScannedData(null); 
  };

  const stopScanning = () => {
    setIsScanning(false);
    setDisplay(false)
  };

  return (
    <View style={styles.container}>
         {scannedData && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>EventId: {scannedData}</Text>
          {events && (
            <View>
            <Text>Name: {events.name}</Text>
            <Text>Event Name: {events.eventName}</Text>
            <Text>Event Date: {events.eventDate}</Text>
            <Text style={{color:'green',fontWeight:'bold'}}>{events.status}</Text>
            </View>
          )}
        </View>
      )}
      <View style={styles.scannerContainer}>
        {isScanning && (
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        )}
      </View>

     {display &&(
      <Button
        title={isScanning ? 'Stop Scanning' : 'Start Scanning'}
        onPress={isScanning ? stopScanning : startScanning}
      />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#333F63'
  },
  scannerContainer: {
    width: 250, 
    height: 250,
    overflow: 'hidden',
    marginBottom: 10,
  },
  dataContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
  dataText: {
    fontSize: 18,
  },
});

export default QrScan;