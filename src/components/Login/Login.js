import React, { Component } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import FormText from '../Forms/FormText/FormText';
import PubAcc from '../Common/PubAcc/PubAcc';
import { loginUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Tracking input values
      userOrEmail: "",
      password: ""
    }
  }

  //Updating input value states
  onChange = (e) => {
    this.setState({
      //For cases where the input is not password, it will be converted to lowercase for DB storing. This makes input fields case insensitive (except for the passwords)
      [e.target.name]: [e.target.name].toString() === "password" ? e.target.value : e.target.value.toLowerCase()
    })
  }

  //Runs on form submission
  onSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      userOrEmail: this.state.userOrEmail,
      password: this.state.password
    }

    //Redux action for logging users in. Takes form data and browser history.
    this.props.loginUser(loginData, this.props.history);
  }

  render() {
    //If a users is logged in, they cannot access this page and are redirected to their feed.
    if (this.props.auth.isLoggedIn) {
      return (<Redirect to='/feed' />)
    } else {
      return (
        <section className="login">
          <h1 className="login__heading-1">
              Login To Your account
          </h1>
          <form noValidate onSubmit={this.onSubmit} className="login__form">
              <FormText type="text" name="userOrEmail" placeholder="Email Address or Username" onChange={this.onChange} value={this.state.userOrEmail} errors={this.props.errors} />
              <FormText type="password" name="password" placeholder="Password" onChange={this.onChange} value={this.state.password} errors={this.props.errors} />
              <input type="submit" className="login__form-btn" value="Login" />
          </form>
          <h2 className="login__heading-2">
              Or login to one of our public accounts
          </h2>
          <PubAcc />
        </section>
      )
    }
  }
}

Login.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    errors: state.errors,
    auth: state.auth
  }
}

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
