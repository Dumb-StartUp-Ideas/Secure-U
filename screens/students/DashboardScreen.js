import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, SafeAreaView, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

// Random name generator
const randomNames = ['MasalaMasti', 'GossipGiraffe', 'DesiDiva', 'PavBhajiPrincess', 'SareeNotSorry', 'GullyGirlGang', 'ChaatQueen'];

// Predefined avatar URLs
const avatarUrls = [
  'https://i.pinimg.com/enabled_lo/564x/46/85/b8/4685b808e3fa8bd75193de888630c2cc.jpg',
  'https://i.pinimg.com/enabled_lo/564x/21/07/fa/2107faa97e0d9ec867adbe3b9f15ec4f.jpg',
  'https://i.pinimg.com/enabled_lo/564x/e6/0c/8f/e60c8ffef573f1c67e6b90b02c442aee.jpg',
  'https://i.pinimg.com/564x/12/92/ff/1292ff25524589cdecf5c217fd03e71f.jpg',
  'https://i.pinimg.com/564x/6e/22/28/6e22280114e988da5687d15ad60e7bdf.jpg',
  'https://photosbook.in/wp-content/uploads/girl-dp10.jpg',
  'https://photosbook.in/wp-content/uploads/girl-dp89.jpg',
  'https://photosbook.in/wp-content/uploads/attitude-hide-face-girl-pic_33.webp',
];

// Generate random avatar URL
const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * avatarUrls.length);
  return avatarUrls[randomIndex];
};

// Label colors for categories
const labelColors = {
  'Safety': '#FF6B6B',
  'Health': '#4ECDC4',
  'Harassment': '#F7B731',
  'Wellness': '#A3CB38',
  'Support': '#575FCF',
  'Study Tips': '#F53B57',
  'Self-defense': '#1B9CFC'
};

const ForumScreen = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      label: 'Safety',
      text: 'What should I do if I feel unsafe?',
      upvotes: 5,
      comments: [
        "Trust your instincts! Always have a buddy system. If you're alone, stay in well-lit areas.",
        "Download safety apps like ‘SafeNow’. They can be lifesavers!",
        "Can anyone share their experiences? It helps to hear what others have gone through."
      ],
      username: 'MasalaMasti',
      avatar: getRandomAvatar(),
    },

    {
      id: 2,
      label: 'Health',
      text: 'Best ways to maintain mental health during exams?',
      upvotes: 12,
      comments: [
        "Meditation has been a game changer for me! Just 10 minutes a day can help.",
        "Don’t forget to take breaks! Even a 5-minute stretch can reset your mind.",
        "A good playlist can be therapeutic! Share your study songs?"
      ],
      username: 'GossipGiraffe',
      avatar: 'https://i.pinimg.com/enabled_lo/474x/0c/d5/9a/0cd59a8d2bb48f2e307c69d06b8f65d4.jpg',
    },

    {
      id: 3,
      label: 'Harassment',
      text: 'What are my options if I experience harassment?',
      upvotes: 8,
      comments: [
        "Talk to someone you trust about it; don't keep it bottled up.",
        "Check if your campus has resources or a counselor you can speak to.",
        "You're not alone; many others have experienced this too."
      ],
      username: 'BraveSoul',
      avatar: getRandomAvatar(),
    },
    {
      id: 4,
      label: 'Wellness',
      text: 'Any tips for managing stress?',
      upvotes: 15,
      comments: [
        "Daily journaling really helps to clear the mind.",
        "Go for a walk or do some light stretching!",
        "Try practicing mindfulness or breathing exercises."
      ],
      username: 'ZenGuru',
      avatar: getRandomAvatar(),
    },
    {
      id: 5,
      label: 'Support',
      text: 'How can I support a friend going through a tough time?',
      upvotes: 10,
      comments: [
        "Just be there to listen without judgment.",
        "Sometimes a simple message saying you care means a lot.",
        "Offer to go for coffee or a walk together."
      ],
      username: 'HelpingHand',
      avatar: getRandomAvatar(),
    },
    {
      id: 6,
      label: 'Study Tips',
      text: 'What are some good study techniques?',
      upvotes: 20,
      comments: [
        "Try the Pomodoro technique; it really helps with focus.",
        "Break down complex topics into simpler parts.",
        "Make sure to take regular breaks to avoid burnout."
      ],
      username: 'StudyMaster',
      avatar: getRandomAvatar(),
    },
    {
      id: 7,
      label: 'Self-defense',
      text: 'What are some essential self-defense tips?',
      upvotes: 25,
      comments: [
        "Stay aware of your surroundings at all times.",
        "Keep some self-defense tools like pepper spray.",
        "Remember, it’s better to escape than to engage."
      ],
      username: 'StreetSmart',
      avatar: getRandomAvatar(),
    },
    {
      id: 8,
      label: 'Health',
      text: 'How can I improve my sleep quality?',
      upvotes: 18,
      comments: [
        "Try to go to bed and wake up at the same time daily.",
        "Avoid screens an hour before bed, it really helps.",
        "Chamomile tea can be very calming before sleep."
      ],
      username: 'SleepyHead',
      avatar: getRandomAvatar(),
    },
    {
      id: 9,
      label: 'Safety',
      text: 'How can I feel safer when walking alone at night?',
      upvotes: 30,
      comments: [
        "Always let someone know where you are going.",
        "Stick to well-lit and populated areas.",
        "Carry a personal safety alarm or a whistle."
      ],
      username: 'NightWalker',
      avatar: getRandomAvatar(),
    },
    {
      id: 10,
      label: 'Wellness',
      text: 'What are good ways to relax after a stressful day?',
      upvotes: 12,
      comments: [
        "A warm bath and some soft music work wonders.",
        "Spend time with a pet or loved one.",
        "Read a book or engage in a creative hobby."
      ],
      username: 'ChillVibes',
      avatar: getRandomAvatar(),
    },
    {
      id: 11,
      label: 'Support',
      text: 'Where can I find resources for mental health support?',
      upvotes: 22,
      comments: [
        "Many campuses have free counseling services.",
        "Check out online platforms like BetterHelp or Talkspace.",
        "Don’t hesitate to reach out; there’s help available."
      ],
      username: 'MindfulBuddy',
      avatar: getRandomAvatar(),
    },
    {
      id: 12,
      label: 'Study Tips',
      text: 'Any suggestions for staying organized during the semester??',
      upvotes: 14,
      comments: [
        "Use a planner to jot down all your assignments and deadlines.",
        "Set aside some time each week to review your progress and adjust your goals.",
        "Declutter your study space often for a clear mind!"
      ],
      username: 'FocusedFox',
      avatar: getRandomAvatar(),
    }
    
    // Add other predefined posts as needed
  ]);

  const [showAddPost, setShowAddPost] = useState(false);
  const [newPostText, setNewPostText] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const [newComment, setNewComment] = useState('');
  const animatedValue = useState(new Animated.Value(0))[0];

  const toggleAddPost = () => {
    setShowAddPost(!showAddPost);
    Animated.timing(animatedValue, {
      toValue: showAddPost ? 0 : 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const formHeight = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250], // Adjust 250 to the height you want for the expanded form
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Add new post function
  const addPost = () => {
    if (newPostText && selectedLabel) {
      const newPost = {
        id: posts.length + 1,
        label: selectedLabel,
        text: newPostText,
        upvotes: 0,
        comments: [],
        username: randomNames[Math.floor(Math.random() * randomNames.length)],
        avatar: getRandomAvatar(),
      };
      setPosts([...posts, newPost]);
      setNewPostText('');
      setSelectedLabel('');
      toggleAddPost(); // Close the add post form after submission
    }
  };

  const renderPost = ({ item }) => (
    <View style={styles.postItem}>
      {/* Label with colored background */}
      <View style={[styles.labelContainer, { backgroundColor: labelColors[item.label] || '#ddd' }]}>
        <Text style={styles.labelText}>{item.label}</Text>
      </View>
      <View style={styles.userInfo}>
        <Image source={{ uri: item.avatar }} style={styles.profilePicture} />
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <Text style={styles.postText}>{item.text}</Text>
      <View style={styles.postFooter}>
        <TouchableOpacity>
          <Ionicons name="arrow-up-circle" size={24} color="green" />
        </TouchableOpacity>
        <Text style={styles.upvoteText}>{item.upvotes} Upvotes</Text>
      </View>
    </View>
  );
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
        />

        {/* Floating Action Button */}
        <TouchableOpacity style={styles.fab} onPress={toggleAddPost}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>

        {/* Animated Add Post Form */}
        <Animated.View style={[styles.newPostContainer, { height: formHeight, opacity }]}>
          {showAddPost && (
            <View>
              <TextInput
                placeholder="Write a post"
                value={newPostText}
                onChangeText={setNewPostText}
                style={styles.newPostInput}
              />
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedLabel}
                  onValueChange={(itemValue) => setSelectedLabel(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select a label" value="" />
                  {/* Add picker options for labels */}
                </Picker>
              </View>
              <TouchableOpacity style={styles.submitButton} onPress={addPost}>
                <Text style={styles.submitButtonText}>Submit Post</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  flatListContent: { paddingBottom: 100 },

  labelContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  labelText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  postItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  label: { fontWeight: 'bold', color: '#333' },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  profilePicture: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  username: { fontWeight: 'bold', color: '#333' },
  postText: { marginVertical: 10, color: '#555' },
  postFooter: { flexDirection: 'row', alignItems: 'center' },
  upvoteText: { marginLeft: 10, color: 'gray' },

  // Floating Action Button style
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  // Animated Add Post form styles
  newPostContainer: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  newPostInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: { height: 50, width: '100%' },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default ForumScreen;
