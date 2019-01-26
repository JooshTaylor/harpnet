import React, { Component } from 'react'
import { NavStyles } from '../styles/Navigation'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, navigate } from '@reach/router'

import SearchBar from './Search/SearchBar'
import { logoutUser } from '../actions/authActions'

class Navigation extends Component {
  state = {
    //When true, this will show a dropdown below the "cogs" button
    dropDown: false
  }

  componentWillUnmount() {
    localStorage.removeItem('token')
  }

  //Event listener callback to toggle the dropdown menu
  toggleDropdown = e => {
    e.preventDefault()

    this.setState({
      dropDown: !this.state.dropDown
    })

    //Each menu button in the dropdown both toggles it and has an additional function. They are distinguished by their name value
    switch (e.target.name) {
      default:
        return null

      case 'logout':
        this.logout()
        break

      case 'settings':
        navigate('/settings')
        break
    }
  }

  //Will log a user out and redirect them to the homepage
  logout = e => {
    this.props.logoutUser(localStorage.getItem('token'))
    localStorage.removeItem('token')
    navigate('/')
  }

  render() {
    const { profile, auth } = this.props

    // The navigation bar will change depending on whether the user is logged in or not.
    const navItems = !localStorage.getItem('token') ? (
      <ul className="nav__list nav__list--nologin">
        <li className="nav__item nav__item--home-1">
          <Link id="nav-home-1" className="nav__link nav__link--home" to="/">
            Home
          </Link>
        </li>
        <li className="nav__item">
          <Link id="nav-register" className="nav__link" to="/register">
            Register
          </Link>
        </li>
        <li className="nav__item">
          <Link id="nav-login" className="nav__link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    ) : (
      <ul className="nav__list">
        <li className="nav__item nav__item--home-2">
          <Link className="nav__link nav__link--home" to="/feed">
            Home
          </Link>
        </li>
        <li className="nav__item nav__item--search">
          <SearchBar />
        </li>
        <li className="nav__item">
          <Link
            className="nav__link nav__link--profile"
            to={`/profile/${auth.user}`}
          >
            <img
              src={`https://robohash.org/${profile.profile.username}/?200x200`}
              className="nav__img"
              alt="profile"
            />{' '}
            {profile.profile.username}
          </Link>
        </li>
        <li className="nav__item">
          <Link className="nav__link" to="/messages">
            <i className="nav__link--icon fas fa-envelope" />
          </Link>
        </li>
        <li className="nav__item">
          <Link className="nav__link" to="/notifications">
            <i className="nav__link--icon fas fa-bell" />
          </Link>
        </li>
        <li className="nav__item nav__item--logout">
          <button
            onClick={this.toggleDropdown}
            name="dropdown"
            className="nav__link nav__link--logout"
            type="button"
          >
            <i className="nav__link--icon fas fa-cogs" />
          </button>
        </li>
      </ul>
    )
    //The nav dropdown will only show for users that are logged in and when the dropDown state is true
    const navDropdown =
      auth.isLoggedIn && this.state.dropDown ? (
        <ul className="nav__dropdown">
          <li className="nav__dropdown-item">
            <button
              onClick={this.toggleDropdown}
              name="settings"
              className="nav__dropdown-link"
            >
              Settings
            </button>
          </li>
          <li className="nav__dropdown-item">
            <button
              onClick={this.toggleDropdown}
              name="logout"
              className="nav__dropdown-link"
            >
              Logout
            </button>
          </li>
        </ul>
      ) : null

    return (
      <NavStyles>
        {navItems}
        {navDropdown}
      </NavStyles>
    )
  }
}

Navigation.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  }
}

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navigation)
