# 5-Hour Exam Plan: Mobil Cihazlar İçin Uygulama Geliştirme (Vize)

Source: your booklet *Vize Hazırlık Kitapçığı | Hafta 1–7* (page numbers below = booklet page "s.").
**Out of scope (skip completely):** AsyncStorage, Supabase, Auth, Camera, Location, AI, Testing, EAS Build, last year's Kotlin code.

---

## Part 1: What the exam will look like

The 3 mini mock exams in the booklet (s.153–158) all have the **same shape**. Expect the real exam to follow it:

| Q | Topic group | Points | Question styles |
|---|---|---|---|
| 1 | JS / TypeScript / interface | 20 | **Code output** (write r1, r2…), write an interface, find TS errors |
| 2 | Component / props / state | 20 | Write a small component, props or state?, `onPress={f()}` trap |
| 3 | Flexbox / form / CRUD | 20 | Draw box positions, margin vs padding, write validation, write delete/toggle |
| 4 | FlatList / search / navigation | 20 | **Fill in the blanks** in FlatList+filter, route mapping, `Number(id)` + `find` |
| 5 | API / fetch / useEffect | 20 | **Find 6 bugs** in a fetch function, screen states, console output order |

**Question formats** (from the booklet's "how to use" page):
- **Kod okuma**: write the output without running it.
- **Hata bulma**: show the bug + **write the reason** + fix it.
- **Kod tamamlama** (fill in the blanks): write the missing expression.
- **Kısa kod yazma**: write 3–10 lines on paper.
- **Short answer / definitions / true-false**: these come from the "A or B?" comparison table (s.108–109).

> **On paper you have no autocomplete.** Every missing `return`, `=>`, `)` or `toString()` costs points.

---

## Part 2: The schedule

| Time | Block | Goal | Mock-exam Q |
|---|---|---|---|
| 0:00–0:10 | **0. Warm-up** | Know the format + the 11-step checklist | all |
| 0:10–0:55 | **1. W1 + W2** | Code output, interface, props/state | Q1 + Q2 (40 pts) |
| 0:55–1:00 | ☕ break | | |
| 1:00–1:45 | **2. W3 + W4** | Flexbox, form validation, CRUD | Q3 |
| 1:45–1:55 | ☕ break | | |
| 1:55–2:45 | **3. W5 + W6** | FlatList, search, **navigation (your gap)** | Q4 |
| 2:45–2:50 | ☕ break | | |
| 2:50–3:35 | **4. W7** | fetch, try/catch/finally, useEffect | Q5 |
| 3:35–3:45 | ☕ break | | |
| 3:45–4:30 | **5. Timed mock** | Mini Deneme 3 on paper, then check with Bölüm 20.3 | all |
| 4:30–5:00 | **6. Final review** | The 25 most likely questions below | all |

**Every block works the same way:**
1. Read the "5 Dakikada Hafta X" page for that week (Bölüm 18, s.159–165): 5 min.
2. Study the topics and ideal answers listed below.
3. **Write the "must write" code by hand on paper**, then compare.
4. Do the self-test **without looking**, then check.

---

## Block 0 (10 min): Warm-up
**Read:** s.166 "Vizede Kod Sorusu Çözerken", the 11-step checklist. Memorize these 6 checks for every code answer:
1. Check the **interface field names** (`name` or `title`? is `id` a number?).
2. Array → `map` / `filter` / `find`; object → dot access.
3. **Never `push`** or assign directly: use `[...arr, x]`, `map`, `filter`.
4. FlatList `data` = the **filtered** list; `renderItem={({ item }) => ...}`.
5. Route params are **strings** → `Number(id)`.
6. `await` for **both** `fetch` and `.json()`; `setLoading(false)` in `finally`.

---

## Block 1 (45 min): Week 1 + Week 2 → Exam Q1 + Q2
**Read:** Bölüm 18.1–18.2 (5 Dakikada H1, H2; s.159–160). Skim s.11–20 (map/filter/find, spread) and s.21–35 (TS, props, state).

### Likely questions and ideal answers
| Question | Ideal answer |
|---|---|
| `[45,80,62,95,30].filter(s => s >= 60)` | `[80, 62, 95]` |
| `.map(s => s >= 60 ? 'G' : 'K')` | `['K', 'G', 'G', 'G', 'K']` |
| `.find(s => s > 90)` | `95` (one element, **not** an array) |
| `.filter(s => s > 100).length` | `0` |
| `{ ...student, grade: student.grade + 1 }` where `grade: 2`, then log `student.grade` | `2` (original unchanged); the new one has `3` |
| `{ ...{ a: 1 }, a: 2 }` | `{ a: 2 }`: **the last write wins** |
| `[10, 20, 30][3]` | `undefined` |
| `n => { n * 2 }` used in map | `[undefined, ...]`: braces need `return` |
| `const [a, b] = useState(false)`: what are a, b, false? | a = current value, b = setter function, false = initial value → `const [isOpen, setIsOpen] = useState(false)` |
| Props or state? card title / panel open / search text / parent's onPress / cart list / avatar size from parent | props / state / state / props / state / props |
| Child changes its props? | **No**, props are read-only; the parent owns them |
| Required prop missing in `<Card name="A" />` | **TypeScript error**: required prop missing |
| `phone?: string` not given | `undefined` (not `null`) |
| `setLiked(!liked)` | Toggles the boolean |
| `onPress={setLikes(likes + 1)}` | Runs **during render** → state changes → re-render → **infinite loop** ("Too many re-renders"). Fix: `onPress={() => setLikes(likes + 1)}` |
| Two `<LikeButton />` share a count? | **No**, each component instance has its **own state** |
| Find the 3 TS errors: `{ id: 1, title: 'Sefiller', pages: '450', isBorrowed: 'false' }` | `author` missing (required) · `pages` is a string, should be number `450` · `isBorrowed` is a string, should be boolean `false` |

### Must write by hand
```tsx
interface Book { id: number; title: string; author: string; pages: number; isBorrowed: boolean; isbn?: string; }

interface LikeButtonProps { label: string; }
function LikeButton({ label }: LikeButtonProps) {
  const [likes, setLikes] = useState(0);
  return (
    <Pressable onPress={() => setLikes(likes + 1)}>
      <Text>{label}: {likes}</Text>
    </Pressable>
  );
}
```
**Self-test (no peeking):** write `OrderCard` (s.155, Mini 2 Q2b): props `order: { id; total; delivered }` + `onCancel(id)`; show "total TL"; if delivered show "Teslim edildi", else an "İptal Et" button calling `onCancel(order.id)`.

---

## Block 2 (45 min): Week 3 + Week 4 → Exam Q3
**Read:** Bölüm 18.3–18.4 (5 Dakikada H3, H4; s.161–162). Skim s.37–44 (Flexbox solved questions), s.48–57 (form, CRUD).

### Flexbox: the only rules you need
- Default `flexDirection` is **`column`**.
- `justifyContent` → **main** axis (the direction). `alignItems` → **cross** axis (default `stretch`).
- `flex` shares the space **after** fixed sizes are taken.

| Question | Ideal answer |
|---|---|
| `row` + `justifyContent: 'flex-end'` + `alignItems: 'flex-end'` | three boxes side by side, **bottom-right** |
| column, `justifyContent: 'flex-end'` | boxes at the **bottom** |
| row, `alignItems: 'flex-start'` | boxes at the **top** |
| Height 600, children `{height:100}`, `{flex:1}`, `{flex:3}` | 100, **125**, **375** (600 − 100 = 500 → 1:3) |
| `flex:1` and `flex:3` share 400 | 100 and 300 |
| Row of 3 buttons with equal space between and at the edges | `{ flexDirection: 'row', justifyContent: 'space-evenly' }` |
| Center vertically inside a **row** | `alignItems: 'center'` (not justifyContent) |
| Margin vs padding | margin = **outside** space (to neighbors), padding = **inside** space (content to border). Text stuck to the edge → increase **padding** |
| Style mistakes | `background-color` → `backgroundColor`; `'16px'` → `16` |

### Form + CRUD: likely questions
| Question | Ideal answer |
|---|---|
| Controlled input order | value shows state → user types → `onChangeText` fires → `setName` → state changes → re-render → TextInput shows the new value |
| `value` without `onChangeText` | User **can't type** |
| `" a ".trim()` | `"a"` |
| Add new task to the **start** | `[newTask, ...tasks]` |
| After delete, length? After update? | Delete: −1 · Update: **the same** |
| Delete uses… | `filter` + `!==` |
| Update uses… | `map` + `===` + `{ ...t }` + **`: t`** for the others |
| CRUD trace (Mini 3 Q3c): add A,B,C → toggle(2) → delete(1) → toggle(2) → toggle(3) | `[{id:2, B, false}, {id:3, C, true}]` |

### Must write by hand
```tsx
const handleSubmit = () => {
  if (commentText.trim() === '') { setError('Yorum boş olamaz.'); return; }
  setError('');
  addComment(commentText.trim());
};
const deleteComment = (id: number) => setComments(comments.filter(c => c.id !== id));
const toggleLike    = (id: number) => setComments(comments.map(c => c.id === id ? { ...c, liked: !c.liked } : c));

const decreaseStock = (id: number) =>
  setProducts(products.map(p => p.id === id && p.stock > 0 ? { ...p, stock: p.stock - 1 } : p));
```
**Self-test:** Mini Deneme 3, Q1b (s.157). Find the bugs in:
```tsx
interface Note { id: number; text: string; pinned: boolean }
const [notes, setNotes] = useState([]);
const n: Note = { id: 1, text: 'Ders', pinned: 'true' };
setNotes(notes.push(n));
```
→ `useState<Note[]>([])` (no type) · `pinned: true` (boolean, not a string) · `push` mutates **and** returns a number → `setNotes([...notes, n])`.

---

## Block 3 (50 min): Week 5 + Week 6 → Exam Q4 ❗ your biggest gap (Ödev 6 was missed)
**Read:** Bölüm 18.5–18.6 (5 Dakikada H5, H6; s.163–164). Then s.68–76 (Week 6) properly. Skim s.58–67.

### FlatList + search: the fill-in-the-blanks question (Mini 1 Q4a)
```tsx
const filteredRecipes = recipes.filter(r =>
  r.name.toLowerCase().includes(searchText.trim().toLowerCase())
);
<FlatList
  data={filteredRecipes}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => <RecipeCard recipe={item} onPress={() => openRecipe(item)} />}
  ListEmptyComponent={<Text>Sonuç bulunamadı.</Text>}
/>
```
**Search + category (memorize):**
```tsx
const filtered = products.filter(p => {
  const matchesSearch   = p.name.toLowerCase().includes(q.trim().toLowerCase());
  const matchesCategory = selected === 'Tümü' || p.category === selected;
  return matchesSearch && matchesCategory;
});
```
| Question | Ideal answer |
|---|---|
| ScrollView vs FlatList (2 differences) | ScrollView renders **everything at once**, for short/mixed content · FlatList renders **only visible items**, for long data lists, uses `data`/`renderItem`/`keyExtractor` |
| 1000-item list → ? | FlatList |
| `"Laptop".includes("lap")` / `"laptop".includes("")` | `false` (capital L) / `true` |
| Why is `filteredProducts` not state? | It's **derived data**, recalculated from other state on each render |
| Empty search result shows? | `ListEmptyComponent` (it's "empty", not an error) |
| Books search (Mini 2 Q4a): "madonna"+"Tümü" / "madonna"+"Roman" / " AYAR "+"Roman" / ""+"Şiir" | ids 1,2 / id 1 / id 3 / `[]` |
| Common FlatList bugs | `renderItem={(item) =>` → needs `({ item })`; keyExtractor returning a number; lowercasing only one side; `data={products}` ignoring the filter; mixing up `&&`/`||` |

### Navigation (Expo Router)
| File | Route |
|---|---|
| `app/index.tsx` | `/` |
| `app/about.tsx` | `/about` |
| `app/(tabs)/search.tsx` | `/search` (the group in parentheses is **not** part of the URL) |
| `app/user/[id].tsx` | `/user/5` (dynamic) |
| `app/user/index.tsx` | `/user` |
| `app/_layout.tsx` | layout: `<Stack />` or `<Tabs />` |

| Question | Ideal answer |
|---|---|
| push / replace / back | push: adds a screen (back works) · **replace**: swaps the screen, no going back (e.g. after login) · back: one screen back |
| Login → home, back button must not return to login | `router.replace('/home')`, because push would keep login in the history |
| List → detail: Stack or Tabs? | **Stack**. Tabs are for equal-level main sections |
| `/product/9`: what is `id`? | `"9"`, a **string** |
| Why does `books.find(b => b.id === id)` return undefined? | `id` is the string `"3"`, `b.id` is the number `3`, and `===` compares types → `b.id === Number(id)` |
| Props vs route params | props: parent → child on the same screen, any type · params: screen → screen, **strings**, read with `useLocalSearchParams` |
| List → detail steps (Mini 3 Q4c) | press card → `onPress` → `router.push({ pathname: '/product/[id]', params: { id: product.id } })` → detail screen reads `useLocalSearchParams` → `Number(id)` → `find` → `if (!product)` show a message → show the details |

### Must write by hand
```tsx
// list screen
const router = useRouter();
const openRecipe = (recipe: Recipe) =>
  router.push({ pathname: '/recipe/[id]', params: { id: recipe.id } });

// app/recipe/[id].tsx
export default function RecipeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recipe = recipes.find(r => r.id === Number(id));
  if (!recipe) return <Text>Tarif bulunamadı.</Text>;
  return <Text>{recipe.name}</Text>;
}
```
**Navigation bugs to spot:** `id.tsx` without brackets · `pathname: '/product/1'` (should be `'/product/[id]'` + params) · no `Number(id)` · no `if (!product)` · `onPress={router.push(...)}`.

---

## Block 4 (45 min): Week 7 → Exam Q5
**Read:** Bölüm 18.7 (5 Dakikada H7; s.165). Skim s.77–88.

### The full template (memorize; it's worth ~12 points)
```tsx
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading]   = useState(true);
const [error, setError]       = useState('');

const loadProducts = async () => {
  try {
    setLoading(true);
    setError('');
    const response = await fetch('https://dummyjson.com/products?limit=10');
    if (!response.ok) { throw new Error(`HTTP ${response.status}`); }
    const data = await response.json();
    setProducts(data.products);              // the response is { products: [...] }, NOT data
  } catch (e) {
    setError('Ürünler alınamadı.');
  } finally {
    setLoading(false);
  }
};

useEffect(() => { loadProducts(); }, []);    // [] = once, when the screen opens
```

### Likely questions and ideal answers
| Question | Ideal answer |
|---|---|
| **Find the 6 bugs** (Mini 1 Q5a) | 1) `useEffect` not imported · 2) function not `async` · 3) `fetch` without `await` · 4) no `response.ok` check · 5) `setLoading(false)` not in `finally` (stays loading after an error) · 6) `useEffect(async ...)` is wrong, **and** the `[]` dependency array is missing → runs after every render |
| Screen states (i) loading (ii) 200 + `[]` (iii) 404 (iv) 12 items | (i) loading indicator · (ii) **empty** message (not an error!) · (iii) error message · (iv) the list |
| Console order, server returns 500 (Mini 2 Q5b) | **A F B D E**. A runs first; `await` pauses, so F prints; then B; `!ok` throws → D; `finally` → E |
| When does fetch go straight to `catch`? | Network failure (no internet, bad domain). **404/500 do NOT** → you need `response.ok` |
| `finally` runs when? | **Always**, at the end, success or error |
| `useEffect(() => { load(); })` problem? | No dependency array → runs after **every** render → `setState` → infinite loop |
| `[]` vs `[id]` | `[]` once on open · `[id]` on open and whenever `id` changes |
| API returns `[]`, team shows "Bir hata oluştu" | Wrong: `[]` is **empty**, not an error → show "Ürün bulunamadı" |
| Retry button `onPress`? | `onPress={loadProducts}`; at the start of `loadProducts`: `setLoading(true)` and `setError('')` |
| `{ products: [...] }` → state gets? | `data.products` |
| JSON vs JS object | JSON = text for transport, keys in **double quotes** · JS object = a value in memory · `response.json()` converts |
| Status codes | 200 OK · 404 not found · 500 server error |
| client / server / API / request / response | client starts the request (the app) · server answers · API = the rules (endpoints, methods, format) · request = method + URL · response = status + body |

---

## Block 5 (45 min): Timed mock exam
- Do **Mini Deneme 3** (s.157–158) on paper. Give yourself **35 minutes**, with no notes.
- Check with the solutions (Bölüm 20.3) for 10 minutes. Write your mistakes on a sticky note.
- If you have extra time later: Mini Deneme 2 Q1 + Q4 only.

---

## Block 6 (30 min): Final review: the 25 most likely questions
Cover the answers and say each one out loud.

1. `map` / `filter` / `find` return what? → same-length array / array (can be `[]`) / one element or `undefined`
2. `{ ...{ a: 1 }, a: 2 }` → `{ a: 2 }`
3. `n => { n * 2 }` → returns undefined (needs `return`)
4. Props vs state → props from the parent, read-only · state inside, changed with the setter → re-render
5. `onPress={f()}` → runs during render; use `onPress={f}` or `() => f(x)`
6. Optional field not given → `undefined`
7. Component name → must start with a **capital** letter
8. Text directly inside `View` → error; wrap it in `<Text>`
9. Default flexDirection → `column`
10. justifyContent / alignItems → main axis / cross axis
11. margin / padding → outside / inside
12. Controlled input → `value` + `onChangeText`
13. Validation → `trim() === ''` + `setError` + **`return`**
14. Create / Delete / Update → `[...arr, x]` / `filter(!==)` / `map(=== ? {...t} : t)`
15. Why not `push`? → mutates the same array; React doesn't re-render
16. FlatList 3 props → `data`, `renderItem({ item })`, `keyExtractor` (string)
17. FlatList data → the **filtered** list; empty → `ListEmptyComponent`
18. Case-insensitive search → `toLowerCase()` on **both** sides (+ `trim()`)
19. Search + category → `(sel === 'Tümü' || p.category === sel) && matchesSearch`
20. `[id].tsx` + `useLocalSearchParams` → id is a **string** → `Number(id)` + `if (!item)`
21. push vs replace → replace has no back (login)
22. Stack vs Tabs → list → detail / main sections
23. fetch template → `async`, `await fetch`, `response.ok`, `await json()`, `try/catch/finally`
24. `useEffect(..., [])` → once; `useEffect(async)` → wrong
25. 4 screen states → Loading / Error / Empty / Success (200 + `[]` = empty)

---

## Skip if time runs short (lowest yield first)
1. Ek Soru Setleri (s.135–145) and Scenarios 2–5 (s.146–152)
2. The big Ürün Kataloğu example (s.89–97): just skim the final code once
3. `Image` / `ScrollView` details beyond "remote image needs width/height"
4. `keyboardType`, `secureTextEntry`, `Alert.alert` details
5. HTTP methods other than GET (just know POST/PUT/DELETE exist)
6. Last year's Kotlin exam: **ignore**, it's a different language

## Your personal traps (from your earlier practice)
- 🔴 `{ }` without `return` (in components and arrow functions)
- 🔴 Spread order: the last write wins
- 🔴 `undefined` vs `null`, and out-of-range index → `undefined`
- 🔴 Forgetting `return` after the validation error
- 🔴 Self-closing tags: `<Greeting name="Ali" />`
- 🔴 Interface name mismatch (`Task` vs `Book`)
- 🔴 Every input you validate must exist on screen (the missing Kitap Adı input)
