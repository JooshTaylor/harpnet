import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import GlobalStyles from "./styles/Global";
import { connect } from "react-redux";
import { Router } from "@reach/router";

import Login from "./components/Login";
import Register from "./components/Register";
import Feed from "./components/Feed/Feed";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Search from "./components/Search/Search/Search";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
import Post from "./components/Post/Post";
import ErrorBoundary from "./components/Common/ErrorBoundary";

import { authenticateUser } from "./actions/authActions";
import { getProfile } from "./actions/profileActions";
import { getFollowData } from "./actions/followsActions";

class App extends Component {
  //Validating the auth token
  componentDidMount() {
    const token = window.localStorage.getItem("token");
    if (token) {
      axios
        .get("/api/auth/authenticate", {
          headers: {
            Authorization: token
          }
        })
        .then(res => {
          if (res) {
            this.props.authenticateUser(res.data);
            this.props.getProfile(res.data.user_id, token);
            this.props.getFollowData(res.data.user_id, token);
          }
        })
        .catch(err => {
          console.log(err);
          window.localStorage.removeItem("token");
          window.location.reload();
        });
    }
  }

  render() {
    return (
      <div className="app">
        <GlobalStyles />
        <ErrorBoundary>
          <Navigation />
        </ErrorBoundary>
        <ErrorBoundary>
          <main className="app__body">
            <Router>
              <Home path="/" />
              <Login path="/login" />
              <Register path="/register" />
              <Feed path="/feed" />
              <Search path="/search/:params" />
              <Profile path="/profile" />
              <Profile path="/profile/:id" />
              <Settings path="/settings" />
              <Post path="/post/:id" />
            </Router>
          </main>
        </ErrorBoundary>
      </div>
    );
  }
}

App.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  getFollowData: PropTypes.func.isRequired
};

export default connect(
  null,
  { authenticateUser, getProfile, getFollowData }
)(App);
