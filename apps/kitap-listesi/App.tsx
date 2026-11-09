import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { BookCard } from './components/BookCard';

interface Book {
  id: number;
  title: string;
  author: string;
  read: boolean;
}

const initialBooks: Book[] = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', read: false },
  { id: 2, title: '1984', author: 'George Orwell', read: true },
  { id: 3, title: 'Simyacı', author: 'Paulo Coelho', read: false },
  { id: 4, title: 'Sapiens', author: 'Yuval Noah Harari', read: false },
];

export default function App() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  const addBook = () => {
    if (title.trim() === '' || author.trim() === '') {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    const newBook: Book = {
      id: Date.now(),
      title: title.trim(),
      author: author.trim(),
      read: false,
    };
    setBooks([...books, newBook]);
    setTitle('');
    setAuthor('');
    setError('');
  };

  const toggleRead = (id: number) => {
    setBooks(books.map((b) => (b.id === id ? { ...b, read: !b.read } : b)));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Okuma Listem</Text>

      <TextInput style={styles.input} placeholder="Kitap ara..." value={search} onChangeText={setSearch} />

      <Text style={styles.label}>Kitap Adı</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Yazar</Text>
      <TextInput style={styles.input} value={author} onChangeText={setAuthor} />

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <Pressable style={styles.addButton} onPress={addBook}>
        <Text style={styles.addButtonText}>Kitap Ekle</Text>
      </Pressable>

      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BookCard
            title={item.title}
            author={item.author}
            read={item.read}
            onToggle={() => toggleRead(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Kitap bulunamadı.</Text>}
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
