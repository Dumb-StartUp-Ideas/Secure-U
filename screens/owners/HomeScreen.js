import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const BodyguardScreen = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([
    { id: '1', task: 'Check main entrance', completed: false },
    { id: '2', task: 'Patrol parking lot', completed: false },
    { id: '3', task: 'Monitor CCTV', completed: false },
    { id: '4', task: 'Check fire exits', completed: false },
    { id: '5', task: 'Escort VIP', completed: false },
  ]);

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const renderTaskItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={[styles.taskText, item.completed && styles.taskCompleted]}>{item.task}</Text>
      <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
        <Ionicons name={item.completed ? "checkmark-circle" : "ellipse-outline"} size={24} color={item.completed ? "green" : "gray"} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.header}>Bodyguard Dashboard</Text>
        </View>

        <Image source={{ uri: 'https://via.placeholder.com/400x200.png?text=Map+Image' }} style={styles.mapImage} />

        <Text style={styles.sectionTitle}>Tasks</Text>
        <FlatList
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={item => item.id}
          style={styles.taskList}
        />

        {/* <TouchableOpacity style={styles.logoutButton} onPress={() => Alert.alert('Logged Out')}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    padding: 20,
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
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007BFF',
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    elevation: 2,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BodyguardScreen;