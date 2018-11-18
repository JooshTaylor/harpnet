import React, { Component } from 'react';
import './Profile.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Common/Spinner';
import { getProfileById, clearViewProfile } from '../../actions/profileActions';
import { getPostsByUser } from '../../actions/postActions';

class Profile extends Component {

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getProfileById(this.props.match.params.id, localStorage.getItem('token'));
      this.props.getPostsByUser(this.props.match.params.id, localStorage.getItem('token'));
    } else {
      this.props.getProfileById(this.props.auth.user.user_id, localStorage.getItem('token'));
      this.props.getPostsByUser(this.props.auth.user.user_id, localStorage.getItem('token'));
    }
  }

  componentWillUnmount() {
    this.props.clearViewProfile();
  }

  render() {
    const { post, profile, follows } = this.props;

    const infoCheck = !profile.viewProfile.bio && !profile.viewProfile.first_name && !profile.viewProfile.last_name ?
      (<p>This user has not provided any personal information</p>) :
      null;

    if (profile.loading && Object.keys(profile.viewProfile).length === 0) {
      return (<div className="profile-spinner"><Spinner /></div>)
    } else {
      console.log(post.profile.posts);
      console.log(post.profile.comments);
      return (
        <div className="profile">
          <div className="info">
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
                    (<button onClick={this.handleFollow} className="info__btn">Follow</button>) :
                    (<button onClick={this.handleUnfollow} className="info__btn info__btn--red">Unfollow</button>)
                  : null
              }

            </div>
          </div>
          <div className="posts">
            Posts
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
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth,
    post: state.post,
    follows: state.follows
  }
}

export default connect(mapStateToProps, { getPostsByUser, getProfileById, clearViewProfile })(Profile);
