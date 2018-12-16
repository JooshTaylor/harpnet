import React, { Component } from "react";
import "./Settings.css";
import { connect } from "react-redux";

import { deleteAccount, logoutUser } from "../../actions/authActions";
import { navigate } from "@reach/router";

class Settings extends Component {
  deleteAccount = () => {
    this.props.logoutUser();
    this.props.deleteAccount(this.props.auth.user);
    navigate("/");
  };

  render() {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    return (
      <div>
        <h1>Delete your account?</h1>
        <button onClick={this.deleteAccount}>Delete</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { deleteAccount, logoutUser }
)(Settings);
