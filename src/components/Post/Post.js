import React, { Component } from "react";
import "./Post.css";
import { navigate } from "@reach/router";
import { connect } from "react-redux";

import Spinner from "../Common/Spinner";
import { getPostById } from "../../actions/postActions";

class Post extends Component {
  componentDidMount() {
    if (this.props.id && localStorage.getItem("token")) {
      this.props.getPostById(this.props.id, localStorage.getItem("token"));
    }
  }

  render() {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    const { fromFeed } = this.props;
    if (!fromFeed && Object.keys(this.props.post.single).length === 0) {
      return <Spinner />;
    } else if (fromFeed && Object.keys(this.props.singlePost).length === 0) {
      return <Spinner />;
    } else {
      let post;
      let user_id;
      if (Object.keys(this.props.post.single).length > 0) {
        post = this.props.post.single;
        user_id = this.props.post.single.user_id;
      } else {
        post = this.props.singlePost;
        user_id = this.props.user_id;
      }
      return (
        <div className="post__top">
          <div className="post__details">
            <div className="post__details-img-box">
              <img
                className="post__details-img"
                src={`https://robohash.org/${post.creator_username}/?200x200`}
                alt={post.creator_username}
                onClick={() => navigate(`/profile/${post.creator_id}`)}
              />
            </div>
            <div className="post__details-text-box">
              <h2
                className="post__details-username"
                onClick={() => navigate(`/profile/${post.creator_id}`)}
              >
                {post.creator_username}
              </h2>
              <h3 className="post__details-date">
                {post.post_date
                  .split(" ")
                  .slice(0, 3)
                  .join(" ")}
                <br />
                {post.post_date
                  .split(" ")
                  .slice(3, 4)
                  .toString()
                  .split(":")
                  .slice(0, 2)
                  .join(":")}
              </h3>
            </div>
            {post.creator_id === user_id ? (
              <button
                onClick={this.props.openModal}
                name={post.post_id}
                className="post__delete"
              >
                &times;
              </button>
            ) : null}
          </div>
          <div className="post__content-box">
            <p className="post__content">{post.content}</p>
          </div>
          <div className="post__features-box">{post.score} points</div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    post: state.post
  };
};

export default connect(
  mapStateToProps,
  { getPostById }
)(Post);
