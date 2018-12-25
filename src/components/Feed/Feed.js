import React, { Component } from "react";
import "./Feed.css";
import PropTypes from "prop-types";
import Spinner from "../Common/Spinner";
import { connect } from "react-redux";

import FeedViewPosts from "./FeedViewPosts/FeedViewPosts";
import FeedAddPosts from "./FeedAddPosts/FeedAddPosts";
import { resetSinglePost } from "../../actions/postActions";
import { navigate } from "@reach/router";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: -1,
      token: ""
    };
  }

  componentWillMount() {
    this.props.resetSinglePost();
  }

  render() {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    const { follows, post } = this.props;
    let postsCheck;

    if (follows.loading) {
      postsCheck = <Spinner />;
    } else if (
      !follows.loading &&
      follows.following.length === 0 &&
      post.posts.length === 0
    ) {
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
  resetSinglePost: PropTypes.func.isRequired,
  follows: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    follows: state.follows,
    post: state.post
  };
};

export default connect(
  mapStateToProps,
  {
    resetSinglePost
  }
)(Feed);
