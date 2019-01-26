import React, { Component, Fragment } from "react";
import "./PostViewComments.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Button from "../../Common/Buttons/Button";
import Modal from "react-modal";
import { deleteComment } from "../../../actions/postActions";
import { navigate } from "../../../../node_modules/@reach/router";

const modalStyles = {
  content: {
    width: "30%",
    height: "20%",
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
};

Modal.setAppElement("#root");

class PostViewComments extends Component {
  state = {
    showModal: false,
    deleteSubject: -1 //The delete subject when not -1 holds the value of the post potentially being deleted
  };

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
      localStorage.getItem("token"),
      this.props.single
    );
    this.closeModal();
  };

  render() {
    const commentsWidget = this.props.comments.map(comment => {
      return (
        <li
          key={comment.comment_id}
          id={comment.comment_id}
          className="comments__comment"
        >
          <img
            style={{ cursor: "pointer" }}
            className="comments__dp"
            alt="Commenter"
            src={`https://robohash.org/${comment.creator_username}/?200x200`}
            onClick={() => navigate(`/profile/${comment.creator_id}`)}
          />
          <div className="comments__content-box">
            <h2
              style={{ cursor: "pointer" }}
              className="comments__name"
              onClick={() => navigate(`/profile/${comment.creator_id}`)}
            >
              {comment.creator_username}
            </h2>
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
          <h2 className="modal__heading">
            Are you sure you want to delete this comment?
          </h2>
          <p className="modal__paragraph">
            Once a comment is deleted, it can never be recovered.
          </p>
          <div className="modal__btns">
            <Button
              text="Go Back"
              callback={this.closeModal}
              className="modal-go-back"
            />
            <Button
              text="Delete"
              callback={this.deleteComment}
              className="modal-delete"
            />
          </div>
        </Modal>
        <ul className="comments">{commentsWidget}</ul>
      </Fragment>
    );
  }
}

PostViewComments.propTypes = {
  auth: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  deleteComment: PropTypes.func.isRequired,
  single: PropTypes.bool
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
