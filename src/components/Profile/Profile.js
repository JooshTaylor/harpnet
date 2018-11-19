import React, { Component } from 'react';
import './Profile.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Common/Spinner';
import ProfileViewPosts from './ProfileViewPosts/ProfileViewPosts';
import ProfileViewFollowing from './ProfileViewFollowing/ProfileViewFollowing';
import ProfileViewFollowers from './ProfileViewFollowers/ProfileViewFollowers';
import { getProfileById, clearViewProfile } from '../../actions/profileActions';
import { getPostsByUser } from '../../actions/postActions';
import { followUser, unfollowUser, getFollowData, getFollowDataByUser } from '../../actions/followsActions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "posts"
    }
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = this.props;

    if (nextProps.profile.reload) {
      this.props.getFollowData(auth.user.user_id, localStorage.getItem('token'));
    }
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getProfileById(this.props.match.params.id, localStorage.getItem('token'));
      this.props.getPostsByUser(this.props.match.params.id, localStorage.getItem('token'));
      // this.props.getFollowDataByUser(this.props.match.params.id, localStorage.getItem('token'));
    } else {
      this.props.getProfileById(this.props.auth.user.user_id, localStorage.getItem('token'));
      this.props.getPostsByUser(this.props.auth.user.user_id, localStorage.getItem('token'));
      // this.props.getFollowDataByUser(this.props.auth.user.user_id, localStorage.getItem('token'));
    }
  }

  componentWillUnmount() {
    this.props.clearViewProfile();
  }

  handleFollow = (e) => {
    const token = localStorage.getItem('token');
    const follower = { follower_id: this.props.auth.user.user_id }
    const following = [e.target.name]

    this.props.followUser(follower, Number(following[0]), token, 'profile');
  }

  handleUnfollow = (e) => {
    const token = localStorage.getItem('token');
    const unfollower = this.props.auth.user.user_id;
    const unfollowing = [e.target.name]

    this.props.unfollowUser(unfollower, Number(unfollowing[0]), token, 'profile');
  }

  changeView = (view) => {
    this.setState({
      view: view
    })
  }

  render() {
    const { post, profile, follows } = this.props;

    const infoCheck = !profile.viewProfile.bio && !profile.viewProfile.first_name && !profile.viewProfile.last_name ?
      (<p>This user has not provided any personal information</p>) :
      null;

    if (profile.loading && Object.keys(profile.viewProfile).length === 0) {
      return (<div className="profile-spinner"><Spinner /></div>)
    } else {
      return (
        <div className="profile">
          <div className="info">
            <div className="info__top">
              <div className="info__img-box">
                <img src={`https://robohash.org/${profile.viewProfile.username}/?200x200`} alt="profile" className="info__img" />
                <h1 className="info__username">{profile.viewProfile.username}</h1>
              </div>
              <div className="info__info">
                {
                  profile.viewProfile.first_name && profile.viewProfile.last_name ?
                    (<p className="info__name"><strong>Name:</strong> {profile.viewProfile.first_name} {profile.viewProfile.last_name}</p>) :
                    null
                }
                {
                  profile.viewProfile.first_name && !profile.viewProfile.last_name ?
                    (<p className="info__name"><strong>Name:</strong> {profile.viewProfile.first_name}</p>) :
                    null
                }
                {
                  profile.viewProfile.biography ?
                    (<p className="info__bio"><strong>Bio:</strong> {profile.viewProfile.biography}</p>) :
                    null
                }
                {infoCheck}
              </div>
              <div className="info__actions">
                {
                  profile.viewProfile.username === profile.profile.username ?
                    (<button className="info__btn">Edit Profile</button>) :
                    null
                }
                {
                  profile.viewProfile.username !== profile.profile.username ?
                    !follows.following.includes(profile.viewProfile.user_id) ?
                      (<button onClick={this.handleFollow} name={profile.viewProfile.user_id} className="info__btn info__btn--follow">Follow</button>) :
                      (<button onClick={this.handleUnfollow} name={profile.viewProfile.user_id} className="info__btn info__btn--unfollow">Unfollow</button>)
                    : null
                }

              </div>
            </div>
            <ul className="info__bottom">
              <li onClick={() => { this.changeView('posts') }} name="posts" className="info__option info__option--select">Posts</li>
              <li onClick={() => { this.changeView('following') }} className="info__option">Following</li>
              <li onClick={() => { this.changeView('followers') }} name="followers" className="info__option">Followers</li>
            </ul>
          </div>
          <div className="posts">
            {post.profile.posts && this.state.view === "posts" ? (<ProfileViewPosts />) : null}{follows.profile.following && this.state.view === "following" ? (<ProfileViewFollowing />) : null}{follows.profile.followers && this.state.view === "followers" ? (<ProfileViewFollowers />) : null}
          </div>
        </div>
      )
    }
  }
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  clearViewProfile: PropTypes.func.isRequired,
  getPostsByUser: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  getFollowData: PropTypes.func.isRequired,
  getFollowDataByUser: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { getFollowData, getFollowDataByUser, unfollowUser, followUser, getPostsByUser, getProfileById, clearViewProfile })(Profile);
