import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: Date | null;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  const [scaleValue] = React.useState(new Animated.Value(1));
  const clickCount = useRef(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  const handleTaskPress = () => {
    if (task.completed) {
      clickCount.current += 1;
      
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }

      if (clickCount.current === 3) {
        onDelete(task.id);
        clickCount.current = 0;
        return;
      }

      clickTimer.current = setTimeout(() => {
        clickCount.current = 0;
      }, 500);
    }
    animateCompletion();
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
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
        onPress={handleTaskPress}
        activeOpacity={0.7}
      >
        <View style={styles.checkboxContainer}>
          <Ionicons
            name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
            size={28}
            color={task.completed ? '#64ffda' : '#7c8ce4'}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[
            styles.taskText,
            task.completed && styles.completedText
          ]}>
            {task.title}
          </Text>
          {task.dueDate && (
            <Text style={[
              styles.dateText,
              task.completed && styles.completedText
            ]}>
              {formatDate(task.dueDate)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDelete}
        style={styles.deleteButton}
        activeOpacity={0.7}
      >
        <Ionicons name="trash-outline" size={26} color="#ff6b6b" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(28, 32, 58, 0.8)',
    borderRadius: 12,
    marginVertical: 8,
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
    minHeight: 80,
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
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  taskText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '500',
  },
  dateText: {
    fontSize: 14,
    color: '#7c8ce4',
    marginTop: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  deleteButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
}); 