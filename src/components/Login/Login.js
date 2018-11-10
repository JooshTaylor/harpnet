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
      userOrEmail: "",
      password: ""
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      userOrEmail: this.state.userOrEmail,
      password: this.state.password
    }

    console.log(loginData);

    this.props.loginUser(loginData, this.props.history);
  }

  render() {
    if (this.props.auth.isLoggedIn) {
      return (<Redirect to='/feed' />)
    } else {
      return (
        <section className="login">
          <h1 className="login__heading-1">
              Login
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
