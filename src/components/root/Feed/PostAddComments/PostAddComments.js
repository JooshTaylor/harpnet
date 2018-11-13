import React, { Component } from 'react';
import './PostAddComments.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeComment } from '../../../../actions/postActions';

class PostAddComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const commentData = {
      post_id: this.props.post_id,
      creator_id: this.props.auth.user.user_id,
      creator_username: this.props.profile.profile.username,
      text: this.state.comment,
      comment_date: new Date().toString().split(' ').slice(1, 5).join(' ')
    }

    this.props.makeComment(commentData, localStorage.getItem('token'));
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <form className="comment-form" onSubmit={this.onSubmit} noValidate>
        <img className="comment-user-pic" src={`https://robohash.org/${this.props.profile.profile.username}/?200x200`} />
        <input type="text" className="comment-field" name="comment" placeholder="Write a comment.." onChange={this.onChange} value={this.state.comment} />
        <input type="submit" className="comment-btn" value="Submit" />
      </form>
    )
  }
}

PostAddComments.propTypes = {
  makeComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  post_id: PropTypes.number.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  }
}

export default connect(mapStateToProps, { makeComment })(PostAddComments);