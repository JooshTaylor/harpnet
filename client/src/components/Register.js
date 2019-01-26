import React, { Component } from 'react'
import styled from 'styled-components'
import { H1, H2 } from '../styles/headings'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigate } from '@reach/router'

import Form from './Forms/Form'
import PubAcc from './PubAcc'
import { registerUser } from '../actions/authActions'

const RegisterStyles = styled.section`
  display: flex;
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.text};
  flex-direction: column;
  align-items: center;
  padding: 6rem 0 15rem;
  text-align: center;
`

class Register extends Component {
  //Runs on form submission
  onSubmit = e => {
    e.preventDefault()

    const { email, username, password1, password2 } = this.state
    const userData = {
      email: email.toLowerCase(),
      username: username,
      password1,
      password2
    }

    //Redux action for registering users. Takes form data and browser history.
    this.props.registerUser(userData)
  }

  render() {
    //If a users is logged in, they cannot access this page and are redirected to their feed.
    if (this.props.auth.isLoggedIn) {
      navigate('/feed')
      return null
    } else {
      return (
        <RegisterStyles>
          <H1>Sign up for an account</H1>
          <Form register />
          <H2>Or use one of our public accounts</H2>
          <PubAcc />
        </RegisterStyles>
      )
    }
  }
}

Register.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    errors: state.errors,
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  { registerUser }
)(Register)
