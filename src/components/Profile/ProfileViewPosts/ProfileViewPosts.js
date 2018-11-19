import React, { Component } from 'react';
import './ProfileViewPosts.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ProfileViewPosts extends Component {
  render() {
    const { auth, post } = this.props;
    const userPosts = post.profile.posts.map(post => {
      return (
        <li key={post.post_id} id={post.post_id} className="profile-post">
          <div className="profile-post__top">
            <div className="profile-post__details">
              <div className="profile-post__details-img-box">
                <img onClick={this.handleViewProfile} name={post.creator_id} className="profile-post__details-img" src={`https://robohash.org/${post.creator_username}/?200x200`} alt={post.creator_username} />
              </div>
              <div className="profile-post__details-text-box">
                <h2 onClick={this.handleViewProfile} name={post.creator_id} className="profile-post__details-username">
                  {post.creator_username}
                </h2>
                <h3 className="profile-post__details-date">
                  {post.post_date.split(' ').slice(0, 3).join(' ')}<br />
                  {post.post_date.split(' ').slice(3, 4).toString().split(':').slice(0, 2).join(':')}
                </h3>
              </div>
              {post.creator_id === auth.user.user_id ?
                (
                  <a href="#" onClick={this.deletePost} name={post.post_id} className="profile-post__delete">&times;</a>
                ) :
                null}
            </div>
            <div className="profile-post__content-box">
              <p className="profile-post__content">{post.content}</p>
            </div>
            <div className="profile-post__features-box">
              {post.score} points
            </div>
          </div>
          {/* <div className="profile-post__bottom">
            comments
          </div> */}
        </li>
      )
    })

    return (
      <ul className="profile-posts">
        {userPosts}
      </ul>
    )
  }
}

ProfileViewPosts.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    post: state.post
  }
}

export default connect(mapStateToProps)(ProfileViewPosts);
