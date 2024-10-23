import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

// Random name generator
const randomNames = ['MasalaMasti', 'GossipGiraffe', 'DesiDiva', 'PavBhajiPrincess', 'SareeNotSorry', 'GullyGirlGang', 'ChaatQueen'];

// Predefined avatar URLs
const avatarUrls = [
  'https://i.pinimg.com/enabled_lo/564x/46/85/b8/4685b808e3fa8bd75193de888630c2cc.jpg',
  'https://i.pinimg.com/enabled_lo/564x/21/07/fa/2107faa97e0d9ec867adbe3b9f15ec4f.jpg',
  'https://i.pinimg.com/enabled_lo/564x/e6/0c/8f/e60c8ffef573f1c67e6b90b02c442aee.jpg',
  'https://i.pinimg.com/enabled_lo/564x/12/92/ff/1292ff25524589cdecf5c217fd03e71f.jpg',
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
      avatar: 'https://photosbook.in/wp-content/uploads/attitude-hide-face-girl-pic_33.webp',
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
      text: 'How do I report harassment?',
      upvotes: 8,
      comments: [
        "It's crucial to speak up! Document everything and approach a trusted faculty member.",
        "Check your college’s guidelines. They usually have specific procedures in place.",
        "Let’s create a supportive community where we can discuss our experiences openly."
      ],
      username: 'DesiDiva',
      avatar: 'https://i.pinimg.com/enabled_lo/564x/21/07/fa/2107faa97e0d9ec867adbe3b9f15ec4f.jpg',
    },
    {
      id: 4,
      label: 'Wellness',
      text: 'Any recommendations for relaxation?',
      upvotes: 7,
      comments: [
        "Have you tried yoga? It’s incredibly calming!",
        "Self-care days are essential! Bubble baths and good books do wonders.",
        "I love painting! It helps to express and release pent-up stress."
      ],
      username: 'PavBhajiPrincess',
      avatar: 'https://i.pinimg.com/enabled_lo/564x/e6/0c/8f/e60c8ffef573f1c67e6b90b02c442aee.jpg',
    },
    {
      id: 5,
      label: 'Support',
      text: 'Who can I talk to about personal issues?',
      upvotes: 10,
      comments: [
        "Counseling services are often free on campus! Don't hesitate to reach out.",
        "Sometimes talking to friends can help! A cup of chai and a chat can do miracles.",
        "Consider finding a mentor! Having someone who’s been through it can really guide you."
      ],
      username: 'SareeNotSorry',
      avatar: 'https://i.pinimg.com/564x/6e/22/28/6e22280114e988da5687d15ad60e7bdf.jpg',
    },
    {
      id: 6,
      label: 'Study Tips',
      text: 'Best time management tips for students?',
      upvotes: 15,
      comments: [
        "Try the Pomodoro technique! It’s super effective for keeping focused.",
        "Setting small, achievable goals each day can keep you motivated.",
        "Don't forget to prioritize! Identify your most important tasks and tackle those first."
      ],
      username: 'GullyGirlGang',
      avatar: 'https://i.pinimg.com/enabled_lo/564x/12/92/ff/1292ff25524589cdecf5c217fd03e71f.jpg',
    },
    {
      id: 7,
      label: 'Self-defense',
      text: 'Any tips on self-defense?',
      upvotes: 18,
      comments: [
        "Taking self-defense classes can boost your confidence and teach you valuable skills.",
        "Always be aware of your surroundings. A strong posture can deter unwanted attention.",
        "Remember, it’s about escaping a situation, not about fighting! Focus on getting away."
      ],
      username: 'ChaatQueen',
      avatar: 'https://i.pinimg.com/736x/ad/7f/5d/ad7f5d4bb3d61aefe76bd5f06c92034d.jpg',
    },
  ]);

  const [newPostText, setNewPostText] = useState('');
  const [newComment, setNewComment] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const [showAddPost, setShowAddPost] = useState(false);
  const [labelOptions] = useState(['Safety', 'Health', 'Harassment', 'Wellness', 'Support', 'Study Tips', 'Self-defense']);

  // Assign random colors to labels
  const labelColors = {
    'Safety': '#FF6B6B',
    'Health': '#4ECDC4',
    'Harassment': '#F7B731',
    'Wellness': '#A3CB38',
    'Support': '#575FCF',
    'Study Tips': '#F53B57',
    'Self-defense': '#1B9CFC'
  };

  // Generate random username
  function getRandomUsername() {
    return randomNames[Math.floor(Math.random() * randomNames.length)];
  }

  // Add new post with selected label
  const addPost = () => {
    if (newPostText && selectedLabel) {
      setPosts([...posts, { id: posts.length + 1, label: selectedLabel, text: newPostText, upvotes: 0, comments: [], username: getRandomUsername(), avatar: 'https://randomuser.me/api/portraits/women/8.jpg' }]);
      setNewPostText('');
      setSelectedLabel('');
      setShowAddPost(false); // Hide add post fields after submission
    }
  };

  // Add new comment, preventing empty comments
  const addComment = (postId) => {
    if (newComment) {
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      });
      setPosts(updatedPosts);
      setNewComment('');
    }
  };

  // Upvote a post
  const upvotePost = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, upvotes: post.upvotes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  // Render post with label, username, comments, and upvote functionality
  const renderPost = ({ item }) => (
    <View style={styles.postItem}>
      <View style={[styles.label, { backgroundColor: labelColors[item.label] }]}>
        <Text style={styles.labelText}>{item.label}</Text>
      </View>
      <View style={styles.userInfo}>
        <Image source={{ uri: item.avatar }} style={styles.profilePicture} />
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <Text style={styles.postText}>{item.text}</Text>
      <View style={styles.postFooter}>
        <TouchableOpacity onPress={() => upvotePost(item.id)}>
          <Ionicons name="arrow-up-circle" size={24} color="green" />
        </TouchableOpacity>
        <Text style={styles.upvoteText}>{item.upvotes} Upvotes</Text>
      </View>
      <FlatList
        data={item.comments}
        renderItem={({ item }) => <Text style={styles.comment}>{item}</Text>}
        keyExtractor={(comment, index) => index.toString()}
      />
      <View style={styles.commentInputContainer}>
        <TextInput
          placeholder="Add a comment"
          value={newComment}
          onChangeText={setNewComment}
          style={styles.commentInput}
        />
        <TouchableOpacity onPress={() => addComment(item.id)}>
          <Text style={styles.addCommentButton}>Comment</Text>
        </TouchableOpacity>
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
        <TouchableOpacity style={styles.showAddPostButton} onPress={() => setShowAddPost(!showAddPost)}>
          <Text style={styles.showAddPostButtonText}>{showAddPost ? 'Cancel' : 'Add Post'}</Text>
        </TouchableOpacity>
        {showAddPost && (
          <View style={styles.newPostContainer}>
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
                {labelOptions.map((label) => (
                  <Picker.Item key={label} label={label} value={label} />
                ))}
              </Picker>
            </View>
            <TouchableOpacity style={styles.addPostButton} onPress={addPost}>
              <Text style={styles.addPostButtonText}>Submit Post</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  flatListContent: {
    paddingBottom: 100, // Ensure there's space for the sticky button
  },
  postItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  label: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  labelText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    lineHeight: 22,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  upvoteText: {
    marginLeft: 10,
    fontSize: 14,
    color: 'gray',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  addCommentButton: {
    color: '#007BFF',
    fontSize: 14,
  },
  newPostContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
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
  picker: {
    height: 50,
    width: '100%',
  },
  addPostButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addPostButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  showAddPostButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  showAddPostButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  comment: {
    color: 'gray',
    marginTop: 5,
    marginLeft: 50,
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});

export default ForumScreen;