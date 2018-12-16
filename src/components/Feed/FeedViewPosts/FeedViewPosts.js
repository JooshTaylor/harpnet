import React, { Component, Fragment } from "react";
import "./FeedViewPosts.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Modal from "react-modal";
import Post from "../../Post/Post";
import PostAddComments from "../PostAddComments/PostAddComments";
import PostViewComments from "../PostViewComments/PostViewComments";
import { getFeed, deletePost } from "../../../actions/postActions";

const modalStyles = {
  content: {
    marginTop: "7rem"
  }
};

Modal.setAppElement("#root");

class FeedViewPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      deleteSubject: -1, //The delete subject when not -1 holds the value of the post potentially being deleted
      iteration: 1
    };
  }

  //When this component mounts, we fetch the user's feed from the DB based on who they are following
  componentDidMount() {
    const data = {
      following: this.props.follows.following,
      id: this.props.auth.user
    };
    this.props.getFeed(data, 1, localStorage.getItem("token"));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post.reload === true) {
      const data = {
        following: this.props.follows.following,
        id: this.props.auth.user
      };
      this.props.getFeed(
        data,
        this.state.iteration,
        localStorage.getItem("token")
      );
    }
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

  deletePost = () => {
    this.props.deletePost(
      this.state.deleteSubject,
      localStorage.getItem("token"),
      "feed"
    );
    this.closeModal();
  };

  showMorePosts = e => {
    let currentIteration = this.state.iteration;
    this.setState({ iteration: (currentIteration += 1) });
    const data = {
      following: this.props.follows.following,
      id: this.props.auth.user
    };
    this.props.getFeed(
      data,
      Number([e.target.name]) + 1,
      localStorage.getItem("token")
    );
  };

  render() {
    const { auth, post } = this.props;
    //Posts is an array of 30 posts made by the accounts that the user is following ordered from latest to earliest.

    const posts = post.posts.map(post => {
      return (
        <li key={post.post_id} id={post.post_id} className="post">
          <Post
            openModal={this.openModal}
            singlePost={post}
            user_id={auth.user}
            fromFeed={true}
          />
          <div className="post__bottom">
            <PostAddComments post_id={post.post_id} />
            {/* If the post has comments, it will render the PostViewComments component */}
            {this.props.post.comments ? (
              this.props.post.comments.filter(comment => {
                return comment.post_id === post.post_id;
              }).length !== 0 ? (
                <PostViewComments
                  comments={this.props.post.comments.filter(comment => {
                    return comment.post_id === post.post_id;
                  })}
                />
              ) : null
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
          <h2>Are you sure you want to delete this post?</h2>
          <p>Once a post is deleted, it can never be recovered.</p>
          <button onClick={this.closeModal}>Go Back</button>
          <button onClick={this.deletePost}>Delete</button>
        </Modal>
        <ul className="feed">
          {posts}
          {post.morePosts ? (
            <button
              name={this.state.iteration}
              type="button"
              onClick={this.showMorePosts}
              className="posts__showmore"
            >
              Show More
            </button>
          ) : null}
        </ul>
      </Fragment>
    );
  }
}

FeedViewPosts.propTypes = {
  getFeed: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  follows: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    follows: state.follows,
    post: state.post
  };
};

export default connect(
  mapStateToProps,
  { getFeed, deletePost }
)(FeedViewPosts);
