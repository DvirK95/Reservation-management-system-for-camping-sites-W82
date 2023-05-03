import logo from "./logo.png";
// import small_logo from "./logo_mobile_sprites.png";
import "./Header.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <>
      <div className="header-top"></div>
      <Navbar collapseOnSelect expand="lg" className="navbar-custom">
        <Container className="d-flex">
          <Navbar.Brand href="#home" className="ms-auto">
            <img className="custom-logo-link" src={logo} alt="רשות הטבע והגנים" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" >
            <Nav >
              <Nav.Link href="#info" > אודות </Nav.Link>
              <Nav.Link href="#campingSites" > אתרי קמפינג </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;