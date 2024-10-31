import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FakeCallButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [callerImage, setCallerImage] = useState(null);

  // Function to load the caller image from AsyncStorage
  const loadCallerImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem('fakeCallImage');
      if (savedImage) {
        setCallerImage({ uri: savedImage });
      }
    } catch (error) {
      console.error("Failed to load caller image", error);
    }
  };

  useEffect(() => {
    // Load the image initially when the component mounts
    loadCallerImage();
  }, []);

  const handleFakeCallPress = async () => {
    // Reload the image from AsyncStorage every time the fake call is pressed
    await loadCallerImage();
    setModalVisible(true);
    Vibration.vibrate([500, 500, 500]); // Vibration pattern
    setTimeout(() => {
      setModalVisible(false);
    }, 5000); // Simulate a 5-second call
  };

  return (
    <View>
      <TouchableOpacity style={styles.fakeCallButton} onPress={handleFakeCallPress}>
        <Text style={styles.fakeCallButtonText}>Fake Call</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {callerImage ? (
              <Image source={callerImage} style={styles.callerImage} />
            ) : (
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
                style={styles.callerImage}
              />
            )}
            <Text style={styles.modalTitle}>Incoming Call...</Text>
            <Text style={styles.modalCaller}>Unknown</Text>
            <View style={styles.callButtonsContainer}>
              <TouchableOpacity style={styles.acceptCallButton} onPress={() => setModalVisible(false)}>
                <Image
                  source={{ uri: 'https://img.icons8.com/color/48/000000/phone.png' }}
                  style={styles.callButtonIcon}
                />
                <Text style={styles.acceptCallButtonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.declineCallButton} onPress={() => setModalVisible(false)}>
                <Image
                  source={{ uri: 'https://img.icons8.com/color/48/000000/end-call.png' }}
                  style={styles.callButtonIcon}
                />
                <Text style={styles.declineCallButtonText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  fakeCallButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  fakeCallButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  callerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalCaller: {
    fontSize: 18,
    marginBottom: 20,
  },
  callButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  acceptCallButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  acceptCallButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  declineCallButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  declineCallButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  callButtonIcon: {
    width: 24,
    height: 24,
  },
});

export default FakeCallButton;
