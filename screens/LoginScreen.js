import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>
      <Button
        title="Continue as Owner"
        onPress={() => navigation.replace('Main', { userRole: 'owner' })} // Navigate to Owner Tabs
      />
      <Button
        title="Continue as Student"
        onPress={() => navigation.replace('Main', { userRole: 'student' })} // Navigate to Student Tabs
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});
