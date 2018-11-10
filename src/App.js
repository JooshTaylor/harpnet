import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/Common/PrivateRoute/PrivateRoute';

import Login from './components/Login/Login';

import Register from './components/Register/Register';

import Feed from './components/root/Feed/Feed';
import Footer from './components/root/Footer/Footer';
import Landing from './components/root/Landing/Landing';
import Navigation from './components/root/Navigation/Navigation';

import './App.css';

class App extends Component {
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

export default App;
