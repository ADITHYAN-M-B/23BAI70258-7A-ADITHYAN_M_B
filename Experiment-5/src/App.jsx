import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./context/AppContextOnly";

import Footer from "./components/Footer";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports"; 

function App() {
  const { state } = useContext(AppContext);

  return (
    <div
      className={state.theme}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div style={{ flex: 1 }}>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/projects" element={<Projects />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/analytics" element={<Analytics />} />

          {/* NEW PAGE */}
          <Route path="/reports" element={<Reports />} />

        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;