import React, { Component } from "react";
import "./Feed.css";
import PropTypes from "prop-types";
import Spinner from "../Common/Spinner";
import { connect } from "react-redux";

import FeedViewPosts from "./FeedViewPosts/FeedViewPosts";
import FeedAddPosts from "./FeedAddPosts/FeedAddPosts";
import { getProfile } from "../../actions/profileActions";
import { getFollowData, followUser } from "../../actions/followsActions";
import { getFeed } from "../../actions/postActions";
import { navigate } from "../../../node_modules/@reach/router";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: -1,
      token: ""
    };
  }

  followUser = id => {
    // console.log(this.state.token);
    this.props.followUser(
      { follower_id: this.props.auth.user },
      id,
      this.state.token,
      "prompt"
    );
    this.props.getFollowData(this.props.auth.user, this.state.token);
  };

  render() {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    const { follows } = this.props;
    let postsCheck;

    if (follows.loading) {
      postsCheck = <Spinner />;
    } else if (!follows.loading && follows.following.length === 0) {
      postsCheck = (
        <div className="view__no-following">
          <h1 className="view__heading-1">
            Uh Oh! It looks like you haven't followed anybody yet
          </h1>
          <div className="view__box">
            <h2 className="view__heading-2">
              Search for other users to follow in the searchbar! Hint: there
              aren't very many users so just search for 'A'.
            </h2>
          </div>
        </div>
      );
    } else {
      postsCheck = (
        <ul className="view__following">
          <FeedAddPosts />
          <FeedViewPosts />
        </ul>
      );
    }

    return <section className="feed">{postsCheck}</section>;
  }
}

Feed.propTypes = {
  followUser: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  getFollowData: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  follows: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile,
    follows: state.follows,
    post: state.post
  };
};

export default connect(
  mapStateToProps,
  {
    getProfile,
    getFollowData,
    followUser,
    getFeed
  }
)(Feed);
