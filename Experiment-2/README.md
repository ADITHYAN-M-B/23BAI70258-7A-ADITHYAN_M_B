---

# 🚀 Modern Web Page using Bootstrap and Material UI in React

---

## 🧾 Overview

This project demonstrates the design of a **modern, clean, and visually appealing web page** using **React** along with two popular UI component libraries:

* Bootstrap (react-bootstrap)
* Material UI (MUI)

The application is built using a **component-based architecture** and follows the recommended **folder structure** as per the experiment guidelines.

---

## 🎯 Aim

To design and implement a modern web page using React by integrating Bootstrap and Material UI components.

---

## 🎯 Objective

* Learn component-based UI design in React
* Understand proper folder structuring
* Use Bootstrap for layout and responsiveness
* Use MUI for modern UI components
* Build a meaningful landing page
* Apply modern UI/UX principles

---

## 🛠️ Technologies Used

* React (Vite)
* Bootstrap (react-bootstrap)
* Material UI (MUI)
* JavaScript (ES6)
* HTML
* CSS

---

## 📚 Theory

### What is a UI Component Library?

A UI component library provides pre-built, reusable components such as buttons, cards, navbars, grids, etc., which help in building consistent and responsive interfaces quickly.

### Why Bootstrap?

Bootstrap provides:

* Responsive grid system
* Navbar and layout utilities
* Predefined styling classes

### Why Material UI?

Material UI provides:

* Modern React components
* Typography, Cards, Buttons, Divider
* Professional and clean design

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── HeroSection.jsx
│   ├── CardComponent.jsx
│   └── Footer.jsx
├── pages/
│   └── Home.jsx
├── App.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ Implementation Approach

### Step 1: Bootstrap Navbar

Used Bootstrap Navbar component for the navigation bar.

### Step 2: Hero Section using MUI

Used MUI Typography and Button to create a modern hero section.

### Step 3: Cards using MUI

Used MUI Card component to display features of the page.

### Step 4: Layout using Bootstrap Grid

Used Bootstrap Container, Row, and Col for responsive layout.

### Step 5: FAQ using Bootstrap Accordion

Used Accordion component to display FAQs.

### Step 6: Sticky Footer using Flexbox

Used CSS flexbox to keep the footer at the bottom of the page.

---

## 🧭 Application Architecture

```
App.jsx
   ↓
Home.jsx
   ↓
Navbar | HeroSection | Cards | Accordion | Footer
```

---

## 🔄 Responsive Behavior

The page is responsive because:

* Bootstrap grid stacks columns vertically on small screens
* MUI components automatically adjust to screen sizes

---

## 🎨 Styling (index.css)

```css
html, body, #root {
  height: 100%;
  margin: 0;
}

#root {
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
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
screenshots//
 ├── screenshot_1.png
 └── screenshot_2.png
```

---

## ✅ Result

A modern, responsive landing page was successfully created using Bootstrap and Material UI in React.

---

## 📝 Conclusion

This experiment demonstrates how UI component libraries can be integrated into React to create responsive, visually appealing web pages with proper project structure.

---

## 🎓 Learning Outcomes

* Using Bootstrap components in React
* Using Material UI components in React
* Understanding React folder structure
* Building responsive layouts
* Applying modern UI principles
