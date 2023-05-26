import logo from './logo.png';
// import small_logo from "./logo_mobile_sprites.png";
import './Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { cartActions } from '../../store/cart-slice';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
  const counter = useSelector((state) => state.cart.counter);
  const cartIcon = <FontAwesomeIcon icon={faCartShopping} />;
  const dispatch = useDispatch();
  return (
    <>
      <div className="header-top"></div>
      <Navbar collapseOnSelect expand="lg" className="navbar-custom">
        <Container className="d-flex">
          <Navbar.Brand href="#home" className="ms-auto">
            <img
              className="custom-logo-link"
              src={logo}
              alt="רשות הטבע והגנים"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="#info"> אודות </Nav.Link>
              <Nav.Link href="#campingSites"> אתרי קמפינג </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Link
            id="cart-button"
            to="cart"
            onMouseOver={() => dispatch(cartActions.showCart(true))}
          >
            <span id="count">{counter}</span>
            {cartIcon}
          </Link>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
