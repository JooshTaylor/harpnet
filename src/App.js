import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { connect } from "react-redux";
import { Router } from "@reach/router";

import { authenticateUser } from "./actions/authActions";
import { getProfile } from "./actions/profileActions";

import PrivateRoute from "./components/Common/PrivateRoute/PrivateRoute";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import Feed from "./components/Feed/Feed";
import Landing from "./components/Landing/Landing";
import Navigation from "./components/Navigation/Navigation";
import Search from "./components/Search/Search/Search";

class App extends Component {
  componentDidMount() {
    //Validating the auth token
    const token = window.localStorage.getItem("token");
    if (token) {
      axios
        .get("https://lit-citadel-92787.herokuapp.com/api/auth/authenticate", {
          headers: {
            Authorization: token
          }
        })
        .then(res => {
          if (res) {
            this.props.authenticateUser(res.data);
            this.props.getProfile(res.data.user_id, token);
          }
        });
    }
  }

  render() {
    return (
      <div className="app">
        <Navigation path="/" />
        <main className="app__body">
          <Router>
            <Landing path="/" />
            <Login path="login" />
            <Register path="register" />
            <Feed path="feed" />
            <Search path="search" />
            <Profile path="profile" />
            <Profile path="profile/:id" />
          </Router>
        </main>
      </div>
    );
  }
}

export default connect(
  null,
  { authenticateUser, getProfile }
)(App);
