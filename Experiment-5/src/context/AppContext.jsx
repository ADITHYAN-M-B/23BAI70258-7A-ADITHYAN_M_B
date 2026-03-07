
import { useState } from "react";
import { AppContext } from "./AppContextOnly";

export function AppProvider({ children }) {
  const [state, setState] = useState({
    theme: "light",
    user: {
      name: "Adithyan",
      role: "Student"
    }
  });

  const toggleTheme = () => {
    setState((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light"
    }));
  };

  const updateUserName = (name) => {
    setState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        name
      }
    }));
  };

  return (
    <AppContext.Provider value={{ state, toggleTheme, updateUserName }}>
      {children}
    </AppContext.Provider>
  );
}
