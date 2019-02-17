import * as React from 'react'
import './App.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { Router, RouteComponentProps } from '@reach/router'

import Home from './components/Home/Home'
import Navigation from './components/Navigation/Navigation'
import ErrorBoundary from './components/Common/ErrorBoundary/ErrorBoundary'

import { authenticateUser } from './actions/authActions'
import { getProfile } from './actions/profileActions'
import { getFollowData } from './actions/followsActions'
import IUser from './interfaces/IUser'

// Lazy loaded component imports
const Register = React.lazy(() => import('./components/Register/Register'))
const Login = React.lazy(() => import('./components/Login/Login'))
const Feed = React.lazy(() => import('./components/Feed/Feed'))
const Search = React.lazy(() => import('./components/Search/Search/Search'))
const Profile = React.lazy(() => import('./components/Profile/Profile'))
const Settings = React.lazy(() => import('./components/Settings/Settings'))
const Post = React.lazy(() => import('./components/Post/Post'))

interface Props {
  authenticateUser(userData: IUser): void
  getProfile(userId: number, token: string): void
  getFollowData(userId: number, token: string): void
}

class App extends React.Component<RouteComponentProps & Props> {
  // Validating the auth token
  public componentDidMount() {
    const token = window.localStorage.getItem('token')
    if (token) {
      axios
        .get('/api/auth/authenticate', {
          headers: {
            Authorization: token
          }
        })
        .then(res => {
          if (res) {
            this.props.authenticateUser(res.data)
            this.props.getProfile(res.data.user_id, token)
            this.props.getFollowData(res.data.user_id, token)
          }
        })
        .catch(err => {
          console.log(err)
          window.localStorage.removeItem('token')
          window.location.reload()
        })
    }
  }

  public render() {
    return (
      <div className='app'>
        <ErrorBoundary>
          <Navigation />
        </ErrorBoundary>
        <ErrorBoundary>
          <main className='app__body'>
            <React.Suspense fallback={<div>loading...</div>}>
              <Router>
                <Home path='/' />
                <Login path='/login' />
                <Register path='/register' />
                <Feed path='/feed' />
                <Search path='/search/:params' />
                <Profile path='/profile' />
                <Profile path='/profile/:id' />
                <Settings path='/settings' />
                <Post path='/post/:id' />
              </Router>
            </React.Suspense>
          </main>
        </ErrorBoundary>
      </div>
    )
  }
}

export default connect(
  null,
  { authenticateUser, getProfile, getFollowData }
)(App)
