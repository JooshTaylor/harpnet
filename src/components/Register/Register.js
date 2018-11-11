import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Register.css';
import FormText from '../Forms/FormText/FormText';
import FormDate from '../Forms/FormDate/FormDate';
import PubAcc from '../Common/PubAcc/PubAcc';
import { registerUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
    //Tracking input values
    this.state = {
      email: "",
      username: "",
      password1: "",
      password2: "",
      day: "",
      month: "",
      year: ""
    }
  }

  //Tracking input value changes
  onChange = (e) => {
    this.setState({
      //For cases where the input is not password, it will be converted to lowercase for DB storing. This makes input fields case insensitive (except for the passwords)
      [e.target.name]: e.target.value
    })
  }

  //Runs on form submission
  onSubmit = (e) => {
    e.preventDefault();

    const { email, username, password1, password2 } = this.state;

    //If a date dropdown field was not entered, its value is converted to an empty string to be detected invalid by the backend form validation. Otherwise, converted to DD-MM-YYYY format
    const dob = this.state.day === "" || this.state.month === "" || this.state.year === "" ?
      "" :
      `${this.state.day}-${this.state.month}-${this.state.year}`;

    const userData = {
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password1,
      password2,
      dob
    }

    //Redux action for registering users. Takes form data and browser history.
    this.props.registerUser(userData, this.props.history);
  }

  render() {
    //If a users is logged in, they cannot access this page and are redirected to their feed.
    if (this.props.auth.isLoggedIn) {
      return (<Redirect to='/feed' />)
    } else {
      return (
        <section className="register">
          <h1 className="register__heading-1">
            Sign up for an account
          </h1>
          <form noValidate onSubmit={this.onSubmit} className="register__form">
            <FormText type="email" name="email" placeholder="Email Address" onChange={this.onChange} value={this.state.email} errors={this.props.errors} />
            <FormText type="text" name="username" placeholder="Username" onChange={this.onChange} value={this.state.username} errors={this.props.errors} />
            <FormText type="password" name="password1" placeholder="Password" onChange={this.onChange} value={this.state.password1} errors={this.props.errors} />
            <FormText type="password" name="password2" placeholder="Password" onChange={this.onChange} value={this.state.password2} errors={this.props.errors} />
            <FormDate name="dob" onChange={this.onChange} errors={this.props.errors} />
            <input type="submit" className="register__form-btn" value="Register" />
          </form>
          <h2 className="register__heading-2">
            Or use one of our public accounts
          </h2>
          <PubAcc />
        </section>
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

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
