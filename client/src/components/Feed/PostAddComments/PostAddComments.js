import React, { Component } from 'react'
import './PostAddComments.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from '../../Button/Button'
import { makeComment } from '../../../actions/postActions'

class PostAddComments extends Component {
  state = {
    comment: ''
  }

  onSubmit = e => {
    e.preventDefault()

    const commentData = {
      post_id: this.props.post_id,
      creator_id: this.props.auth.user,
      creator_username: this.props.profile.profile.username,
      text: this.state.comment,
      comment_date: new Date()
        .toString()
        .split(' ')
        .slice(1, 5)
        .join(' ')
    }

    // If the comment was made from the /post/id route, single===true
    const single = this.props.single

    this.props.makeComment(commentData, localStorage.getItem('token'), single)
    this.setState({ comment: '' })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <form className="comment-form" noValidate>
        <img
          alt="Commenter"
          className="comment-user-pic"
          src={`https://robohash.org/${
            this.props.profile.profile.username
          }/?200x200`}
        />
        <input
          type="text"
          className="comment-field"
          name="comment"
          placeholder="Write a comment.."
          onChange={this.onChange}
          value={this.state.comment}
        />
        <Button
          className="comment-btn"
          text="Submit"
          callback={this.onSubmit}
        />
      </form>
    )
  }
}

PostAddComments.propTypes = {
  makeComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  post_id: PropTypes.number.isRequired,
  follows: PropTypes.object.isRequired,
  single: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile,
    follows: state.follows
  }
}

export default connect(
  mapStateToProps,
  { makeComment }
)(PostAddComments)
