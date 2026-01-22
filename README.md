# 🚀 Single Page Application (SPA) using React

---

## 🧾 Overview

This project demonstrates the implementation of a **Single Page Application (SPA)** using **React**.  
The application contains three pages — **Home**, **About**, and **Contact** — and allows navigation between them **without reloading the browser**.

Navigation is handled using **React state** and **conditional rendering**.

---

## 🎯 Aim

To design and implement a Single Page Application in React using component-based architecture, state management, and conditional rendering.

---

## 🎯 Objective

- Understand SPA architecture
- Implement client-side navigation using React state
- Avoid full page reloads
- Organize project with modular components

---

## 🛠️ Technologies Used

- React
- JavaScript (ES6)
- HTML
- CSS
- Vite

---

## 📚 Theory

### What is a Single Page Application?

A **Single Page Application (SPA)** is a web application that loads a single HTML page initially and dynamically updates content without reloading the browser.

### How React Enables SPA Behavior

React enables SPA through:
- Component-based architecture
- State management (`useState`)
- Conditional rendering
- Virtual DOM updates

### SPA vs Multi-Page Application

| SPA | MPA |
|-----|-----|
| Single HTML load | Multiple HTML loads |
| No page reload | Page reload on navigation |
| Faster UX | Slower UX |
| Client-side rendering | Server-side rendering |

---

### 📌 Applications of SPA

SPAs are widely used in modern web applications such as:

- Gmail
- Netflix
- Instagram
- Facebook
- Online dashboards
- Admin panels
- E-commerce websites

These applications require fast navigation and smooth user experience, which SPA provides.

---

### 🧭 SPA Working Diagram

```
Browser loads index.html
          │
          ▼
      React App Loads
          │
          ▼
   User Interaction (Click)
          │
          ▼
     State Change (useState)
          │
          ▼
  Component Re-render (No Reload)
```

---

## 📂 Project Structure

```
src/
├── components/
│   └── navbar.jsx
├── layout/
│   └── mainlayout.jsx
├── pages/
│   ├── home.jsx
│   ├── about.jsx
│   └── contact.jsx
├── App.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ Implementation Approach

### Step 1️⃣: State Management in `App.jsx`

```jsx
const [page, setPage] = useState("home");
```

```jsx
{page === "home" && <Home />}
{page === "about" && <About />}
{page === "contact" && <Contact />}
```

### Step 2️⃣: Navigation Component (`navbar.jsx`)

```jsx
function Navbar({ setPage }) {
  return (
    <nav>
      <button onClick={() => setPage("home")}>Home</button>
      <button onClick={() => setPage("about")}>About</button>
      <button onClick={() => setPage("contact")}>Contact</button>
    </nav>
  );
}
```

### Step 3️⃣: Layout Wrapper (`mainlayout.jsx`)

```jsx
function MainLayout({ children, setPage }) {
  return (
    <>
      <Navbar setPage={setPage} />
      <div>{children}</div>
    </>
  );
}
```

### Step 4️⃣: Page Components

```jsx
function Home() {
  return <h1>Home Page</h1>;
}
```

### Step 5️⃣: Entry Point (`main.jsx`)

```jsx
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 🧭 Application Architecture Diagram

```
main.jsx → App.jsx → MainLayout → Navbar → Pages
```

---

## 🔄 Navigation Flow Diagram

```
User Click
   ↓
setPage()
   ↓
State Update
   ↓
React Re-render
   ↓
New Page Displayed
```

---

## 🔍 Verifying SPA Behavior

1. Open DevTools → Network tab  
2. Click navigation buttons  
3. Observe: No page reload

---

## 🎨 Styling

```css
button {
  margin: 5px;
  padding: 5px 10px;
}
```

---

## ▶️ How to Run

```bash
npm install
npm run dev
```

---

## 📸 Screenshots

```
(screenshots)
ss/
 ├── ss_01.png
 ├── ss_02.png
 └── ss_03.png
```

---

## ✅ Result

The SPA was successfully implemented. Navigation occurs without refreshing the browser.

---

## 📝 Conclusion

This project demonstrates how React state and conditional rendering can create SPA behavior without external routing libraries.

---

## 🎓 Learning Outcomes

- Understanding SPA concept
- Using `useState` for navigation
- Implementing conditional rendering
- Building modular components
- Verifying SPA behavior using DevTools

---
