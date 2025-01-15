import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import "./NavMenu.scss";
import logo from "../images/animal_logo_paw.svg";
import AuthService from "../services/auth.service";

function NavMenu({ isLoggedIn, handleLogout }) {
  const [expanded, setExpanded] = useState(false);
  const [username, setUsername] = useState("Member");

  useEffect(() => {
    if (isLoggedIn) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUsername(storedUser.username);
      }
    }
  }, [isLoggedIn]);

  const closeNavbar = () => {
    setExpanded(false);
  };
  const handleLogoutClick = () => {
    AuthService.logout();
    handleLogout();
    closeNavbar();
  };

  return (
    <Navbar
      expanded={expanded}
      onToggle={setExpanded}
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      className="mb-4"
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

            <NavDropdown title="Member pages" id="basic-nav-dropdown">
              {!isLoggedIn && (
                <NavDropdown.Item
                  as={NavLink}
                  to="/login"
                  onClick={closeNavbar}
                  className={({ isActive }) =>
                    isActive ? "active nav-link" : "nav-link"
                  }
                >
                  {" "}
                  Login to access
                </NavDropdown.Item>
              )}

              {isLoggedIn && (
                <>
                  <NavDropdown.Item
                    as={NavLink}
                    to="/memberpage"
                    onClick={closeNavbar}
                    className={({ isActive }) =>
                      isActive ? "active nav-link" : "nav-link"
                    }
                  >
                    My Animals
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    as={NavLink}
                    to="/addanimal"
                    onClick={closeNavbar}
                    className={({ isActive }) =>
                      isActive ? "active nav-link" : "nav-link"
                    }
                  >
                    Add New Animal
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    as={NavLink}
                    to="/comment"
                    onClick={closeNavbar}
                    className={({ isActive }) =>
                      isActive ? "active nav-link" : "nav-link"
                    }
                  >
                    All Animals
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>

            {isLoggedIn && (
              <NavLink
                to="/loggedout"
                onClick={handleLogoutClick}
                className="btn btn-outline-warning"
              >
                Log out ({username})
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavMenu;
