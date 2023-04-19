import logo from "./logo.png";
import "./Header.css";

function Header() {
  return (
    <header className="header-border">
      <div className="header-top"></div>
      <nav className="nav">
        <a className="custom-logo-link" href="/">
          <img className="logo" src={logo} alt="רשות הטבע והגנים" />
        </a>
        <ul>
          <li>
            <a href="#info"> &nbsp;&nbsp;&nbsp; אודות </a>
          </li>
          <li>
            <a href="#planTrip"> תכנון מסלול </a>
          </li>
          <li>
            <a href="#campingSites"> אתרי קמפינג </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
