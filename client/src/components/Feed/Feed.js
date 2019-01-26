import React, { Component } from "react";
import "./Feed.css";
import PropTypes from "prop-types";
import Spinner from "../Common/Spinner";
import { connect } from "react-redux";
// import requireAuth from "../HOC/requireAuth";

import FeedViewPosts from "./FeedViewPosts/FeedViewPosts";
import FeedAddPosts from "./FeedAddPosts/FeedAddPosts";
import FeedNoPosts from "./FeedNoPosts/FeedNoPosts";
import { resetSinglePost } from "../../actions/postActions";
import { navigate } from "@reach/router";
import SuggestedFollowsList from "../Suggestions/SuggestedFollowsList/SuggestedFollowsList";

class Feed extends Component {
  componentWillMount() {
    this.props.resetSinglePost();
  }

  renderPosts() {
    const { follows, post } = this.props;
    if (follows.loading) {
      return <Spinner />;
    } else if (
      !follows.loading &&
      follows.following.length === 0 &&
      post.posts.length === 0
    ) {
      return <FeedNoPosts />;
    } else {
      return (
        <ul className="view__following">
          <div className="feed__container--left">
            <FeedAddPosts />
            <FeedViewPosts />
          </div>
          <SuggestedFollowsList />
        </ul>
      );
    }
  }

  render() {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    return <section className="feed">{this.renderPosts()}</section>;
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
