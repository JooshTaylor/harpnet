import React, { Component } from 'react';
import './Register.css';
import FormText from '../Forms/FormText/FormText';
import PubAcc from '../Common/PubAcc/PubAcc';

class Register extends Component {
  render() {
    return (
      <section className="Register">
        <h1 className="Register__heading-1">
            Register
        </h1>
        <form noValidate onSubmit={this.onSubmit} className="Register__form">
            <FormText type="text" name="userOrEmail" placeholder="Email Address or Username" onChange={this.onChange} value={this.state.userOrEmail} errors={this.props.errors} />
            <FormText type="password" name="password" placeholder="Password" onChange={this.onChange} value={this.state.password} errors={this.props.errors} />
            <input type="submit" className="Register__form-btn" value="Register" />
        </form>
        <h2 className="Register__heading-2">
            Or use one of our public accounts
        </h2>
        <PubAcc />
      </section>
    )
  }
}

export default Register;
