import React, { Component } from 'react';
import './FeedAddPosts.css';

class FeedAddPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: ""
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const postData = {
      content: this.state.post,

    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <form className="post-form" onSubmit={this.onSubmit} noValidate>
        <input type="text" className="post-field" name="post" placeholder="Write a post.." onChange={this.onChange} value={this.state.post} />
        <input type="submit" className="post-btn" value="Submit" />
      </form>
    )
  }
}

export default FeedAddPosts;