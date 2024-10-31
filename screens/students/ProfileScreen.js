import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, Alert, Switch } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import AddContactScreen from './AddContactScreen';

const Stack = createStackNavigator();

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('Ananya Sharma');
  const [email, setEmail] = useState('ananya.sharma@gmail.com');
  const [college, setCollege] = useState('XYZ College of Engineering');
  const [contacts, setContacts] = useState([
    { id: '1', name: 'Mom', phone: '123-456-7890' },
    { id: '2', name: 'Best Friend', phone: '987-654-3210' },
  ]);
  const [bio, setBio] = useState('Passionate about technology and safety.');
  const [sosEnabled, setSosEnabled] = useState(false);
  const [locationSharingEnabled, setLocationSharingEnabled] = useState(false);
  const [hobbies, setHobbies] = useState('Reading, Traveling, Coding');
  const [recentActivities, setRecentActivities] = useState([
    { id: '1', activity: 'Attended a workshop on Cybersecurity' },
    { id: '2', activity: 'Volunteered at a local community center' },
  ]);
  const [isEditing, setIsEditing] = useState(false);

  const addContact = (newContact) => {
    setContacts((prevContacts) => [
      ...prevContacts,
      { id: String(prevContacts.length + 1), ...newContact },
    ]);
  };

  const openAddContactScreen = () => {
    navigation.navigate('AddContact', { addContact });
  };

  const saveProfile = () => {
    setIsEditing(false);
    Alert.alert('Profile Updated', 'Your profile information has been updated.');
  };

  const renderContactItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactName}>{item.name}:</Text>
      <Text style={styles.contactPhone}>{item.phone}</Text>
    </View>
  );

  const renderActivityItem = ({ item }) => (
    <View style={styles.activityItem}>
      <Ionicons name="checkmark-circle" size={20} color="#007BFF" />
      <Text style={styles.activityText}>{item.activity}</Text>
    </View>
  );

  const renderHeader = () => (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>Profile</Text>
      </View>

      <Image source={{ uri: 'https://images.pexels.com/photos/1287142/pexels-photo-1287142.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }} style={styles.coverPhoto} />
      <View style={styles.profilePictureContainer}>
        <Image source={{ uri: 'https://photosbook.in/wp-content/uploads/attitude-hide-face-girl-pic_33.webp' }} style={styles.profilePicture} />
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
        editable={isEditing}
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        editable={isEditing}
      />
      <TextInput
        style={styles.input}
        value={college}
        onChangeText={setCollege}
        placeholder="College Name"
        editable={isEditing}
      />
      <TextInput
        style={styles.input}
        value={bio}
        onChangeText={setBio}
        placeholder="Short Bio"
        editable={isEditing}
      />

      <Text style={styles.sectionTitle}>Safety Settings</Text>
      <View style={styles.setting}>
        <Text>Enable SOS Notifications</Text>
        <Switch
          value={sosEnabled}
          onValueChange={() => setSosEnabled(previousState => !previousState)}
        />
      </View>
      <View style={styles.setting}>
        <Text>Share Location Automatically</Text>
        <Switch
          value={locationSharingEnabled}
          onValueChange={() => setLocationSharingEnabled(previousState => !previousState)}
        />
      </View>

      <TextInput
        style={styles.input}
        value={hobbies}
        onChangeText={setHobbies}
        placeholder="Hobbies, Interests"
        editable={isEditing}
      />

      <Text style={styles.sectionTitle}>Emergency Contacts</Text>
    </View>
  );

  return (
    <FlatList
      data={contacts}
      renderItem={renderContactItem}
      keyExtractor={item => item.id}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={() => (
        <View>
          <TouchableOpacity style={styles.button} onPress={openAddContactScreen}>
            <Text style={styles.buttonText}>Add Contact</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <FlatList
            data={recentActivities}
            renderItem={renderActivityItem}
            keyExtractor={item => item.id}
          />

          {isEditing && (
            <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('Login')}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 5,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: '#fff',
  },
  coverPhoto: {
    width: '100%',
    height: 200,
    marginBottom: -100,
  },
  profilePictureContainer: {
    alignSelf: 'center',
    marginBottom: 15,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 20,
    elevation: 2,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    elevation: 2,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#007BFF',
    marginHorizontal: 20,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginHorizontal: 20,
  },
  contactName: {
    fontWeight: 'bold',
    color: '#333',
  },
  contactPhone: {
    color: 'gray',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 15,
    elevation: 2,
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginHorizontal: 20,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  activityText: {
    marginLeft: 10,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    elevation: 2,
    marginHorizontal: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    elevation: 2,
    marginHorizontal: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="AddContact" component={AddContactScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
