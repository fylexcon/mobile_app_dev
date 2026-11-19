# 📱 On the Way to the Exam

## The exam (5 questions)
1. **Temel bilgiler**: short answers
2. **Kod okuma**: what does it print?
3. **Hata bulma**: location + **reason** + fix
4. + 5. **Kısa kod yazma / tamamlama**

---

## ⚠️ My 6 traps
1. **Toggle** needs `!` → `read: !b.read`
2. **Toggle** needs `: b` at the end
3. **`return`** after `setError`
4. **`onPress={() => f(id)}`**, never `onPress={f(id)}`
5. **`find`** returns **one item** (or `undefined`), not an array
6. Read output questions **to the end of the line** (`.read`, `.length`)

---

## ✍️ The 3 shapes
**Add**
```tsx
setBooks([...books, { id: Date.now(), title: title.trim(), read: false }]);
```
`[ ]` outside = the list · `{ }` inside = one item

**Delete**
```tsx
setBooks(books.filter(b => b.id !== id));
```

**Toggle**
```tsx
setBooks(books.map(b => b.id === id ? { ...b, read: !b.read } : b));
```

**Validation**
```tsx
if (title.trim() === '') { setError('Boş olamaz'); return; }
```

---

## 🧩 Component skeleton
```tsx
interface CardProps { label: string; }

function Card({ label }: CardProps) {
  const [likes, setLikes] = useState(0);
  return (
    <Pressable onPress={() => setLikes(likes + 1)}>
      <Text>{label}: {likes}</Text>
    </Pressable>
  );
}
```
- Name starts with a **capital** letter
- Text always inside **`<Text>`**
- `{ }` in a function → needs **`return`**

---

## 📋 FlatList + search
```tsx
const filtered = books.filter(b =>
  b.title.toLowerCase().includes(search.toLowerCase()));

<FlatList
  data={filtered}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => <BookCard book={item} />}
  ListEmptyComponent={<Text>Bulunamadı.</Text>}
/>
```
- `data` = the **filtered** list
- `{ item }` in braces
- key = **string**

---

## 🌐 fetch
```tsx
const load = async () => {
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error('HTTP');
    const data = await response.json();
    setItems(data);
  } catch (e) { setError('Alınamadı'); }
  finally { setLoading(false); }
};
useEffect(() => { load(); }, []);
```
- `async` + **two** `await`s
- 404/500 → **no catch** unless you check `response.ok`
- `finally` = **always** runs
- `[]` = runs **once** · no array = infinite loop
- API gives `[]` → show an **empty message**, not an error

---

## 💬 One-liners (Temel bilgiler)
| | |
|---|---|
| props vs state | props from the parent, **read-only** · state inside, setter → re-render |
| `useState(0)` | `0` = **initial value** |
| `[a, b] = useState()` | a = value · b = **setter** |
| margin vs padding | margin = **outside** (between cards) · padding = **inside** |
| justifyContent / alignItems | **main** axis / **cross** axis |
| default direction | **column** |
| row + center vertically | `alignItems: 'center'` |
| ScrollView vs FlatList | renders **all** / renders only the **visible** items |
| controlled input | `value` + `onChangeText` |
| push vs replace | back works / **no back** (login) |
| Stack vs Tabs | list → detail / bottom sections |
| `[id].tsx` | **dynamic route**: `/book/3`, `/book/7` |
| route id | a **string** → `Number(id)` |
| React Native | one codebase → Android + iOS |
| TypeScript | adds **types**, catches errors early |
| interface | the **shape** of an object |

---

## 🔢 Quick outputs
| Code | Result |
|---|---|
| `[5,10,15].find(x => x > 7)` | `10` |
| `[5,10,15].filter(x => x > 50).length` | `0` |
| `{ ...{a:1}, a: 2 }` | `{ a: 2 }` |
| `[10,20,30][3]` | `undefined` |
| optional field not given | `undefined` |
| `n => { n * 2 }` | `undefined` (no return) |
| flex: height 600, `{h:100}`, `{flex:1}`, `{flex:3}` | 100, 125, 375 |

---

## ✅ In the exam room
1. Read all 5 questions first
2. Start with the easiest one
3. Bug question → **location + reason + fix**
4. Check every code answer for: `return` · `!` · `: x` · `() =>` · `[...x, {}]`
5. Never leave anything blank

**You've practiced every question type. Go get it! 🍀**
