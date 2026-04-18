import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";

function RequireAuth({ children, allowedRoles }) {
  const role = sessionStorage.getItem("role");

  if (!role) {
    window.location.href = "/";
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    alert("Access Denied: You do not have permission to access this page.");
    window.location.href = role === "ADMIN" ? "/admin" : "/user";
    return null;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/user"
          element={
            <RequireAuth allowedRoles={["USER", "ADMIN"]}>
              <UserDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAuth allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;