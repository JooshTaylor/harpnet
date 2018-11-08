import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login/Login';

import Register from './components/Register/Register';

import Dashboard from './components/root/Dashboard/Dashboard';
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
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
