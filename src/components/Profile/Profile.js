import React, { Component } from "react";
import { navigate } from "@reach/router";
import "./Profile.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../Common/Spinner";
import ProfileViewPosts from "./ProfileViewPosts/ProfileViewPosts";
import ProfileViewFollowing from "./ProfileViewFollowing/ProfileViewFollowing";
import ProfileViewFollowers from "./ProfileViewFollowers/ProfileViewFollowers";
import { getViewProfile, clearViewProfile } from "../../actions/profileActions";
import { getPostsByUser } from "../../actions/postActions";
import {
  followUser,
  unfollowUser,
  getFollowData,
  getFollowDataByUser
} from "../../actions/followsActions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "posts"
    };
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = this.props;

    // This runs if the client has followed/unfollowed the user profile they are viewing.
    if (nextProps.profile.reload === true) {
      this.props.getFollowData(auth.user, localStorage.getItem("token"));
    }
  }

  componentDidMount() {
    if (this.props.id) {
      this.props.getViewProfile(this.props.id, localStorage.getItem("token"));
    } else {
      const self = this;
      setTimeout(function() {
        self.props.getViewProfile(
          self.props.auth.user,
          localStorage.getItem("token")
        );
      }, 1000);
    }
  }

  componentWillUnmount() {
    this.props.clearViewProfile();
  }

  handleFollow = e => {
    const arg1 = { follower_id: this.props.auth.user }; // Follower ID
    const arg2 = [e.target.name]; // Following ID

    this.props.followUser(
      arg1,
      Number(arg2[0]),
      localStorage.getItem("token"),
      "profile"
    );
  };

  handleUnfollow = e => {
    const arg1 = this.props.auth.user; // Unfollower ID
    const arg2 = [e.target.name]; // Unfollowee ID

    this.props.unfollowUser(
      arg1,
      Number(arg2[0]),
      localStorage.getItem("token"),
      "profile"
    );
  };

  changeView = view => {
    this.setState({
      view: view
    });
  };

  render() {
    const { post, profile, follows } = this.props;
    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    if (profile.loading || Object.keys(profile.viewProfile).length === 0) {
      return (
        <div className="profile-spinner">
          <Spinner />
        </div>
      );
    } else {
      const infoCheck =
        !profile.viewProfile.profile.bio &&
        !profile.viewProfile.profile.first_name &&
        !profile.viewProfile.profile.last_name ? (
          <p>This user has not provided any personal information</p>
        ) : null;

      return (
        <div className="profile">
          <div className="info">
            <div className="info__top">
              <div className="info__img-box">
                <img
                  src={`https://robohash.org/${
                    profile.viewProfile.profile.username
                  }/?200x200`}
                  alt="profile"
                  className="info__img"
                />
                <h1 className="info__username">
                  {profile.viewProfile.profile.username}
                </h1>
              </div>
              <div className="info__info">
                {profile.viewProfile.profile.first_name &&
                profile.viewProfile.profile.last_name ? (
                  <p className="info__name">
                    <strong>Name:</strong>{" "}
                    {profile.viewProfile.profile.first_name}{" "}
                    {profile.viewProfile.profile.last_name}
                  </p>
                ) : null}
                {profile.viewProfile.profile.first_name &&
                !profile.viewProfile.profile.last_name ? (
                  <p className="info__name">
                    <strong>Name:</strong>{" "}
                    {profile.viewProfile.profile.first_name}
                  </p>
                ) : null}
                {profile.viewProfile.biography ? (
                  <p className="info__bio">
                    <strong>Bio:</strong>{" "}
                    {profile.viewProfile.profile.biography}
                  </p>
                ) : null}
                {infoCheck}
              </div>
              <div className="info__actions">
                {profile.viewProfile.profile.username ===
                profile.profile.username ? (
                  <button className="info__btn">Edit Profile</button>
                ) : null}
                {profile.viewProfile.profile.username !==
                profile.profile.username ? (
                  !follows.following.includes(
                    profile.viewProfile.profile.user_id
                  ) ? (
                    <button
                      onClick={this.handleFollow}
                      name={profile.viewProfile.profile.user_id}
                      className="info__btn info__btn--follow"
                    >
                      Follow
                    </button>
                  ) : (
                    <button
                      onClick={this.handleUnfollow}
                      name={profile.viewProfile.profile.user_id}
                      className="info__btn info__btn--unfollow"
                    >
                      Unfollow
                    </button>
                  )
                ) : null}
              </div>
            </div>
            <ul className="info__bottom">
              <li
                onClick={() => {
                  this.changeView("posts");
                }}
                name="posts"
                className="info__option info__option--select"
              >
                Posts
              </li>
              <li
                onClick={() => {
                  this.changeView("following");
                }}
                className="info__option"
              >
                Following
              </li>
              <li
                onClick={() => {
                  this.changeView("followers");
                }}
                name="followers"
                className="info__option"
              >
                Followers
              </li>
            </ul>
          </div>
          <div className="posts">
            {post.profile.posts && this.state.view === "posts" ? (
              <ProfileViewPosts />
            ) : null}
            {follows.profile.following && this.state.view === "following" ? (
              <ProfileViewFollowing />
            ) : null}
            {follows.profile.followers && this.state.view === "followers" ? (
              <ProfileViewFollowers />
            ) : null}
          </div>
        </div>
      );
    }
  }
}

Profile.propTypes = {
  getViewProfile: PropTypes.func.isRequired,
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
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth,
    post: state.post,
    follows: state.follows
  };
};

export default connect(
  mapStateToProps,
  {
    getFollowData,
    getFollowDataByUser,
    unfollowUser,
    followUser,
    getPostsByUser,
    getViewProfile,
    clearViewProfile
  }
)(Profile);
