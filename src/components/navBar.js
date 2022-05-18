import React, { useState, useEffect } from "react";
import { Navbar, Container, NavLink, NavDropdown, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";

const NavBar = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState(false);
  if (localStorage.getItem("token") !== undefined) {
    console.log("Checking token!");
  }

  useEffect(() => {
    if (localStorage.getItem("token") !== "") {
      setUser(true);
    }
  }, []);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link to="features">Features</Nav.Link>
              <Nav.Link to="pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item to="action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item to="action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item to="action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item to="action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {!user && <button
                className="btn btn-danger"
                onClick={() => navigate("/", { replace: true })}
              >
                Login
              </button>}
              {!user && <button
                className="btn btn-primary"
                onClick={() => navigate("/signup", { replace: true })}
              >
                SignUp
              </button>}
              {user && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                      localStorage.setItem("token", "");
                      navigate("/", { replace: true })}}
                >
                  Tyler
                </button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
