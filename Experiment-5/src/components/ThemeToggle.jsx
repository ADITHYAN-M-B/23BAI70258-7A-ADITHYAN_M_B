import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { AppContext } from "../context/AppContextOnly";

export default function ThemeToggle() {
  const { state, toggleTheme } = useContext(AppContext);

  return (
    <Button size="sm" className="ms-3" onClick={toggleTheme}>
      {state.theme === "light" ? "Dark" : "Light"}
    </Button>
  );
}