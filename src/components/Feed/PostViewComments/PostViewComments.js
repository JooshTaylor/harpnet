import React, { Component, Fragment } from "react";
import "./PostViewComments.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Modal from "react-modal";
import { deleteComment } from "../../../actions/postActions";

const modalStyles = {
  content: {
    marginTop: "7rem"
  }
};

Modal.setAppElement("#root");

class PostViewComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      deleteSubject: -1 //The delete subject when not -1 holds the value of the post potentially being deleted
    };
  }

  openModal = e => {
    this.setState({
      showModal: true,
      deleteSubject: [e.target.name]
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      deleteSubject: -1
    });
  };

  deleteComment = () => {
    this.props.deleteComment(
      this.state.deleteSubject,
      localStorage.getItem("token")
    );
    this.closeModal();
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
                onClick={this.openModal}
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
      <Fragment>
        <Modal
          isOpen={this.state.showModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Delete Post Warning Modal"
          style={modalStyles}
        >
          <h2>Are you sure you want to delete this comment?</h2>
          <p>Once a comment is deleted, it can never be recovered.</p>
          <button onClick={this.closeModal}>Go Back</button>
          <button onClick={this.deleteComment}>Delete</button>
        </Modal>
        <ul className="comments">
          {/* {deletePrompt} */}
          {comments}
        </ul>
      </Fragment>
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
