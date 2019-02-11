import React, { Component, lazy, Suspense } from "react";
import "./App.css";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { Router } from "@reach/router";

import Home from "./components/Home/Home";
import Navigation from "./components/Navigation/Navigation";
import ErrorBoundary from "./components/Common/ErrorBoundary";

import { authenticateUser } from "./actions/authActions";
import { getProfile } from "./actions/profileActions";
import { getFollowData } from "./actions/followsActions";

// Lazy loaded component imports
const Register = lazy(() => import("./components/Register/Register"));
const Login = lazy(() => import("./components/Login/Login"));
const Feed = lazy(() => import("./components/Feed/Feed"));
const Search = lazy(() => import("./components/Search/Search/Search"));
const Profile = lazy(() => import("./components/Profile/Profile"));
const Settings = lazy(() => import("./components/Settings/Settings"));
const Post = lazy(() => import("./components/Post/Post"));

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
        <ErrorBoundary>
          <Navigation />
        </ErrorBoundary>
        <ErrorBoundary>
          <main className="app__body">
            <Suspense fallback={<div>loading...</div>}>
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
            </Suspense>
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
