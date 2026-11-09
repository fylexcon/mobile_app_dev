# 📚 Mobil Uygulama Sınavı — Complete Study File

> Everything in one file: notes + full code for Group A and Group B.
> Study method: read → explain out loud → close the file → write it from memory → run it.

---

## Part 1 — Notes


Group A (Görev Takip) and Group B (Kitap Listesi) are THE SAME exam with renamed fields:

| Group A            | Group B            |
|--------------------|--------------------|
| `Task`             | `Book`             |
| `course`           | `author`           |
| `completed`        | `read`             |
| `TaskCard`         | `BookCard`         |
| Tamamlandı / Tamamlanmadı | Okundu / Okunmadı |
| "Görev bulunamadı." | "Kitap bulunamadı." |

Reference code: `grupA/App.tsx`, `grupA/components/TaskCard.tsx` (and grupB equivalents).

---

## The 8 building blocks (memorize these patterns, ~90% of the grade)

### 1. Interface (10 pts)
```ts
interface Task { id: number; title: string; course: string; completed: boolean; }
const initialTasks: Task[] = [ { id: 1, title: '...', course: '...', completed: false }, ... ];
```
*Explain:* "Interface describes the shape of the data; TypeScript errors if a field is missing or the wrong type."

### 2. useState (10 pts) — 5 pieces of state
```ts
const [tasks, setTasks] = useState<Task[]>(initialTasks); // the list
const [search, setSearch] = useState('');                 // search box
const [title, setTitle] = useState('');                   // input 1
const [course, setCourse] = useState('');                 // input 2
const [error, setError] = useState('');                   // error message
```
*Explain:* "When state changes with the setter, React re-renders the screen."

### 3. Card component + props (15 pts)
```tsx
interface TaskCardProps { title: string; course: string; completed: boolean; onToggle: () => void; }
export function TaskCard({ title, course, completed, onToggle }: TaskCardProps) { ... }
```
- Data comes **down** via props; the button calls `onToggle` to tell the **parent** to change state.
- Ternary for text: `{completed ? 'Tamamlandı' : 'Tamamlanmadı'}`

### 4. FlatList (15 pts) — 4 props
```tsx
<FlatList
  data={filteredTasks}                              // the FILTERED list, not tasks!
  keyExtractor={(item) => item.id.toString()}       // key must be a string
  renderItem={({ item }) => <TaskCard ... onToggle={() => toggleTask(item.id)} />}
  ListEmptyComponent={<Text>Görev bulunamadı.</Text>}  // empty state (5 pts)
/>
```
Note: `renderItem` receives an object → destructure `{ item }`.

### 5. Search with filter() (10 pts)
```ts
const filteredTasks = tasks.filter((t) =>
  t.title.toLowerCase().includes(search.toLowerCase())
);
```
- Lowercase **both sides** → case-insensitive.
- Do NOT store the filtered list in state; compute it every render (so the original list is never lost).

### 6. Add record (15 pts) + Validation (10 pts) + clear inputs
```ts
const addTask = () => {
  if (title.trim() === '' || course.trim() === '') {
    setError('Lütfen tüm alanları doldurun.');
    return;                                   // stop here!
  }
  const newTask: Task = { id: Date.now(), title: title.trim(), course: course.trim(), completed: false };
  setTasks([...tasks, newTask]);              // spread = new array (never push!)
  setTitle(''); setCourse(''); setError('');  // clear inputs
};
```
- `trim()` so that "   " (only spaces) also counts as empty.
- Inputs must be **controlled**: `<TextInput value={title} onChangeText={setTitle} />` — otherwise `setTitle('')` won't clear the box.
- Show error: `{error !== '' && <Text style={{color:'red'}}>{error}</Text>}`

### 7. Toggle status with map() (10 pts)
```ts
const toggleTask = (id: number) => {
  setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
};
```
*Explain:* "map returns a new array; for the matching id I copy the object with `...t` and flip the boolean; others stay the same."

---

## Likely oral questions (say these in your own words)
- **Why not `tasks.push()`?** Mutates the same array → React doesn't see a change → no re-render. Use `[...tasks, x]`.
- **Why FlatList instead of ScrollView + map?** FlatList only renders visible items → better performance for long lists.
- **What is keyExtractor for?** Gives each row a unique key so React knows which item changed.
- **Props vs state?** State = data a component owns & changes. Props = read-only data passed from parent.
- **Why `{ ...t }`?** Creates a new object (immutability) instead of modifying the old one.
- **`filter` vs `map`?** filter → keeps some items (length may shrink). map → transforms every item (same length).
- **Why `onToggle={() => toggleTask(item.id)}` and not `onToggle={toggleTask(item.id)}`?** The second one CALLS the function immediately during render. We need to pass a function.

## Common mistakes that cost points
1. FlatList `data={tasks}` instead of `filteredTasks` → search doesn't work.
2. Forgetting `return` after the validation error → empty item still gets added.
3. TextInput without `value=` → inputs don't clear.
4. `keyExtractor={(item) => item.id}` → must be a string: `.toString()`.
5. Lowercasing only one side of the search.
6. Forgetting to `export` the card or wrong import path (`./components/TaskCard`).
7. Toggle button not visible text change: use `completed ? 'Geri Al' : 'Tamamla'`.

## Bonus (Turkish letters)
`'İ'.toLowerCase()` is not `'i'`. If asked, `toLocaleLowerCase('tr-TR')` handles Turkish correctly.
`toLowerCase()` is enough for the grading.

## Writing order in the exam (45 min)
1. (3 min) Interface + initial data
2. (5 min) useState lines
3. (8 min) Card component with props + button
4. (5 min) FlatList showing the cards → RUN IT, check 4 records show
5. (5 min) toggle with map → test
6. (8 min) inputs + addTask + validation + clear → test empty + real add
7. (3 min) search filter + ListEmptyComponent → test "xyz"
8. (rest) styling, walk through the Kontrol Listesi

---

## Part 2 — Group A full code

### `components/TaskCard.tsx`
```tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

// Props: what the parent (App) gives to this card
interface TaskCardProps {
  title: string;
  course: string;
  completed: boolean;
  onToggle: () => void; // function passed from parent
}

export function TaskCard({ title, course, completed, onToggle }: TaskCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.sub}>{course}</Text>

      <View style={styles.row}>
        <Text style={[styles.badge, completed ? styles.done : styles.notDone]}>
          {completed ? 'Tamamlandı' : 'Tamamlanmadı'}
        </Text>
        <Pressable style={styles.button} onPress={onToggle}>
          <Text>{completed ? 'Geri Al' : 'Tamamla'}</Text>
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
```

### `App.tsx`
```tsx
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
```

---

## Part 3 — Group B full code

### `components/BookCard.tsx`
```tsx
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
```

### `App.tsx`
```tsx
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
```

---

## Part 4 — Self-test checklist (tick after you write it from memory)

- [ ] I wrote the interface and 4 initial records without looking
- [ ] I wrote the 5 useState lines
- [ ] I wrote the card component with props + onToggle
- [ ] I wrote FlatList with data / keyExtractor / renderItem / ListEmptyComponent
- [ ] I wrote the search with filter + toLowerCase on BOTH sides
- [ ] I wrote addTask with trim validation + return + spread + clearing inputs
- [ ] I wrote toggle with map + spread
- [ ] I can answer all the oral questions in my own words

## How to run it

1. Copy `App.tsx` and the `components/` folder from `grupA` (or `grupB`) into an Expo project (e.g. `apps/week1`).
2. Run `npx expo start` and open it in Expo Go or the web.
3. Test: the 4 records show → search "xyz" → the empty message shows → add with an empty field → the error shows → add a real one → the inputs clear → press the toggle.
