import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FakeCallSettings = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        // Load the stored image on mount
        const loadImage = async () => {
            try {
                const savedImage = await AsyncStorage.getItem('fakeCallImage');
                if (savedImage) {
                    setSelectedImage({ uri: savedImage });
                }
            } catch (error) {
                console.error('Error loading image:', error);
            }
        };
        loadImage();
    }, []);

    const pickImage = async () => {
        try {
            // Request permission to access photos
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                alert('Permission to access the gallery is required!');
                return;
            }
    
            // Launch image picker
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
    
            console.log("Image Picker Result:", result); // Log result to check its content
    
            // Check if the user selected an image and the URI is defined in assets[0]
            if (!result.canceled && result.assets && result.assets[0].uri) {
                const selectedUri = result.assets[0].uri;
                setSelectedImage({ uri: selectedUri });
                console.log("Selected Image URI:", selectedUri); // Log the selected image URI
    
                // Save the image URI to AsyncStorage
                await AsyncStorage.setItem('fakeCallImage', selectedUri);
                console.log("Image saved to AsyncStorage");
            } else {
                console.log('Image selection was cancelled or no image selected.');
            }
        } catch (error) {
            console.error('Error selecting image:', error);
        }
    };
    
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fake Call Settings</Text>
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                {selectedImage ? (
                    <Image source={selectedImage} style={styles.image} />
                ) : (
                    <Text>Select Image</Text>
                )}
            </TouchableOpacity>
            <Button title="Change Image" onPress={pickImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    imagePicker: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default FakeCallSettings;
