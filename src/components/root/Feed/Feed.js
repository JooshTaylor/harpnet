import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FeedViewPosts from './FeedViewPosts/FeedViewPosts';
import FeedAddPosts from './FeedAddPosts/FeedAddPosts';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getProfile } from '../../../actions/profileActions';
import { followPrompt, getFollowData, followUser } from '../../../actions/followsActions';

import './Feed.css';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      followPrompt: [],
      propsReceivedCount: 0 //This facilitates the process for checking whether the followPrompt action is dispatched or not.
    }
  }

  //We test here for when we receive a followPrompt prop. When it happens, we update the state, which in return will re-render the page with the suggested accounts.
  componentWillReceiveProps(nextProps) {
    if (nextProps.follows.followPrompt) {
      this.setState({
        followPrompt: nextProps.follows.followPrompt
      })
    }

    //Ugly way of checking if the user is following anybody or not. By the third time props are received regarding the following array, it should contain the appropriate data. If by this point it is empty, it is safe to call the followPrompt action.
    if (nextProps.follows.following) {
      if (this.state.propsReceivedCount === 0) {
        this.setState({ propsReceivedCount: 1 })
      } else if (this.state.propsReceivedCount === 1) {
        this.setState({ propsReceivedCount: 2 })
      } else if (this.state.propsReceivedCount === 2) {
        this.setState({ propsReceivedCount: 3 })
      } else if (this.state.propsReceivedCount === 3 && this.props.follows.following.length === 0) {
        this.setState({ propsReceivedCount: 4 })
        this.props.followPrompt(this.props.auth.user.user_id, this.state.token);
      }
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
    followPrompt, getProfile, getFollowData, followUser
  }
)(withRouter(Feed));
