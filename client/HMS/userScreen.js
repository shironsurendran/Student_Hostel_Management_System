import React from 'react';
import { useState,useEffect,useRef } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, StyleSheet,TextInput,Button,DrawerLayoutAndroid,TouchableOpacity ,Image} from 'react-native';
import EventCard from './EventCard';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserEventList from './userEvent';
import { LinearGradient } from 'expo-linear-gradient';
import SettingsScreen from './userProfile';
import { FontAwesome } from '@expo/vector-icons';


const UserTabScreen = ({ route }) => {
  const [token, setToken] = useState();
  const [name, setName] = useState('');
  const [eventData, setEventData] = useState([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const drawer = useRef(null);

  const fetchData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      setToken(storedToken);

      // Fetch user data
      const userResponse = await axios.post('/auth/user', { token });

      if (userResponse.status === 200) {
        setName(userResponse.data.user.name);
      } else {
        console.error('An error occurred while fetching user data');
      }

      // Fetch event data
      const eventResponse = await axios.get('/auth/eventfetch');

      if (eventResponse.status === 200) {
        setEventData(eventResponse.data);
      } else {
        console.error('An error occurred while fetching event data');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
    back();
  }, [fetchData]);
  
const back = () => {
    const backAction = () => {
      return true; 
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      backHandler.remove();
    };
  }

  const filteredEvents = eventData.filter((event) =>
    event.eventName.toLowerCase().includes(search.toLowerCase())
  );

  const navigationView = () => (
    <View style={[styles.navigationContainer]}>
      {/* <FontAwesome name="user-circle-o" size={80} color="#0a7e8c" style={styles.searchIcon} /> */}
      {/* <Text style={styles.text}>{userDetails.name}</Text>
      <Text style={styles.text}>{userDetails.email}</Text> */}
      {/* <TouchableOpacity>
        <Text style={[styles.text2, styles.profileText]}>PROFILE</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity> */}
      <Image source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRormNx-cWkV0Ggs-j5Jnk6g6x7JSyVqRh7uA&usqp=CAU"}} style={{height:100,width:100,borderRadius:50}}/>

<Text style={styles.paragraph}>Hi {name}!</Text>
<Text> </Text>
<Button
  title="Make Complaint"
  onPress={() => navigation.navigate("MakeComplaint")}
/>
<Text> </Text>
<Button
  title="View Announcement"
  onPress={() => navigation.navigate("ViewAnnouncement")}
/>
    </View>
  );
  return (
    <DrawerLayoutAndroid
    ref={drawer}
    drawerWidth={300}
    renderNavigationView={navigationView}
    drawerPosition="left"
  >
    <LinearGradient colors={['#715C8C','#333F63', '#B6CBE1']}  style={styles.container}>
    <Ionicons
          name="menu"
          size={35}
          color="white"
          style={styles.menuIcon}
          onPress={() => drawer.current.openDrawer()}
        />
      <Text style={styles.text}>Welcome, {name}!</Text>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search room by name"
          onChangeText={(text) => setSearch(text)}
          value={search}
          placeholderTextColor="#aaa"
        />
      </View>
      <EventCard  events={filteredEvents} />
    {/* </View> */}
    </LinearGradient>
    </DrawerLayoutAndroid>
  );
};


const Tab = createMaterialBottomTabNavigator();

const UserScreen = ({ route }) => {
  const userEmail = route.params.userEmail;
  const userName = route.params.userName;

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="User"
        component={UserTabScreen}
        initialParams={{ userName, userEmail }}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={'#715C8C'} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Registered Room"
        component={UserEventList}
        initialParams={{ userName, userEmail }}
        options={{
          tabBarLabel: 'Registered Room',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={'#715C8C'} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        initialParams={{ userName, userEmail }}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={'#715C8C'} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    // flex: 1,
    // backgroundColor: '#955670',
    justifyContent: 'center',
    alignItems:"center",
    marginTop:50
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  text: {
    paddingBottom: 50,
    fontWeight: '700',
    fontSize: 20,
    color: '#F3E1C0',
    textAlign: 'center',
    marginTop: 80,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbcaa5',
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
  menuIcon: {
    // backgroundColor:"red",
    marginTop:50,
    marginBottom:-100
    // position: 'absolute',
    // left: 10w6,
    // top: -30,
  },
});

export default UserScreen;