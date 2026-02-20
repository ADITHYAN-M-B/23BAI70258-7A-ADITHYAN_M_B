---

# 🚀 Experiment 4 — State Management & Analytics Extension using Context API

---

## 🧾 Overview

This experiment is an extension of **Experiment 3**.

The multi-page modern web application created using **React Router** is further enhanced by implementing **global state management using React Context API and useReducer**.

In addition to existing pages, a new **Analytics Page** is introduced to demonstrate dynamic data handling, state updates, and global theme management.

The application now contains:

* Home Page
* Projects Page
* Contact Page
* Analytics Page

The application also supports **light/dark theme toggling** across all pages.

---

## 🎯 Aim

To extend the multi-page React application by implementing global state management using Context API and useReducer, and to add an Analytics page.

---

## 🎯 Objective

* Understand React Context API
* Implement global state using `useReducer`
* Share state across multiple pages
* Add an Analytics page
* Implement dynamic add/remove operations
* Implement light/dark theme switching
* Extend Experiment 3 with advanced React concepts

---

## 🛠️ Technologies Used

* React (Vite)
* React Router DOM
* React Context API
* React useReducer
* Bootstrap (react-bootstrap)
* Material UI (MUI)
* JavaScript (ES6)
* HTML
* CSS

---

## 📚 Theory

### React Context API

React Context API allows data to be shared globally across components without passing props manually at every level.

### useReducer

`useReducer` is a React Hook used to manage complex application state using action-based logic.

### Why Context + Reducer?

* Global theme management
* Shared skills data
* Clean and scalable state handling
* Avoids prop drilling

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
├── context/
│   ├── AppContext.jsx
│   └── AppContextOnly.js
│
├── reducer/
│   └── appReducer.js
│
├── pages/
│   ├── Home.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   └── Analytics.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ Implementation Approach

### Step 1: Create Global Context

Global context is created to store application-wide state.

### Step 2: Implement Reducer

Reducer handles actions such as:

* Theme toggle
* Add skill
* Remove skill

### Step 3: Wrap App with Provider

The entire application is wrapped with Context Provider to share state.

### Step 4: Add Analytics Page

Analytics page displays:

* Total number of skills
* Dynamic skill list
* Add and remove skills functionality

### Step 5: Theme Toggle

Theme can be switched between light and dark using a button in the Navbar.

---

## 🧭 Application Architecture

```
main.jsx
   ↓
AppProvider
   ↓
App.jsx
   ↓
Routes
   ↓
Pages (Home, Projects, Contact, Analytics)
```

---

## 🔄 Data Flow

```
User Action
    ↓
Dispatch Action
    ↓
Reducer Updates State
    ↓
Context Provides State
    ↓
UI Re-renders
```

---

## 🎨 UI Consistency

* Common Navbar
* Common Footer
* Same layout structure
* Responsive design
* Consistent theme across pages

---

## ▶️ How to Run

```
npm install
npm run dev
```

---

## 📸 Screenshots

```
screenshots/
 ├── home.png
 ├── projects.png
 ├── contact.png
 └── analytics.png
```

---

## 🔁 Changes from Experiment 3

| Feature        | Experiment 3 | Experiment 4 |
| -------------- | ------------ | ------------ |
| React Router   | Yes          | Yes          |
| Multiple Pages | Yes          | Yes          |
| Global State   | No           | Yes          |
| Context API    | No           | Yes          |
| useReducer     | No           | Yes          |
| Analytics Page | No           | Yes          |
| Theme Toggle   | No           | Yes          |
| Dynamic Data   | No           | Yes          |

---

## ✅ Result

The React application was successfully extended by implementing global state management using Context API and useReducer and by adding an Analytics page with dynamic functionality.

---

## 📝 Conclusion

This experiment demonstrates how Context API and useReducer can be used to manage shared state efficiently in a multi-page React application.

---

## 🎓 Learning Outcomes

* Understanding Context API
* Implementing useReducer
* Managing global state
* Creating dynamic pages
* Extending React Router applications

---
