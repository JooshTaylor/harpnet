import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FeedViewPosts from './FeedViewPosts/FeedViewPosts';
import FeedAddPosts from './FeedAddPosts/FeedAddPosts';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getProfile } from '../../actions/profileActions';
import { getFollowData, followUser } from '../../actions/followsActions';

import './Feed.css';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    }
  }

  //When the feed page is loaded, we set the token to our state for accessibility, then call 2 functions to retrieve data.
  componentDidMount() {
    this.setState({ token: localStorage.getItem('token') }, () => {
      this.props.getProfile(this.props.auth.user.user_id, this.state.token);
      this.props.getFollowData(this.props.auth.user.user_id, this.state.token);
    })
  }

  followUser = (id) => {
    // console.log(this.state.token);
    this.props.followUser({ follower_id: this.props.auth.user.user_id }, id, this.state.token, "prompt");
    this.props.getFollowData(this.props.auth.user.user_id, this.state.token);
  }

  render() {
    const { follows } = this.props;

    //Checks if the user is following any other users or not
    const postsCheck = follows.following.length !== 0 ?
      //If the user is following other users, they will see the user(s) post(s)
      (
        <ul className="view__following">
          <FeedAddPosts />
          <FeedViewPosts />
        </ul>
      ) :
      //If the user is not following anybody, they will be prompted to follow some randomly suggested accounts
      (
        <div className="view__no-following">
          <h1 className="view__heading-1">Uh Oh! It looks like you haven't followed anybody yet</h1>
          <div className="view__box">
            <h2 className="view__heading-2">Search for other users to follow in the searchbar! Hint: there aren't very many users so just search for 'A'.</h2>
          </div>
        </div>
      );

    return (
      <section className="feed">
        {postsCheck}
      </section>
    )
  }
}

Feed.propTypes = {
  followUser: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  getFollowData: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  follows: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile,
    follows: state.follows
  }
}

export default connect(mapStateToProps,
  {
    getProfile, getFollowData, followUser
  }
)(withRouter(Feed));
