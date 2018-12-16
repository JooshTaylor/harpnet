import React, { Component } from "react";
import "./App.css";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { Router } from "@reach/router";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Feed from "./components/Feed/Feed";
import Landing from "./components/Landing/Landing";
import Navigation from "./components/Navigation/Navigation";
import Search from "./components/Search/Search/Search";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
import Post from "./components/Post/Post";

import { authenticateUser } from "./actions/authActions";
import { getProfile } from "./actions/profileActions";
import { getFollowData } from "./actions/followsActions";

class App extends Component {
  //Validating the auth token
  componentDidMount() {
    const token = window.localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/authenticate", {
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
        });
    }
  }

  render() {
    return (
      <div className="app">
        <Navigation />
        <main className="app__body">
          <Router>
            <Landing path="/" />
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
