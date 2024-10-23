import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
import {Modal} from 'react-native-modal';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';

const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');

  // Handle SOS Button Press
  const handleSOSPress = async () => {
    // Request location permissions
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    // Get current location
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const message = `Emergency! My location: ${locationUrl}. Please assist me!`;

    // Check if there are contacts to send SMS to
    if (contacts.length === 0) {
      Alert.alert('No Contacts', 'Please add at least one emergency contact before sending an SOS.');
      return;
    }

    // Send SMS to all contacts
    const smsResults = await SMS.sendSMSAsync(
      contacts.map(contact => contact.number), 
      message
    );

    if (smsResults.result === 'sent') {
      Alert.alert('SOS sent', 'Location sent to your emergency contacts');
    } else {
      Alert.alert('Error', 'Failed to send SMS');
    }
  };

  // Add new contact to the list
  const addContact = () => {
    if (newContactName && newContactNumber) {
      setContacts([...contacts, { name: newContactName, number: newContactNumber }]);
      setNewContactName('');
      setNewContactNumber('');
      setModalVisible(false);
    } else {
      Alert.alert('Invalid Input', 'Please enter a valid name and phone number');
    }
  };

  // Open or close the modal for adding a contact
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Render individual contact
  const renderContact = ({ item }) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactText}>{item.name}: {item.number}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* SOS Button */}
      <TouchableOpacity style={styles.sosButton} onPress={handleSOSPress}>
        <Text style={styles.sosButtonText}>SOS</Text>
      </TouchableOpacity>

      {/* Contacts List */}
      <View style={styles.contactsContainer}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        <FlatList
          data={contacts}
          renderItem={renderContact}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Text style={styles.emptyList}>No contacts added yet.</Text>}
        />
        <TouchableOpacity style={styles.addContactButton} onPress={toggleModal}>
          <Text style={styles.addContactText}>+ Add Contact</Text>
        </TouchableOpacity>
      </View>

      {/* Add Contact Modal */}
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Enter name"
            value={newContactName}
            onChangeText={setNewContactName}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={newContactNumber}
            onChangeText={setNewContactNumber}
            style={styles.input}
          />
          <TouchableOpacity style={styles.addButton} onPress={addContact}>
            <Text style={styles.addButtonText}>Add Contact</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  sosButton: {
    backgroundColor: 'red',
    paddingVertical: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    elevation: 5,
  },
  sosButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  contactsContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  contactText: {
    fontSize: 16,
  },
  emptyList: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  addContactButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addContactText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
