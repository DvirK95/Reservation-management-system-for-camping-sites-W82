import React from "react";

import logo from './logo.png'
import './Header.css';

import 'bootstrap/dist/css/bootstrap.css';

function Header() {
    return(
        <header className="header-border">
            <div className="header-top"></div> 
            <nav className="nav">
                <a className="custom-logo-link" href="#" ><img className="logo" src={logo} alt="רשות הטבע והגנים"/></a>
                <ul>
                    <li><a href="#"> &nbsp;&nbsp;&nbsp; אודות </a></li>
                    <li><a href="#"> תכנון מסלול </a></li>
                    <li><a href="#"> אתרי קמפינג </a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;

