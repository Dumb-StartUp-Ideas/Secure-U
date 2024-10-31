import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FakeCallButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [callerImage, setCallerImage] = useState(null);
  const [isVibrating, setIsVibrating] = useState(false);

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
    setIsVibrating(true);
  };

  const stopCall = () => {
    setModalVisible(false);
    setIsVibrating(false);
    Vibration.cancel();
  };

  useEffect(() => {
    if (isVibrating) {
      const intervalId = setInterval(() => {
        Vibration.vibrate([500, 500, 500]);
      }, 1500);

      // Clear interval on cleanup when vibration stops
      return () => clearInterval(intervalId);
    }
  }, [isVibrating]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fakeCallButton} onPress={handleFakeCallPress}>
        <Text style={styles.fakeCallButtonText}>Fake Call</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => stopCall()}
      >
        <View style={styles.fullScreenContainer}>
          <View style={styles.callerInfoContainer}>
            {callerImage ? (
              <Image source={callerImage} style={styles.callerImage} />
            ) : (
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
                style={styles.callerImage}
              />
            )}
            <Text style={styles.callerName}>Incoming Call...</Text>
            <Text style={styles.callerId}>Unknown</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.acceptButton} onPress={() => stopCall()}>
              <Image
                source={{ uri: 'https://img.icons8.com/color/48/000000/phone.png' }}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.declineButton} onPress={() => stopCall()}>
              <Image
                source={{ uri: 'https://img.icons8.com/color/48/000000/end-call.png' }}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fakeCallButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 20,
    elevation: 5,
  },
  fakeCallButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callerInfoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  callerImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  callerName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  callerId: {
    fontSize: 18,
    color: '#bbb',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
  },
  acceptButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  declineButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default FakeCallButton;
