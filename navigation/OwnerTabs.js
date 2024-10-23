// OwnerTabs.js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/owner/HomeScreen';
import DashboardScreen from '../screens/owner/DashboardScreen';
import AttendanceScreen from '../screens/owner/AttendanceScreen';
import ProfileScreen from '../screens/owner/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function OwnerTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Responses" component={HomeScreen} />
            <Tab.Screen name="History" component={DashboardScreen} />
            {/* <Tab.Screen name="Mark Attendance" component={AttendanceScreen} /> */}
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
