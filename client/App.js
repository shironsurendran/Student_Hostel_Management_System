import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './HMS/signup';
import LoginScreen from './HMS/signin';
import HomeScreen from './HMS/home';
import UserLog from './HMS/user';
import UserScreen from './HMS/userScreen';
import AdminLogin from './HMS/admin';
import AdminScreen from './HMS/admin/adminScreen';
import EventDetailsScreen from './HMS/eventdetails';
import UserEvent2 from './HMS/userEvent2';
import axios from 'axios'
import MakeAnnouncement from './HMS/makeAnnouncement';
import ViewAnnouncement from './HMS/viewAnnouncement';
import MakeComplaint from './HMS/makeComplaint';
import ViewComplaint from './HMS/viewComplaint';
const Stack = createNativeStackNavigator();
axios.defaults.baseURL = 'http://192.168.241.127:4000';

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Hostel Management System' }} />
        <Stack.Screen name="SignupScreen" component={SignupScreen}   />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="User" component={UserLog} />
        <Stack.Screen name="Admin" component={AdminLogin} />
        <Stack.Screen name="RoomDetails" component={EventDetailsScreen} />
        <Stack.Screen name="YourRoom" component={UserEvent2} />
        <Stack.Screen name="MakeAnnouncement" component={MakeAnnouncement}/>
        <Stack.Screen name="ViewAnnouncement" component={ViewAnnouncement}/>
        <Stack.Screen name="MakeComplaint" component={MakeComplaint}/>
        <Stack.Screen name="ViewComplaint" component={ViewComplaint}/>
        <Stack.Screen name="AdminScreen" component={AdminScreen} options={{headerShown:false}} />
        <Stack.Screen name="UserScreen" component={UserScreen} options={{ title: 'Hostel Management System', headerShown: false }} />       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;








//created by shiron


