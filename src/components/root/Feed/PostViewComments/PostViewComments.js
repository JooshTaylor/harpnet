import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './PostViewComments.css';

class PostViewComments extends Component {
  deleteComment = (e) => {
    const comment_id = [e.target.name]
  }

  render() {
    const comments = this.props.comments.map(comment => {
      return (
        <li key={comment.comment_id} className="comments__comment">
          <img className="comments__dp" src={`https://robohash.org/${comment.creator_username}/?200x200`} />
          <div className="comments__content-box">
            <h2 className="comments__name">
              {comment.creator_username}
            </h2>
            <p className="comments__text">
              {comment.text}
            </p>
            {
              comment.creator_id === this.props.auth.user.user_id ?
                (<button onClick={this.deleteComment} name={comment.comment_id} className="comments__delete">x</button>) :
                null
            }
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

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(PostViewComments);