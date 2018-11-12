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
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      followPrompt: []
    }
  }

  //We test here for when we receive a followPrompt prop. When it happens, we update the state, which in return will re-render the page with the suggested accounts.
  componentWillReceiveProps(nextProps) {
    if (nextProps.follows.followPrompt) {
      this.setState({
        followPrompt: nextProps.follows.followPrompt
      })
    }
  }

  //When the feed page is loaded, we set the token to our state for accessibility, then call 2 functions to retrieve data.
  componentDidMount() {
    this.setState({ token: localStorage.getItem('token') }, () => {
      this.props.getProfile(this.props.auth.user.user_id, this.state.token);
      this.props.followPrompt(this.props.auth.user.user_id, this.state.token);
    })
  }

  render() {

    const { auth, profile, feed, follows } = this.props;

    //Follow prompt is a list of suggest users for accounts that do not follow any users.
    const followPrompt = this.state.followPrompt.length > 0 ?
      this.state.followPrompt.map(account => {
        return (<li className="view__prompt-item">
          <div className="view__prompt-img-box">
            <img src={`https://robohash.org/${account.username}/?100x100`} alt="robot" className="view__prompt-img" />
          </div>
          <h3 className="view__prompt-username">{account.username}</h3>
          <button onClick={() => this.followUser(account.user_id)} className="view__prompt-btn" type="button">Follow</button>
        </li>
        )
      }) :
      null;

    //Checks if the user is following any other users or not
    const postsCheck = follows.following.length === 0 ?
      //If the user is not following anybody, they will be prompted to follow some randomly suggested accounts
      (
        <div className="view__no-following">
          <h1 className="view__heading-1">Uh Oh! It looks like you haven't followed anybody yet</h1>
          <div className="view__box">
            <button className="view__box-close" type="button">x</button>
            <h2 className="view__heading-2">Here are some accounts you may want to follow</h2>
            <ul className="view__follow-prompt">
              {followPrompt}
            </ul>
          </div>
        </div>
      ) :
      //If the user is following other users, they will see the user(s) post(s)
      (
        <ul className="view__following">
          <FeedAddPosts />
          <FeedViewPosts />
        </ul>
      );

    return (
      <section className="feed">
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
