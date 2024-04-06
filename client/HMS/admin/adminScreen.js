import React, { useRef,useEffect, useState } from 'react';
import { View, Text, StyleSheet ,Image,Button,TouchableOpacity,DrawerLayoutAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CreateEvent from './createEvent';
import AdminEventList from './AdminEventList';
import EditEvent from './EditEvent';
// import StudentRegistration from './StudentForm';
import SignupScreen from '../signup';
import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';


// const SettingsScreen = ()=>{
//   const navigation = useNavigation();
//   const clearAsyncStorage = async () => {
//     try {
//       await AsyncStorage.clear();
//       console.log('cleared Async storage')
//       navigation.navigate('Home'); 
//     } catch (error) {
//       console.log('clearAsync error', error)
//     }
//   };
//   return(
//     <LinearGradient colors={['#606c88', '#3f4c6b']} style={styles.container}>
//         <Text>SettingsScreen</Text>
//         <Button title="Logout" onPress={clearAsyncStorage} /><Text/>
//     </LinearGradient>
//   )
// }


const HomeScreen = ({ route }) => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const drawer = useRef(null);
  // const navigation = useNavigation();
  useEffect(()=>{
    const emailget = async ()=>{
      try{
        const storedEmail = await AsyncStorage.getItem('userEmail');
        setEmail(storedEmail);
      }
      catch(Error){
        console.error('Error cannot get', Error)
      }
    }
    emailget()
    back()
  },[])

  const navigationView = () => (
    <View style={[styles.navigationcontainer]}>
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

<Text style={styles.paragraph}>Hi Warden!</Text>
<Text> </Text>
<Button
  title="Student Registeration"
  onPress={() => navigation.navigate("SignupScreen")}
/>
<Text> </Text>
<Button
  title="View Complaint"
  onPress={() => navigation.navigate("ViewComplaint")}
/>
<Text> </Text>
<Button
  title="Make Announcement"
  onPress={() => navigation.navigate("MakeAnnouncement")}
/>
    </View>
  );


  const back = () => {
    const backAction = () => {
      return true; 
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      backHandler.remove();
    };
  }

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('cleared Async storage')
      navigation.navigate('Home'); 
    } catch (error) {
      console.log('clearAsync error', error)
    }
  };

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      renderNavigationView={navigationView}
      drawerPosition="left"
    >
    
    <View style={styles.container}>
    <View style={{marginTop:30,width:30,height:30,marginTop:-200,marginLeft:-300}}>
        <Ionicons
          name="menu"
          size={35}
          color="white"
          style={styles.menuIcon}
          onPress={() => drawer.current.openDrawer()}
        />
         <TouchableOpacity style={styles.redButton} onPress={clearAsyncStorage}>
        <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity></View>
   
    <View style={{marginTop:140}}>
      <Text style={styles.text}>
        Welcome {email}
      </Text>
      <Image
        source={{ uri: 'https://cdn1.iconfinder.com/data/icons/delivery-logistics/512/delivery_date-512.png' }}
        style={{ width: 200, height: 200 }}
      />
    </View>
    </View>
    </DrawerLayoutAndroid>
  );
};

const AdminScreen = ({ route }) => {
  const Tab = createMaterialBottomTabNavigator()

  return (
    <Tab.Navigator 
    initialRouteName='Admin'
    activeColor='#D7D4DD'
    barStyle={{backgroundColor:'#838BC2'}}>
      <Tab.Screen 
        name='Admin'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={'#715C8C'} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name='Allocate Room'
        component={CreateEvent}
        options={{
          tabBarLabel: 'Allocate Room',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={'#715C8C'} size={26} />
          )
        }}
      />
      <Tab.Screen 
        name='History'
        component={AdminEventList}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={'#715C8C'} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name='EditRoom'
        component={EditEvent}
        options={{
          tabBarLabel: 'Edit Room',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={'#715C8C'} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen 
        name='Settings'
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={'#715C8C'} size={26} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    justifyContent: 'center',
     alignItems: 'center',
     backgroundColor:'#606c88'
  },
   navigationcontainer:{
    marginTop:50,
    justifyContent: 'center',
    alignItems: 'center',
   },
    redButton: {
    backgroundColor: '#F95450',
    padding: 10,
    marginTop:-30,
    borderRadius: 5,
    width: 70, 
    marginLeft:250,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  text:{
    color:'white',
    fontSize:25,
    fontWeight:'900'
  }
});
export default AdminScreen;