import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import ContactList from '../../components/SOSScreen/ContactList';
import LogoutButton from './FakeCallButton';

const SOSScreen = () => {
  const [contacts, setContacts] = useState([
    { id: '1', name: 'Mom', phone: '123-456-7890' },
    { id: '2', name: 'Best Friend', phone: '987-654-3210' }
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
      }
    };

    requestPermissions();
  }, []);

  const handleSOSPress = async () => {
    setLoading(true);

    try {
      // Get current location
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
      const message = `Emergency! My location: ${locationUrl}. Please assist me!`;

      // Check if there are contacts to send SMS to
      if (contacts.length === 0) {
        Alert.alert('No Contacts', 'Please add at least one emergency contact before sending an SOS.');
        setLoading(false);
        return;
      }

      // Send SMS to all contacts
      const smsResults = await SMS.sendSMSAsync(
        contacts.map(contact => contact.phone), 
        message
      );

      if (smsResults.result === 'sent') {
        Alert.alert('SOS sent', 'Location sent to your emergency contacts');
      } else {
        Alert.alert('Error', 'Failed to send SMS');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to get location or send SMS');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.sosButton} onPress={handleSOSPress} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text style={styles.sosButtonText}>SOS</Text>
          )}
        </TouchableOpacity>
        <ContactList contacts={contacts} />
        <LogoutButton />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  sosButton: {
    backgroundColor: 'red',
    width: 250,
    height: 250,
    borderRadius: 125,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  sosButtonText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
});

export default SOSScreen;