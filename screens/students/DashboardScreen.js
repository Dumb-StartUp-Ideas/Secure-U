import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

// Random name generator
const randomNames = ['Alice', 'Bella', 'Chloe', 'Daisy', 'Ella', 'Fiona', 'Grace', 'Hannah'];

const ForumScreen = () => {
  const [posts, setPosts] = useState([
    { id: 1, label: 'Safety', text: 'What should I do if I feel unsafe?', upvotes: 5, comments: [], username: getRandomUsername() },
    { id: 2, label: 'Health', text: 'Best ways to maintain mental health during exams?', upvotes: 12, comments: [], username: getRandomUsername() },
    { id: 3, label: 'Harassment', text: 'How do I report harassment?', upvotes: 8, comments: [], username: getRandomUsername() },
    { id: 4, label: 'Wellness', text: 'Any recommendations for relaxation?', upvotes: 7, comments: [], username: getRandomUsername() },
    { id: 5, label: 'Support', text: 'Who can I talk to about personal issues?', upvotes: 10, comments: [], username: getRandomUsername() },
    { id: 6, label: 'Study Tips', text: 'Best time management tips for students?', upvotes: 15, comments: [], username: getRandomUsername() },
    { id: 7, label: 'Self-defense', text: 'Any tips on self-defense?', upvotes: 18, comments: [], username: getRandomUsername() }
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
      setPosts([...posts, { id: posts.length + 1, label: selectedLabel, text: newPostText, upvotes: 0, comments: [], username: getRandomUsername() }]);
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
        <Image source={{ uri: 'https://randomuser.me/api/portraits/med/women/1.jpg' }} style={styles.profilePicture} />
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
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
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
          <TouchableOpacity style={styles.addPostButton} onPress={addPost}>
            <Text style={styles.addPostButtonText}>Submit Post</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
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
  },
  newPostInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
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
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  showAddPostButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
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