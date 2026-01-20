import { useState } from "react";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import MainLayout from "./layout/mainlayout";

function App() {
  const [page, setPage] = useState("home");

  return (
    <MainLayout setPage={setPage}>
      {page === "home" && <Home />}
      {page === "about" && <About />}
      {page === "contact" && <Contact />}
    </MainLayout>
  );
}

export default App;
