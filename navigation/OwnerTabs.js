// OwnerTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/owners/HomeScreen';
import DashboardScreen from '../screens/owners/DashboardScreen';
import AttendanceScreen from '../screens/owners/AttendanceScreen';
import ProfileScreen from '../screens/owners/ProfileScreen';
import { View, Button } from 'react-native';

const Tab = createBottomTabNavigator();

export default function OwnerTabs({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator>
                <Tab.Screen name="Responses" component={HomeScreen} />
                <Tab.Screen name="History" component={DashboardScreen} />
                {/* Uncomment if needed */}
                {/* <Tab.Screen name="Mark Attendance" component={AttendanceScreen} /> */}
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
            <Button
                title="Back to Login"
                onPress={() => {
                    // This will replace the current route with the LoginScreen
                    navigation.replace('Login');
                }}
            />
        </View>
    );
}
