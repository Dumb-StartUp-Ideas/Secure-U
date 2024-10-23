import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Button
        title="Back to Login"
        onPress={() => navigation.replace('Login')} // Use replace to navigate back
      />
      <Text>Owner's Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
