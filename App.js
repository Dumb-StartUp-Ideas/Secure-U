import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// Import screens
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/owners/ProfileScreen';
import HomeScreen from './screens/owners/HomeScreen';

// Import student screens
import StudentDashboardScreen from './screens/students/DashboardScreen';
import StudentProfileScreen from './screens/students/ProfileScreen';
import StudentHomeScreen from './screens/students/HomeScreen';
import FakeCallSettings from './screens/students/FakeCallSettings';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define Student Tab Navigator
function StudentTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={StudentHomeScreen}
        options={{ headerShown: false, tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="Forum"
        component={StudentDashboardScreen}
        options={{ headerShown: false, tabBarIcon: ({ color, size }) => <Octicons name="comment-discussion" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={StudentProfileScreen}
        options={{ headerShown: false, tabBarIcon: ({ color, size }) => <MaterialIcons name="person" size={size} color={color} /> }}
      />
    </Tab.Navigator>
  );
}

// Wrap Student Tab Navigator in a Stack Navigator to Include FakeCallSettings
function StudentStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="StudentTabs" component={StudentTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="FakeCallSettings" component={FakeCallSettings} options={{ title: 'Fake Call Settings' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
        >
          {({ route }) => {
            const { userRole } = route.params || {};
            return userRole === 'owner' ? <OwnerTabNavigator /> : <StudentStackNavigator />;
          }}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
