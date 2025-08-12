import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  const [todos, setTodos] = React.useState([
    { id: '1', text: 'Learn React Native', completed: false },
    { id: '2', text: 'Build a to-do app', completed: true },
  ]);
  const [text, setText] = React.useState('');

  const addTodo = () => {
    if (text.trim().length > 0) {
      setTodos([
        ...todos,
        { id: Date.now().toString(), text: text, completed: false },
      ]);
      setText('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleTodo(item.id)}>
      <View style={styles.todoItem}>
        <Text style={[styles.todoText, item.completed && styles.completedText]}>
          {item.text}
        </Text>
        <Button title="Delete" onPress={() => deleteTodo(item.id)} color="#ff5c5c" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>To-Do List</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a new to-do..."
            value={text}
            onChangeText={setText}
            onSubmitEditing={addTodo} // Also add on submit
          />
          <Button title="Add" onPress={addTodo} />
        </View>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  list: {
    // No specific styles needed for the list container itself for now
  },
  todoItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  todoText: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
});
