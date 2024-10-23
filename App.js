import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialIcons} from '@expo/vector-icons';
import Octicons from '@expo/vector-icons/Octicons';

// Import screens
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/owners/DashboardScreen';
import AttendanceScreen from './screens/owners/AttendanceScreen';
import ProfileScreen from './screens/owners/ProfileScreen';
import HomeScreen from './screens/owners/HomeScreen';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// Import student screens
import StudentDashboardScreen from './screens/students/DashboardScreen';
import StudentAttendanceScreen from './screens/students/AttendanceScreen';
import StudentProfileScreen from './screens/students/ProfileScreen';
import StudentHomeScreen from './screens/students/HomeScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define Owner Tab Navigator
function OwnerTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Response" 
        component={HomeScreen} 
        options={{ tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} /> }} 
      />
      <Tab.Screen 
        name="History" 
        component={DashboardScreen} 
        options={{ tabBarIcon: ({ color, size }) => <FontAwesome5 name="history" size={size} color={color} /> }} 
      />
      {/* <Tab.Screen 
        name="Attendance" 
        component={AttendanceScreen} 
        options={{ tabBarIcon: ({ color, size }) => <MaterialIcons name="check-circle" size={size} color={color} /> }} 
      /> */}
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarIcon: ({ color, size }) => <MaterialIcons name="person" size={size} color={color} /> }} 
      />
    </Tab.Navigator>
  );
}

// Define Student Tab Navigator
function StudentTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={StudentHomeScreen} 
        options={{ tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} /> }} 
      />
      <Tab.Screen 
        name="Forum" 
        component={StudentDashboardScreen} 
        options={{ tabBarIcon: ({ color, size }) => <Octicons name="comment-discussion" size={size} color={color} /> }} 
      />
      {/* <Tab.Screen 
        name="Attendance" 
        component={StudentAttendanceScreen} 
        options={{ tabBarIcon: ({ color, size }) => <MaterialIcons name="check-circle" size={size} color={color} /> }} 
      /> */}
      <Tab.Screen 
        name="Profile" 
        component={StudentProfileScreen} 
        options={{ tabBarIcon: ({ color, size }) => <MaterialIcons name="person" size={size} color={color} /> }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* Add a Main screen for redirection based on userRole */}
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={({ route }) => {
            const { userRole } = route.params || {};
            return userRole === 'owner' ? <OwnerTabNavigator /> : <StudentTabNavigator />;
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
