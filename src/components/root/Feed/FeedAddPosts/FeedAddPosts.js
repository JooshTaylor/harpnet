import React, { Component } from 'react';
import './FeedAddPosts.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makePost } from '../../../../actions/postActions';

class FeedAddPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: ""
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const postData = {
      creator_id: this.props.auth.user.user_id,
      creator_username: this.props.profile.profile.username,
      content: this.state.post,
      post_date: new Date().toString().split(' ').slice(1, 5).join(' ')
    }

    const reloadData = {
      following: this.props.follows.following,
      id: this.props.auth.user.user_id
    }

    this.props.makePost(postData, localStorage.getItem('token'), reloadData);
    this.setState({ post: "" })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <form className="post-form" onSubmit={this.onSubmit} noValidate>
        <input type="text" className="post-field" name="post" placeholder="Write a post.." onChange={this.onChange} value={this.state.post} />
        <input type="submit" className="post-btn" value="Submit" />
      </form>
    )
  }
}

FeedAddPosts.propTypes = {
  makePost: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { makePost })(FeedAddPosts);