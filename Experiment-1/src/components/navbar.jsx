function Navbar({ setPage }) {
  return (
    <nav>
      <button onClick={() => setPage("home")}>Home</button>
      <button onClick={() => setPage("about")}>About</button>
      <button onClick={() => setPage("contact")}>Contact</button>
    </nav>
  );
}

export default Navbar;
