import React, { Component } from "react";
import "./PostViewComments.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../../actions/postActions";

class PostViewComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeletePrompt: false,
      deleteSubject: -1 //The delete subject when not -1 holds the value of the post potentially being deleted
    };
  }

  toggleDeletePrompt = e => {
    if (!this.state.showDeletePrompt) {
      this.setState({
        showDeletePrompt: true,
        deleteSubject: [e.target.name]
      });
    } else {
      this.setState({
        showDeletePrompt: false,
        deleteSubject: -1
      });
    }
  };

  deleteComment = e => {
    this.props.deleteComment([e.target.name], localStorage.getItem("token"));
    // this.toggleDeletePrompt();
  };

  render() {
    const comments = this.props.comments.map(comment => {
      return (
        <li
          key={comment.comment_id}
          id={comment.comment_id}
          className="comments__comment"
        >
          <img
            className="comments__dp"
            alt="Commenter"
            src={`https://robohash.org/${comment.creator_username}/?200x200`}
          />
          <div className="comments__content-box">
            <h2 className="comments__name">{comment.creator_username}</h2>
            <p className="comments__text">{comment.text}</p>
            {comment.creator_id === this.props.auth.user ? (
              <button
                onClick={this.deleteComment}
                name={comment.comment_id}
                className="comments__delete"
              >
                x
              </button>
            ) : null}
          </div>
        </li>
      );
    });

    return (
      <ul className="comments">
        {/* {deletePrompt} */}
        {comments}
      </ul>
    );
  }
}

PostViewComments.propTypes = {
  comments: PropTypes.array.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { deleteComment }
)(PostViewComments);
