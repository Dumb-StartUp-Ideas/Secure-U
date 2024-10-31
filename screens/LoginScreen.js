import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#FEF9EF', '#FF9292', '#FF6B6B']}
        style={StyleSheet.absoluteFillObject}
      >
        {/* Decorative graphics for background */}
        <View style={styles.overlayGraphics}>
          <Image source={{ uri: 'https://your-graphic-url.com/background.png' }} style={styles.backgroundGraphic} />
        </View>

        <Animated.View style={{ ...styles.animatedView, opacity: fadeAnim }}>
          {/* Shield Icon with Scale Animation */}
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Image
              source={{ uri: 'https://your-shield-icon-url.com/shield.png' }}
              style={styles.icon}
              resizeMode="contain"
            />
          </Animated.View>
          <Text style={styles.appName}>SecureU</Text>
          <Text style={styles.tagline}>Your Guardian Angel</Text>

          {/* Role Selection Buttons */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => navigation.replace('Main', { userRole: 'owner' })}
            >
              <Text style={styles.buttonText}>Continue as Bodyguard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => navigation.replace('Main', { userRole: 'student' })}
            >
              <Text style={styles.buttonText}>Continue as Student</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayGraphics: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.1,
  },
  backgroundGraphic: {
    width: width * 1.5,
    height: height * 1.5,
    position: 'absolute',
  },
  animatedView: {
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  icon: {
    width: 90,
    height: 90,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  appName: {
    fontSize: 40,
    color: '#333333',
    fontWeight: '700',
    marginBottom: 5,
    fontFamily: 'sans-serif-medium',
  },
  tagline: {
    fontSize: 18,
    color: '#333333',
    opacity: 0.75,
    marginBottom: 40,
    fontFamily: 'sans-serif-light',
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#292929',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 10,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'sans-serif-medium',
    fontWeight: '600',
    letterSpacing: 1,
  },
});
