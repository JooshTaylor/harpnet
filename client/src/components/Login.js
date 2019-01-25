import React, { Component } from "react";
import styled from "styled-components";
import { H1, H2 } from "../styles/headings";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { navigate } from "@reach/router";

import Form from "./Forms/Form";
import PubAcc from "./Common/PubAcc/PubAcc";
import { loginUser } from "../actions/authActions";

const LoginStyles = styled.section`
  display: flex;
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.text};
  flex-direction: column;
  align-items: center;
  padding: 6rem 0 15rem;
  text-align: center;
`;

class Login extends Component {
  //Runs on form submission
  onSubmit = e => {
    e.preventDefault();

    const loginData = {
      userOrEmail: this.state.userOrEmail,
      password: this.state.password
    };

    //Redux action for logging users in. Takes form data and browser history.
    this.props.loginUser(loginData);
  };

  render() {
    const { auth } = this.props;
    //If a users is logged in, they cannot access this page and are redirected to their feed.
    if (auth.isLoggedIn) {
      navigate("/feed");
      return null;
    }

    return (
      <LoginStyles>
        <H1>Login To Your account</H1>
        <Form login />
        <H2>Or login to one of our public accounts</H2>
        <PubAcc />
      </LoginStyles>
    );
  }
}

Login.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
