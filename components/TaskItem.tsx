import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  // Create an animated value for task completion animation
  const [scaleValue] = React.useState(new Animated.Value(1));

  // Animate task completion
  const animateCompletion = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => onToggleComplete(task.id));
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        { transform: [{ scale: scaleValue }] },
        task.completed && styles.completedContainer
      ]}
    >
      <TouchableOpacity
        style={styles.taskContainer}
        onPress={animateCompletion}
        activeOpacity={0.7}
      >
        <View style={styles.checkboxContainer}>
          <Ionicons
            name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
            size={24}
            color={task.completed ? '#64ffda' : '#7c8ce4'}
          />
        </View>
        <Text style={[
          styles.taskText,
          task.completed && styles.completedText
        ]}>
          {task.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onDelete(task.id)}
        style={styles.deleteButton}
        activeOpacity={0.7}
      >
        <Ionicons name="trash-outline" size={24} color="#ff6b6b" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(28, 32, 58, 0.8)',
    borderRadius: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(124, 140, 228, 0.2)',
    shadowColor: '#7c8ce4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  completedContainer: {
    backgroundColor: 'rgba(28, 32, 58, 0.6)',
    borderColor: 'rgba(100, 255, 218, 0.2)',
  },
  taskContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
}); 