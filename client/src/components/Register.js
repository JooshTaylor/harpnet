import React, { Component } from "react";
import { H1, H2 } from "../styles/headings";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { navigate } from "@reach/router";

import Form from "./Forms/Form";
import PubAcc from "./Common/PubAcc/PubAcc";
import { registerUser } from "../actions/authActions";

class Register extends Component {
  state = {
    email: "",
    username: "",
    password1: "",
    password2: ""
  };

  //Tracking input value changes
  onChange = e => {
    this.setState({
      //For cases where the input is not password, it will be converted to lowercase for DB storing. This makes input fields case insensitive (except for the passwords)
      [e.target.name]: e.target.value
    });
  };

  //Runs on form submission
  onSubmit = e => {
    e.preventDefault();

    const { email, username, password1, password2 } = this.state;
    const userData = {
      email: email.toLowerCase(),
      username: username,
      password1,
      password2
    };

    //Redux action for registering users. Takes form data and browser history.
    this.props.registerUser(userData);
  };

  render() {
    //If a users is logged in, they cannot access this page and are redirected to their feed.
    if (this.props.auth.isLoggedIn) {
      navigate("/feed");
      return null;
    } else {
      return (
        <section className="register">
          <H1>Sign up for an account</H1>
          <Form register />
          <H2>Or use one of our public accounts</H2>
          <PubAcc />
        </section>
      );
    }
  }
}

Register.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
