import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

// =====================================================================
// BLOCK 1: Weeks 2–4 quick check (code part)
// Write your code where it says TODO, save, and look at the app.
// =====================================================================

// ---------------------------------------------------------------------
// Q6 (Week 2: props)
// Write a component called Greeting that takes a `name` prop (string)
// and shows: Merhaba, Ali!
//   1. a props interface called GreetingProps
//   2. the Greeting component (destructure the prop, type it)
//   3. use it below, in the "Q6" section of Block1
// ---------------------------------------------------------------------

// TODO Q6: write GreetingProps and Greeting here


// ---------------------------------------------------------------------
// Q8 (Week 4: forms + CRUD). This function has 2 bugs.
// Try it first: press "Ekle" with the box EMPTY, then type something
// and press "Ekle". Watch what happens. Then fix both bugs.
// In a comment above each fix, write: location + reason.
// ---------------------------------------------------------------------
interface Task {
  id: number;
  text: string;
}

function TaskForm() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const addTask = () => {
    if (text.trim() === '') {
      setError('Görev boş olamaz');
    }
    tasks.push({ id: Date.now(), text: text });
  };

  return (
    <View>
      <TextInput style={styles.input} placeholder="Görev yaz..." value={text} onChangeText={setText} />
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <Pressable style={styles.button} onPress={addTask}>
        <Text style={styles.buttonText}>Ekle</Text>
      </Pressable>
      <Text>Görev sayısı: {tasks.length}</Text>
      {tasks.map((t) => (
        <Text key={t.id}>• {t.text}</Text>
      ))}
    </View>
  );
}

// =====================================================================
// The screen: one section per question
// =====================================================================
export default function Block1() {
  return (
    <View>
      <Text style={styles.h}>Q6: Greeting</Text>
      {/* TODO Q6: use your Greeting component here with name "Ali" */}

      <Text style={styles.h}>Q7: Flexbox</Text>
      {/* Q7: before you change anything, predict: will the 3 boxes be
          centered HORIZONTALLY or VERTICALLY? Then try these one at a time:
            a) remove flexDirection: 'row'  → what changes?
            b) change justifyContent to 'space-between'
            c) add alignItems: 'center' (back with 'row')            */}
      <View style={styles.flexArea}>
        <View style={[styles.box, { backgroundColor: 'tomato' }]} />
        <View style={[styles.box, { backgroundColor: 'gold' }]} />
        <View style={[styles.box, { backgroundColor: 'seagreen' }]} />
      </View>

      <Text style={styles.h}>Q8: Fix the bugs</Text>
      <TaskForm />
    </View>
  );
}

const styles = StyleSheet.create({
  h: { fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8 },
  flexArea: {
    height: 200,
    backgroundColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  box: { width: 50, height: 50 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 8 },
  error: { color: 'red', marginBottom: 8 },
  button: { backgroundColor: '#1b3358', padding: 10, borderRadius: 6, alignItems: 'center', marginBottom: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
