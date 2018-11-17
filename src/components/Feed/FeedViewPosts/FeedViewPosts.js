import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFeed, deletePost } from '../../../actions/postActions';
import './FeedViewPosts.css';

import PostAddComments from '../PostAddComments/PostAddComments';
import PostViewComments from '../PostViewComments/PostViewComments';

class FeedViewPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeletePrompt: false,
      deleteSubject: -1, //The delete subject when not -1 holds the value of the post potentially being deleted
      iteration: 2
    }
  }

  //When this component mounts, we fetch the user's feed from the DB based on who they are following
  componentDidMount() {
    const data = {
      following: this.props.follows.following,
      id: this.props.auth.user.user_id
    }
    this.props.getFeed(data, 1, localStorage.getItem('token'));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post.reload && nextProps.post.reload === true) {
      const data = {
        following: this.props.follows.following,
        id: this.props.auth.user.user_id
      }
      this.props.getFeed(data, this.state.iteration, localStorage.getItem('token'));
    }
  }

  toggleDeletePrompt = (e) => {
    if (!this.state.showDeletePrompt) {
      this.setState({
        showDeletePrompt: true,
        deleteSubject: [e.target.name]
      })
    } else {
      this.setState({
        showDeletePrompt: false,
        deleteSubject: -1
      })
    }
  }

  deletePost = (e) => {
    this.props.deletePost([e.target.name], localStorage.getItem('token'));
    // this.toggleDeletePrompt();
  }

  showMorePosts = (e) => {
    let currentIteration = this.state.iteration;
    this.setState({ iteration: currentIteration += 1 })
    const data = {
      following: this.props.follows.following,
      id: this.props.auth.user.user_id
    }
    this.props.getFeed(data, Number([e.target.name]), localStorage.getItem('token'))
  }

  render() {
    const { auth, post } = this.props;

    const deletePrompt = this.state.showDeletePrompt ?
      (
        <div className="delete-prompt">
          <h1 className="delete-prompt__heading">Are you sure you want to delete this post?</h1>
          <p className="delete-prompt__note">Once you hit delete, this post can never be recovered!</p>
          <a href={`#${this.state.deleteSubject}`} onClick={this.toggleDeletePrompt} className="delete-prompt__keep" type="button">
            Keep
          </a>
          <button onClick={this.deletePost} name={this.state.deleteSubject} className="delete-prompt__delete" type="button">
            Delete
          </button>
        </div>
      ) : null;

    //Posts is an array of 30 posts made by the accounts that the user is following ordered from latest to earliest.
    const posts = post.posts.map(post => {
      return (
        <li key={post.post_id} id={post.post_id} className="post">
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
              {post.creator_id === auth.user.user_id ?
                (
                  <a href="#" onClick={this.deletePost} name={post.post_id} className="post__delete">&times;</a>
                ) :
                null}
            </div>
            <div className="post__content-box">
              <p className="post__content">{post.content}</p>
            </div>
            <div className="post__features-box">
              {post.score} points
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
        {deletePrompt}
        {posts}
        {post.morePosts ? (<button name={this.state.iteration} type="button" onClick={this.showMorePosts} className="posts__showmore">Show More</button>) : null}
      </ul>
    )
  }
}

FeedViewPosts.propTypes = {
  getFeed: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { getFeed, deletePost })(FeedViewPosts);