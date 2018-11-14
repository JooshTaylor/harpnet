import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFeed } from '../../../../actions/postActions';
import './FeedViewPosts.css';

import PostAddComments from '../PostAddComments/PostAddComments';
import PostViewComments from '../PostViewComments/PostViewComments';

class FeedViewPosts extends Component {

  //When this component mounts, we fetch the user's feed from the DB based on who they are following
  componentDidMount() {
    const data = {
      following: this.props.follows.following,
      id: this.props.auth.user.user_id
    }
    this.props.getFeed(data, localStorage.getItem('token'));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post.reload && nextProps.post.reload === true) {
      const data = {
        following: this.props.follows.following,
        id: this.props.auth.user.user_id
      }
      this.props.getFeed(data, localStorage.getItem('token'));
    }
  }

  render() {
    //Posts is an array of 20 posts made by the users followers ordered from latest to earliest.
    const { auth, post } = this.props;

    const deletePost = (
      <button className="post__delete">X</button>
    );

    const posts = post.posts.map(post => {
      return (
        <li key={post.post_id} className="post">
          <div className="post__top">
            <div className="post__details">
              <div className="post__details-img-box">
                <img className="post__details-img" src={`https://robohash.org/${post.creator_username}/?200x200`} alt={post.creator_username} />
              </div>
              <div className="post__details-text-box">
                <h2 className="post__details-username">
                  {post.creator_username}
                </h2>
                <h3 className="post__details-date">
                  {post.post_date.split(' ').slice(0, 3).join(' ')}<br />
                  {post.post_date.split(' ').slice(3, 4).toString().split(':').slice(0, 2).join(':')}
                </h3>
              </div>
              {post.creator_id === auth.user.user_id ? deletePost : null}
            </div>
            <div className="post__content-box">
              <p className="post__content">{post.content}</p>
            </div>
            <div className="post__features-box">
              Score
            </div>
          </div>
          <div className="post__bottom">
            <PostAddComments post_id={post.post_id} />
            {/* If the post has comments, it will render the PostViewComments component */}
            {this.props.post.comments
              ?
              this.props.post.comments.filter(comment => {
                return comment.post_id === post.post_id
              }).length !== 0
                ?
                (
                  <PostViewComments
                    comments={this.props.post.comments.filter(comment => {
                      return comment.post_id === post.post_id
                    })}
                  />
                )
                :
                null
              :
              null
            }
          </div>
        </li>
      );
    });

    return (
      <ul className="feed">
        {posts}
      </ul>
    )
  }
}

FeedViewPosts.propTypes = {
  getFeed: PropTypes.func.isRequired,
  follows: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    follows: state.follows,
    post: state.post
  }
}

export default connect(mapStateToProps, { getFeed })(FeedViewPosts);