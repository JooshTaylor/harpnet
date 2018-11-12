import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FeedViewPosts from './FeedViewPosts/FeedViewPosts';
import FeedAddPosts from './FeedAddPosts/FeedAddPosts';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getProfile } from '../../../actions/profileActions';
import { followPrompt } from '../../../actions/followsActions';

import './Feed.css';

class Feed extends Component {

  componentDidMount() {
    this.props.getProfile(this.props.auth.user.user_id);
  }

  render() {

    const { auth, profile, feed, follows } = this.props;

    const followPrompt = this.props.followPrompt(auth.user.user_id);

    //Checks if the user is following any other users or not
    const postsCheck = follows.following.length === 0 ?
      //If the user is not following anybody, they will be prompted to follow some randomly suggested accounts
      (
        <div className="view__no-following">
          <h1 className="view__heading-1">Uh Oh! It looks like you haven't followed anybody yet</h1>
          <h2 className="view__heading-2">Follow other accounts to view their posts</h2>
          <h3 className="view__heading-3">Here are some accounts you make like to follow..</h3>
          {followPrompt}
        </div>
      ) :
      //If the user is following other users, they will see the user(s) post(s)
      (
        <ul className="view__following">
          <FeedViewPosts />
        </ul>
      );

    return (
      <section className="feed">
        <FeedAddPosts />
        {postsCheck}
      </section>
    )
  }
}

Feed.propTypes = {
  followPrompt: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  feed: PropTypes.object.isRequired,
  follows: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile,
    feed: state.feed,
    follows: state.follows
  }
}

export default connect(mapStateToProps, { followPrompt, getProfile })(withRouter(Feed));
