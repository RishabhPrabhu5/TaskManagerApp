import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Animated,
  Keyboard,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TaskItem, Task } from './TaskItem';

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const validateAndSetDate = (text: string) => {
    setDateInput(text);
    
    // Clear selected date if input is empty
    if (text.trim() === '') {
      setSelectedDate(null);
      return;
    }

    // Check if the input matches mm/dd/yy format
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/([0-9]{2})$/;
    if (!dateRegex.test(text)) {
      return;
    }

    const [month, day, year] = text.split('/').map(num => parseInt(num, 10));
    const fullYear = 2000 + year;
    const date = new Date(fullYear, month - 1, day);

    // Validate if it's a real date (for example, not 02/31/24)
    if (
      date.getMonth() === month - 1 &&
      date.getDate() === day &&
      date.getFullYear() === fullYear
    ) {
      // Don't allow dates in the past
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (date < today) {
        Alert.alert('Invalid Date', 'Please enter a future date');
        return;
      }

      setSelectedDate(date);
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() === '') {
      Alert.alert(
        'Empty Task',
        'Please enter a task description',
        [{ text: 'OK', style: 'default' }],
        { cancelable: true }
      );
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      completed: false,
      dueDate: selectedDate,
    };

    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks, newTask];
      return sortTasksByDueDate(updatedTasks);
    });
    
    setNewTaskTitle('');
    setDateInput('');
    setSelectedDate(null);
    Keyboard.dismiss();
  };

  const sortTasksByDueDate = (taskList: Task[]): Task[] => {
    return taskList.sort((a, b) => {
      // Put completed tasks at the bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      // Sort by due date
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.getTime() - b.dueDate.getTime();
    });
  };

  // Re-sort tasks whenever a task is completed
  const toggleTaskComplete = (taskId: string) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      );
      return sortTasksByDueDate(updatedTasks);
    });
  };

  //filters and removes the task from the list
  const deleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
              placeholder="Add a new task..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              onSubmitEditing={addTask}
              returnKeyType="done"
              blurOnSubmit={false}
            />
            <View style={styles.dateInputContainer}>
              <Ionicons 
                name="calendar-outline" 
                size={24} 
                color={selectedDate ? "#64ffda" : "#7c8ce4"} 
                style={styles.calendarIcon}
              />
              <TextInput
                style={[styles.dateInput, selectedDate && styles.validDateInput]}
                value={dateInput}
                onChangeText={validateAndSetDate}
                placeholder="mm/dd/yy"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                maxLength={8}
                keyboardType="numeric"
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={addTask}
            activeOpacity={0.7}
          >
            <Ionicons name="add-circle" size={44} color="#7c8ce4" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggleComplete={toggleTaskComplete}
              onDelete={deleteTask}
            />
          )}
          keyExtractor={item => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c203a',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: 'rgba(124, 140, 228, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(124, 140, 228, 0.2)',
    shadowColor: '#7c8ce4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#ffffff',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(124, 140, 228, 0.2)',
  },
  calendarIcon: {
    marginRight: 8,
  },
  dateInput: {
    flex: 1,
    fontSize: 14,
    color: '#ffffff',
    height: 30,
  },
  validDateInput: {
    color: '#64ffda',
  },
  addButton: {
    marginLeft: 12,
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
}); 