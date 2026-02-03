> **Extension of Modern Web Page using React Router**

Here is the corrected README you should use.

---

# 🚀 Experiment 3 — Extension of Modern Web Page using React Router

---

## 🧾 Overview

This experiment is an extension of Experiment 2.
The **modern web page** created using React, Bootstrap, and Material UI is extended by adding multiple pages and implementing navigation using **React Router**.

The application now contains:

* Home Page
* Projects Page
* Contact Page

Navigation between pages happens **without reloading the browser**, demonstrating Single Page Application behavior using routing.

---

## 🎯 Aim

To extend the modern web page by adding multiple pages and implementing navigation using React Router.

---

## 🎯 Objective

* Understand the use of React Router
* Create multiple pages in a React application
* Maintain consistent UI across pages
* Navigate between pages without page reload
* Extend the structure of the existing webpage

---

## 🛠️ Technologies Used

* React (Vite)
* React Router DOM
* Bootstrap (react-bootstrap)
* Material UI (MUI)
* JavaScript (ES6)
* HTML
* CSS

---

## 📚 Theory

### What is React Router?

React Router is a library used to handle navigation in React applications without refreshing the page. It enables SPA behavior by rendering components based on the URL path.

### Why React Router in this experiment?

* Allows navigation between Home, Projects, and Contact pages
* Maintains consistent layout and UI
* Prevents full page reload

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── HeroSection.jsx
│   └── CardComponent.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Projects.jsx
│   └── Contact.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ Implementation Approach

### Step 1: Install React Router

```bash
npm install react-router-dom
```

### Step 2: Wrap App with BrowserRouter (`main.jsx`)

```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

### Step 3: Define Routes (`App.jsx`)

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/projects" element={<Projects />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```

### Step 4: Use Link in Navbar

```jsx
<Nav.Link as={Link} to="/projects">Projects</Nav.Link>
```

---

## 🧭 Application Architecture

```
main.jsx → App.jsx → Routes → Pages
                           ↓
                      Navbar & Footer
```

---

## 🔄 Navigation Flow

```
User Clicks Link
        ↓
URL Changes
        ↓
React Router Renders Component
        ↓
No Page Reload
```

---

## 🎨 UI Consistency

All pages use:

* Same Navbar
* Same Footer
* Same Bootstrap and MUI styling
* Same layout structure

---

## ▶️ How to Run

```bash
npm install
npm run dev
```

---

## 📸 Screenshots

```
ss/
 ├── home.png
 ├── projects.png
 └── contact.png
```

---

## ✅ Result

The modern web page was successfully extended into a multi-page React application using React Router while maintaining consistent design and smooth navigation.

---

## 📝 Conclusion

This experiment demonstrates how React Router can be used to convert a single modern web page into a multi-page application while preserving design consistency and improving structure.

---

## 🎓 Learning Outcomes

* Understanding React Router
* Creating multi-page React applications
* Maintaining UI consistency across pages
* Implementing navigation without reload
* Extending existing React projects logically
