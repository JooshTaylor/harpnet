import React, { Component } from "react";
import "./FeedAddPosts.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Button from "../../Common/Buttons/Button";
import { makePost } from "../../../actions/postActions";

class FeedAddPosts extends Component {
  state = {
    post: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const postData = {
      creator_id: this.props.auth.user,
      creator_username: this.props.profile.profile.username,
      content: this.state.post,
      post_date: new Date()
        .toString()
        .split(" ")
        .slice(1, 5)
        .join(" ")
    };

    const reloadData = {
      following: this.props.follows.following,
      id: this.props.auth.user
    };

    this.props.makePost(postData, localStorage.getItem("token"), reloadData);
    this.setState({ post: "" });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { errors } = this.props;
    return (
      <form className="post-form" noValidate>
        <input
          type="text"
          className="post-field"
          name="post"
          placeholder="Write a post.."
          onChange={this.onChange}
          value={this.state.post}
        />
        <Button className="post-btn" text="Submit" callback={this.onSubmit} />
        {Object.keys(errors).length > 0 ? (
          <small className="post-errors">{errors.errors.post}</small>
        ) : null}
      </form>
    );
  }
}

FeedAddPosts.propTypes = {
  makePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  follows: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile,
    follows: state.follows,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { makePost }
)(FeedAddPosts);
