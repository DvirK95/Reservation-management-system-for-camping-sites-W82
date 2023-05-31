import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import logo from './logo_mobile.png';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer text-center text-white">
      <div className="container p-4 pb-0">
        <section className="mb-4">
          <img className="logo" src={logo} alt="רשות הטבע והגנים" />
        </section>

        <section className="mb-4">
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </section>
      </div>

      <div className="text-center p-3 under-footer">
        © כל הזכויות שמורות : &nbsp;
        <a
          className="text-white"
          href="https://www.linkedin.com/in/alina-visotzky-b6a745153/"
        >
          {' '}
          אלינה &{' '}
        </a>
        <a
          className="text-white"
          href="https://www.linkedin.com/in/dvir-karl-a59547140/"
        >
          {' '}
          דביר &{' '}
        </a>
        <a
          className="text-white"
          href="https://www.linkedin.com/in/lee-shmueli-cohen/"
        >
          {' '}
          לי{' '}
        </a>
      </div>
    </footer>
  );
}

export default Footer;
