import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContextOnly";
import ThemeToggle from "./ThemeToggle";

export default function CustomNavbar() {
  const { state } = useContext(AppContext);

  return (
    <Navbar bg={state.theme} variant={state.theme}>
      <Container>

        <Navbar.Brand as={Link} to="/">
          Portfolio
        </Navbar.Brand>

        <Nav className="ms-auto">

          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>

          <Nav.Link as={Link} to="/projects">
            Projects
          </Nav.Link>

          <Nav.Link as={Link} to="/contact">
            Contact
          </Nav.Link>

          <Nav.Link as={Link} to="/analytics">
            Analytics
          </Nav.Link>

          <Nav.Link as={Link} to="/reports">
            Reports
          </Nav.Link>

          <ThemeToggle />

        </Nav>

      </Container>
    </Navbar>
  );
}