# Mobil Uygulama Sınavı – 1 Hour Study Guide

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
