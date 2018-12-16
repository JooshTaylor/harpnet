import React, { Component, Fragment } from "react";
import "./Settings.css";
import { navigate } from "@reach/router";
import { connect } from "react-redux";

import Spinner from "../Common/Spinner";
import { deleteAccount, logoutUser } from "../../actions/authActions";
import {
  makeProfilePrivate,
  makeProfilePublic,
  getProfile
} from "../../actions/profileActions";

class Settings extends Component {
  deleteAccount = () => {
    this.props.logoutUser();
    this.props.deleteAccount(this.props.auth.user);
    navigate("/");
  };

  makeProfilePrivate = () => {
    console.log(1);
    this.props.makeProfilePrivate(
      this.props.auth.user,
      localStorage.getItem("token")
    );
  };

  makeProfilePublic = () => {
    this.props.makeProfilePublic(
      this.props.auth.user,
      localStorage.getItem("token")
    );
  };

  render() {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    if (this.props.auth.user !== -1 && !this.props.auth.isLoggedIn) {
      localStorage.removeItem("token");
      navigate("/login");
    }

    if (Object.keys(this.props.profile).length === 0) {
      return <Spinner />;
    } else if (
      ["Harper", "Harphene", "Bailey"].includes(
        this.props.profile.profile.username
      )
    ) {
      return (
        <div>
          <h1>
            Sorry! You cannot edit the settings for a public account. Please
            make your own account to test these out (your account may be deleted
            on this page later).
          </h1>
        </div>
      );
    } else {
      if (this.props.profile.reload) {
        console.log(3);
        this.props.getProfile(
          this.props.auth.user,
          localStorage.getItem("token")
        );
      }

      return (
        <div>
          <h1>Delete your account?</h1>
          <button onClick={this.deleteAccount}>Delete</button>
          <hr />
          {this.props.profile.profile.private ? (
            <Fragment>
              <h1>Make your profile public?</h1>
              <button onClick={this.makeProfilePublic}>Go Public</button>
            </Fragment>
          ) : (
            <Fragment>
              <h1>Make your profile private?</h1>
              <button onClick={this.makeProfilePrivate}>Go Private</button>
            </Fragment>
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  {
    deleteAccount,
    logoutUser,
    makeProfilePrivate,
    makeProfilePublic,
    getProfile
  }
)(Settings);
