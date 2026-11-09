import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { TaskCard } from './components/TaskCard';

// 1) Data model (TypeScript interface)
interface Task {
  id: number;
  title: string;
  course: string;
  completed: boolean;
}

// 2) Initial data (at least 4 records)
const initialTasks: Task[] = [
  { id: 1, title: 'React Native tekrar et', course: 'Mobil Uygulama', completed: false },
  { id: 2, title: 'Lineer cebir soruları çöz', course: 'Matematik', completed: false },
  { id: 3, title: 'Veri tabanı ödevi', course: 'Veri Tabanı', completed: true },
  { id: 4, title: 'Sunum hazırla', course: 'Özel Öğretim Yöntemleri', completed: false },
];

export default function App() {
  // 3) State
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [error, setError] = useState('');

  // 4) Search: filter() + case-insensitive
  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  // 5) Add new record + validation + clear inputs
  const addTask = () => {
    if (title.trim() === '' || course.trim() === '') {
      setError('Lütfen tüm alanları doldurun.');
      return; // stop: do NOT add
    }
    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      course: course.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTitle('');
    setCourse('');
    setError('');
  };

  // 6) Toggle status with map()
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Çalışma Görevlerim</Text>

      <TextInput style={styles.input} placeholder="Görev ara..." value={search} onChangeText={setSearch} />

      <Text style={styles.label}>Görev Adı</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Ders Adı</Text>
      <TextInput style={styles.input} value={course} onChangeText={setCourse} />

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <Pressable style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Görev Ekle</Text>
      </Pressable>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskCard
            title={item.title}
            course={item.course}
            completed={item.completed}
            onToggle={() => toggleTask(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Görev bulunamadı.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 50, backgroundColor: '#f4f6f8' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#1b3358' },
  label: { fontWeight: 'bold', marginBottom: 4 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 10, marginBottom: 10 },
  error: { color: 'red', marginBottom: 8 },
  addButton: { backgroundColor: '#1b3358', padding: 12, borderRadius: 6, alignItems: 'center', marginBottom: 12 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 20, color: '#666' },
});
