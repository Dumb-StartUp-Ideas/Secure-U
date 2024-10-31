import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StudentTabs from './StudentTabs';
import FakeCallSettings from '../screens/students/FakeCallSettings';

const Stack = createStackNavigator();

export default function StudentStack() {
    return (
        <Stack.Navigator>
            {/* Main Tab Navigator for Student */}
            <Stack.Screen 
                name="StudentTabs" 
                component={StudentTabs} 
                options={{ headerShown: false }} 
            />
            {/* Add Fake Call Settings Screen */}
            <Stack.Screen 
                name="FakeCallSettings" 
                component={FakeCallSettings} 
                options={{ title: 'Fake Call Settings' }} 
            />
        </Stack.Navigator>
    );
}
