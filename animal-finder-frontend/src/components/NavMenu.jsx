import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./NavMenu.scss"
import logo from "../images/animal_logo.webp";

function NavMenu() {
  const [expanded, setExpanded] = useState(false);

  const closeNavbar = () => {
    setExpanded(false);
  };

  return (
    <Navbar
      expanded={expanded}
      onToggle={setExpanded}
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      className="mb-5"
    >
      <Container className="my-2">
        <Navbar.Brand as={NavLink} to="/" onClick={closeNavbar}>
          <img id="logo" src={logo} alt="To Home page of Animal Finder" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded((expanded) => !expanded)}
        />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link
              as={NavLink}
              to="/"
              onClick={closeNavbar}
              className={({ isActive }) =>
                isActive ? "active nav-link" : "nav-link"
              }
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/memberpage"
              onClick={closeNavbar}
              className={({ isActive }) =>
                isActive ? "active nav-link" : "nav-link"
              }
            >
              Member page
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/login"
              onClick={closeNavbar}
              className={({ isActive }) =>
                isActive ? "active nav-link" : "nav-link"
              }
            >
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavMenu;
