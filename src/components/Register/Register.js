import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Register.css";
import FormText from "../Forms/FormText/FormText";
import PubAcc from "../Common/PubAcc/PubAcc";
import { registerUser } from "../../actions/authActions";
import { connect } from "react-redux";
import { navigate } from "@reach/router";

class Register extends Component {
  constructor(props) {
    super(props);
    //Tracking input values
    this.state = {
      email: "",
      username: "",
      password1: "",
      password2: "",
      day: "20", //Hardcoded these because i took out this functionality but it's still required in the database.
      month: "09",
      year: "1999"
    };
  }

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

    const dob = `${this.state.day}-${this.state.month}-${this.state.year}`;

    const userData = {
      email: email.toLowerCase(),
      username: username,
      password1,
      password2,
      dob
    };

    //Redux action for registering users. Takes form data and browser history.
    this.props.registerUser(userData);
  };

  render() {
    //If a users is logged in, they cannot access this page and are redirected to their feed.
    if (this.props.auth.isLoggedIn) {
      navigate("/feed");
    } else {
      return (
        <section className="register">
          <h1 className="register__heading-1">Sign up for an account</h1>
          <small>
            The backend is hosted by Heroku's free service, which initially is
            slow to start up (like this website was), so registering an account
            or logging into a public account may take up to 10 seconds. After
            that things should run much faster.
          </small>
          <form noValidate onSubmit={this.onSubmit} className="register__form">
            <FormText
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={this.onChange}
              value={this.state.email}
              errors={this.props.errors}
            />
            <FormText
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.onChange}
              value={this.state.username}
              errors={this.props.errors}
            />
            <FormText
              type="password"
              name="password1"
              placeholder="Password"
              onChange={this.onChange}
              value={this.state.password1}
              errors={this.props.errors}
            />
            <FormText
              type="password"
              name="password2"
              placeholder="Password"
              onChange={this.onChange}
              value={this.state.password2}
              errors={this.props.errors}
            />
            <input
              type="submit"
              className="register__form-btn"
              value="Register"
            />
          </form>
          <h2 className="register__heading-2">
            Or use one of our public accounts
          </h2>
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
