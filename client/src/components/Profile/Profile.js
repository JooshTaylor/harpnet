import React, { Component } from 'react'
import './Profile.css'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import { connect } from 'react-redux'

import Button from '../Common/Buttons/Button'
import Modal from 'react-modal'
import modalStyles from '../Common/Modal/modalStyles'
import Spinner from '../Common/Spinner/Spinner'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import ProfileSwitch from './ProfileSwitch/ProfileSwitch'
import ProfileViewPosts from './ProfileViewPosts/ProfileViewPosts'
import ProfileViewFollowing from './ProfileViewFollowing/ProfileViewFollowing'
import ProfileViewFollowers from './ProfileViewFollowers/ProfileViewFollowers'
import { getViewProfile, clearViewProfile } from '../../actions/profileActions'
import { deletePost } from '../../actions/postActions'
import {
  followUser,
  unfollowUser,
  getFollowData
} from '../../actions/followsActions'

if (process.env.NODE_ENV === 'test') Modal.setAppElement('body')
else Modal.setAppElement('#root')

class Profile extends Component {
  state = {
    view: 'posts',
    showModal: false,
    deleteSubject: -1,
    inactiveButtons: []
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.profile.reload !== this.props.profile.reload &&
      this.props.profile.reload === true
    ) {
      this.props.getFollowData(
        this.props.auth.user,
        localStorage.getItem('token')
      )
    }
    if (this.props.id !== prevProps.id) {
      this.props.getViewProfile(this.props.id, localStorage.getItem('token'))
    }
  }

  componentDidMount() {
    if (this.props.id) {
      this.props.getViewProfile(this.props.id, localStorage.getItem('token'))
    } else {
      const self = this
      setTimeout(function() {
        self.props.getViewProfile(
          self.props.auth.user,
          localStorage.getItem('token')
        )
      }, 1000)
    }
  }

  componentWillUnmount() {
    this.props.clearViewProfile()
  }

  handleFollow = e => {
    // Logic to handle buttons being disabled after click
    const btn = Number([e.target.name])
    this.setState({
      inactiveButtons: [...this.state.inactiveButtons, btn]
    })
    const self = this
    setTimeout(function() {
      const target = self.state.inactiveButtons.indexOf(btn)
      self.setState({
        inactiveButtons: self.state.inactiveButtons.filter(
          btn => self.state.inactiveButtons.indexOf(btn) !== target
        )
      })
    }, 1500)

    // Actual following functionality
    const arg1 = { follower_id: this.props.auth.user } // Follower ID
    const arg2 = [e.target.name] // Following ID

    this.props.followUser(
      arg1,
      Number(arg2[0]),
      localStorage.getItem('token'),
      'profile'
    )
  }

  handleUnfollow = e => {
    // Logic to handle buttons being disabled after click
    const btn = Number([e.target.name])
    this.setState({
      inactiveButtons: [...this.state.inactiveButtons, btn]
    })
    const self = this
    setTimeout(function() {
      const target = self.state.inactiveButtons.indexOf(btn)
      self.setState({
        inactiveButtons: self.state.inactiveButtons.filter(
          btn => self.state.inactiveButtons.indexOf(btn) !== target
        )
      })
    }, 1500)

    const arg1 = this.props.auth.user // Unfollower ID
    const arg2 = [e.target.name] // Unfollowee ID

    this.props.unfollowUser(
      arg1,
      Number(arg2[0]),
      localStorage.getItem('token'),
      'profile'
    )
  }

  changeView = view => {
    this.setState({
      view: view
    })
  }

  openModal = e => {
    this.setState({
      showModal: true,
      deleteSubject: [e.target.name]
    })
  }

  closeModal = () => {
    this.setState({
      showModal: false,
      deleteSubject: -1
    })
  }

  deletePost = () => {
    this.props.deletePost(
      this.state.deleteSubject,
      localStorage.getItem('token'),
      'profile'
    )
    this.closeModal()
  }

  render() {
    const { auth, profile, follows } = this.props
    if (!localStorage.getItem('token')) {
      navigate('/')
    }

    if (profile.loading || Object.keys(profile.viewProfile).length === 0) {
      return (
        <div className='profile-spinner'>
          <Spinner />
        </div>
      )
    } else if (
      (profile.viewProfile.profile.privacy === 3 &&
        profile.viewProfile.profile.user_id !== auth.user) ||
      (profile.viewProfile.profile.privacy === 2 &&
        profile.viewProfile.profile.user_id !== auth.user &&
        !follows.following.includes(profile.viewProfile.profile.user_id))
    ) {
      return (
        <div className='profile'>
          <h1 style={{ textAlign: 'center' }}>
            Sorry, this user's profile is private.
          </h1>
          <div style={{ width: '130px', margin: '0 auto' }}>
            <Button
              callback={() => navigate('/feed')}
              className='edit-profile-btn'
              text='Go To Feed'
            />
          </div>
        </div>
      )
    } else {
      if (profile.viewReload) {
        this.props.getViewProfile(this.props.id, localStorage.getItem('token'))
      }

      let viewWidget = <Spinner />
      if (this.state.view === 'posts') {
        viewWidget = (
          <ProfileViewPosts
            openModal={this.openModal}
            posts={profile.viewProfile.post}
            user_id={auth.user}
          />
        )
      } else if (this.state.view === 'following') {
        viewWidget = (
          <ProfileViewFollowing
            handleFollow={this.handleFollow}
            handleUnfollow={this.handleUnfollow}
            clientFollows={follows.following}
            clientId={auth.user}
            followings={profile.viewProfile.follows.following}
            inactiveButtons={this.state.inactiveButtons}
          />
        )
      } else if (this.state.view === 'followers') {
        viewWidget = (
          <ProfileViewFollowers
            handleFollow={this.handleFollow}
            handleUnfollow={this.handleUnfollow}
            clientFollows={follows.following}
            clientId={auth.user}
            followers={profile.viewProfile.follows.followers}
            followings={follows.following}
            inactiveButtons={this.state.inactiveButtons}
          />
        )
      }

      return (
        <div className='profile'>
          <div className='info'>
            <ProfileInfo
              profile={profile}
              follows={follows}
              handleFollow={this.handleFollow}
              handleUnfollow={this.handleUnfollow}
              inactiveButtons={this.state.inactiveButtons}
            />
            <ProfileSwitch
              selection={this.state.view}
              changeView={this.changeView}
            />
          </div>
          <div className='posts'>{viewWidget}</div>
          <Modal
            isOpen={this.state.showModal}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel='Delete Post Warning Modal'
            style={modalStyles}
          >
            <h2 className='modal__heading'>
              Are you sure you want to delete this post?
            </h2>
            <p className='modal__paragraph'>
              Once a post is deleted, it can never be recovered.
            </p>
            <div className='modal__btns'>
              <Button
                text='Go Back'
                callback={this.closeModal}
                className='modal-go-back'
              />
              <Button
                text='Delete'
                callback={this.deletePost}
                className='modal-delete'
              />
            </div>
          </Modal>
        </div>
      )
    }
  }
}

Profile.propTypes = {
  getViewProfile: PropTypes.func.isRequired,
  clearViewProfile: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  getFollowData: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  follows: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth,
    post: state.post,
    follows: state.follows
  }
}

export default connect(
  mapStateToProps,
  {
    getFollowData,
    unfollowUser,
    followUser,
    getViewProfile,
    clearViewProfile,
    deletePost
  }
)(Profile)
