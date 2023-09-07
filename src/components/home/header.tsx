import React from "react";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store/hooks";

const navBarStyles = {
  backgroundColor: "#fff",
  // backgroundImage: "linear-gradient(0deg, #D2D2D2 0%, #97D9E1 100%);",
  // boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.3)",
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const {user} = useAppSelector(state => state.user);

  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        sticky="top"
        style={navBarStyles}
      >
        <Navbar.Brand className="mr-auto" href="/">
          Firebase ChatApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <NavDropdown title={`Welcome, ${user?.displayName ?? user?.email}`} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate("/sign-out")}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
