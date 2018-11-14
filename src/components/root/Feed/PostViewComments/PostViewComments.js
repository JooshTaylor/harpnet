import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PostViewComments.css';

class PostViewComments extends Component {
  render() {
    const comments = this.props.comments.map(comment => {
      return (
        <li key={comment.comment_id} className="comments__comment">
          <img className="comments__dp" src={`https://robohash.org/${comment.creator_username}`} />
          <div className="comments__content-box">
            <h2 className="comments__name">
              {comment.creator_username}
            </h2>
            <p className="comments__text">
              {comment.text}
            </p>
          </div>
        </li>
      )
    })

    return (
      <ul className="comments">
        {comments}
      </ul>
    )
  }
}

PostViewComments.propTypes = {
  comments: PropTypes.array.isRequired
}

export default PostViewComments;