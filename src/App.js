import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { authenticateUser } from './actions/authActions';
import { getProfile } from './actions/profileActions';

import PrivateRoute from './components/Common/PrivateRoute/PrivateRoute';

import Login from './components/Login/Login';

import Register from './components/Register/Register';

import Feed from './components/root/Feed/Feed';
import Footer from './components/root/Footer/Footer';
import Landing from './components/root/Landing/Landing';
import Navigation from './components/root/Navigation/Navigation';

import './App.css';

class App extends Component {

  //Validating the auth token
  componentDidMount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/auth/authenticate', {
        headers: {
          // "Authorization": `Bearer ${token}`
          "Authorization": token
        }
      })
        .then(res => {
          if (res) {
            this.props.authenticateUser(res.data);
            this.props.getProfile(res.data.user_id);
          }
        })
        .catch(console.log(0));
    }
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Navigation />
          <main className="app__body">
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Switch>
              <PrivateRoute exact path='/feed' component={Feed} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect(null, { authenticateUser, getProfile })(App);
