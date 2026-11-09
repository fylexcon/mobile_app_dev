import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

// Props: what the parent (App) gives to this card
interface BookCardProps {
  title: string;
  author: string;
  read: boolean;
  onToggle: () => void; // function passed from parent
}

export function BookCard({ title, author, read, onToggle }: BookCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.sub}>{author}</Text>

      <View style={styles.row}>
        <Text style={[styles.badge, read ? styles.done : styles.notDone]}>
          {read ? 'Okundu' : 'Okunmadı'}
        </Text>
        <Pressable style={styles.button} onPress={onToggle}>
          <Text>{read ? 'Geri Al' : 'Okundu İşaretle'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#ddd' },
  title: { fontSize: 16, fontWeight: 'bold' },
  sub: { color: '#666', marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  done: { backgroundColor: '#d4f5dc', color: 'green' },
  notDone: { backgroundColor: '#ffe9cc', color: '#b36b00' },
  button: { backgroundColor: '#e8edf3', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 6 },
});
