import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Navigation.css';

class Navigation extends Component {
  render() {
    // The navigation bar will change depending on whether the user is logged in or not.
    const navItems = (true) ? 
      (
        <ul className="nav__list">
          <li className="nav__item nav__item--home">
            <Link className="nav__link nav__link--home" to="/">Home</Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/register">Register</Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/login">Login</Link>
          </li>
        </ul>
      )
      :
      (
        <ul className="nav__list">
          <li className="nav__item">
            <Link className="nav__link" to="/">Home</Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/notifications">Notifications</Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/messages">Messages</Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/"><img src="" alt="logo" className="nav__logo" /></Link>
          </li>
          <li className="nav__item">
            <button className="nav__link--logout" type="button">Logout</button>
          </li>
        </ul>
      )
    ;

    return (
      <nav className="nav">
        {navItems}
      </nav>
    )
  }
}

export default Navigation;