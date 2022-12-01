import React from "react";
import { Container, Navbar, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useSignOutMutation } from "../services/UserApi";

const Header = () => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const [signOut] = useSignOutMutation();
  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut(user);
    navigate('/signIn');
  }
  return (
    <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <img src={Logo} alt="" style={{ width: "30px", height: "30px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/signIn">
              <Nav.Link>{!user && 'Login'}</Nav.Link>
            </LinkContainer>
            <NavDropdown title={`${user ? user.name : "visitor"}`} variant="dark">
              <Dropdown.Menu variant="dark">
                <NavDropdown.Item onClick={handleLogout}>LogOut</NavDropdown.Item>
              </Dropdown.Menu>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
