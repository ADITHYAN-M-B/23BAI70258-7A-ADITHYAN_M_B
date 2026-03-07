---

# 🚀 Experiment 5 — Redux Toolkit, Context API, useMemo & Reports Extension

---

## 🧾 Overview

This experiment is an extension of the previous React multi-page application.

The app built using **React Router** is further enhanced by implementing **structured state management using Redux Toolkit**, while keeping **Context API** for app-wide concerns like theme and user profile.

In addition to existing pages, a new **Reports Page** is introduced to demonstrate Redux state usage, memoized derived data, and context integration.

The application now contains:

* Home Page
* Projects Page
* Contact Page
* Analytics Page
* Reports Page (New)

The application also supports **light/dark theme toggling** across all pages.

---

## Experiment 5 Updates

* Implemented Redux Toolkit (store, slice, actions)
* Added new page: Reports
* Added `useMemo` for filtered skills list and derived skill count
* Implemented Context for theme toggle and user profile
* Added screenshots in `/screenshots`

---

## 🎯 Aim

To extend the multi-page React application by implementing Redux Toolkit, Context API, and useMemo, and by adding a new Reports page.

---

## 🎯 Objective

* Understand Redux Toolkit for scalable state management
* Use Context API for global app concerns (`theme`, `user`)
* Optimize derived computations using `useMemo`
* Add one new page connected with React Router
* Implement dynamic add/remove/clear operations with Redux
* Maintain consistent UI and responsive layout

---

## 🛠️ Technologies Used

* React (Vite)
* React Router DOM
* Redux Toolkit (`configureStore`, `createSlice`)
* React Redux (`Provider`, `useSelector`, `useDispatch`)
* React Context API
* React `useMemo`
* Bootstrap (react-bootstrap)
* Material UI (MUI)
* JavaScript (ES6)
* HTML
* CSS

---

## 📚 Theory

### Redux Toolkit

Redux Toolkit simplifies Redux setup and state updates using `configureStore` and `createSlice`.

### React Context API

Context API is used for app-wide values that are not core business state, such as theme and user profile.

### useMemo

`useMemo` memoizes derived values so recalculation happens only when dependencies change, improving performance.

### Why Redux + Context + useMemo?

* Redux Toolkit: structured, predictable global state for features like skills list
* Context API: lightweight app-wide concerns (theme/user)
* useMemo: optimized derived analytics and filtered results
* Cleaner separation of concerns and better scalability

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ThemeToggle.jsx
│   ├── CardComponent.jsx
│   └── FilterBar.jsx
│
├── context/
│   ├── AppContext.jsx
│   └── AppContextOnly.js
│
├── redux/
│   ├── store.js
│   └── slices/
│       └── skillSlice.js
│
├── pages/
│   ├── Home.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   ├── Analytics.jsx
│   └── Reports.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ Implementation Approach

### Step 1: Configure Redux Store

Create a Redux store using `configureStore` in `src/redux/store.js`.

### Step 2: Create Redux Slice

Create `skillSlice` using `createSlice` with actions:

* `addSkill`
* `removeSkill`
* `clearSkills`

### Step 3: Connect Redux to App

Wrap the app with `Provider` in `main.jsx` and use:

* `useSelector` to read skills
* `useDispatch` to update skills

### Step 4: Keep Context for Global UI State

Use Context Provider for:

* Theme toggle (`light` / `dark`)
* User profile data (mock user)

Context is consumed in multiple components (Navbar, Analytics, Reports, App).

### Step 5: Use useMemo for Optimization

Implement `useMemo` for derived values such as:

* Total skills count (Analytics)
* Filtered skills list based on search (Reports)

### Step 6: Add New Page (Reports)

Reports page demonstrates:

* Redux state access and updates
* Memoized derived data
* Context-based user/theme display

---

## 🧭 Application Architecture

```text
main.jsx
   ↓
BrowserRouter
   ↓
Redux Provider (store)
   ↓
AppProvider (Context)
   ↓
App.jsx
   ↓
Routes
   ↓
Pages (Home, Projects, Contact, Analytics, Reports)
```

---

## 🔄 Data Flow

```text
User Action
    ↓
Dispatch Redux Action
    ↓
Slice Reducer Updates Store
    ↓
useSelector Reads Updated State
    ↓
useMemo Computes Derived Values
    ↓
UI Re-renders
```

---

## 🎨 UI Consistency

* Common Navbar
* Common Footer
* Consistent spacing and card layout
* Responsive design (mobile + desktop)
* Unified theme behavior across pages

---

## ▶️ How to Run

```bash
npm install
npm run dev
```

---

## 🧪 Build Check

```bash
npm run build
```

---

## 📸 Screenshots

```text
screenshots/
 ├── home.png
 ├── new-page.png
 └── redux-feature.png
```

---

## 🔁 Changes from Experiment 4

| Feature            | Experiment 4 | Experiment 5 |
| ------------------ | ------------ | ------------ |
| React Router       | Yes          | Yes          |
| Multiple Pages     | Yes          | Yes          |
| Context API        | Yes          | Yes          |
| useReducer         | Yes          | No           |
| Redux Toolkit      | No           | Yes          |
| useMemo            | No           | Yes          |
| New Page (Reports) | No           | Yes          |
| Theme Toggle       | Yes          | Yes          |
| Dynamic Data       | Yes          | Yes          |

---

## ✅ Result

The React application was successfully enhanced by replacing reducer-based state logic with Redux Toolkit, keeping Context API for global concerns, using `useMemo` for derived computations, and adding a new Reports page integrated with routing.

---

## 📝 Conclusion

This experiment demonstrates how Redux Toolkit, Context API, and `useMemo` can be combined to build a scalable, optimized, and maintainable multi-page React application.

---

## 🎓 Learning Outcomes

* Understanding Redux Toolkit setup and slices
* Integrating Redux with React components
* Using Context API for global UI state
* Optimizing computed values with `useMemo`
* Extending React Router apps with new feature pages

---
