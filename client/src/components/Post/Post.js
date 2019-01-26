import React, { Component, Fragment } from 'react'
import './Post.css'
import PropTypes from 'prop-types'
import { navigate, Link } from '@reach/router'
import { connect } from 'react-redux'

import Button from '../Button/Button'
import Modal from 'react-modal'
import PostAddComments from '../Feed/PostAddComments/PostAddComments'
import PostViewComments from '../Feed/PostViewComments/PostViewComments'
import Spinner from '../Spinner/Spinner'
import {
  getPostById,
  deletePost,
  resetSinglePost
} from '../../actions/postActions'

const modalStyles = {
  content: {
    width: '30%',
    height: '20%',
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('#root')

class Post extends Component {
  state = {
    showModal: false,
    deleteSubject: -1 //The delete subject when not -1 holds the value of the post potentially being deleted
  }

  componentDidMount() {
    if (this.props.id && localStorage.getItem('token')) {
      this.props.getPostById(this.props.id, localStorage.getItem('token'))
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.post.singleReload !== this.props.post.singleReload &&
      this.props.post.singleReload === true
    ) {
      this.props.getPostById(this.props.id, localStorage.getItem('token'))
    }
  }

  componentWillUnmount() {
    this.props.resetSinglePost()
  }

  openModal = e => {
    this.setState({
      showModal: true,
      deleteSubject: [e.target.name]
    })
  }

  closeModal = () => {
    this.setState({
      showModal: false,
      deleteSubject: -1
    })
  }

  deletePost = () => {
    this.props.deletePost(
      this.state.deleteSubject,
      localStorage.getItem('token'),
      'feed'
    )
    this.closeModal()
    navigate('/feed')
  }

  render() {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }

    const { fromFeed } = this.props
    if (!fromFeed && Object.keys(this.props.post.single).length === 0) {
      return <Spinner />
    } else if (fromFeed && Object.keys(this.props.singlePost).length === 0) {
      return <Spinner />
    } else {
      let post
      let user_id
      if (Object.keys(this.props.post.single).length > 0) {
        post = this.props.post.single
        user_id = this.props.post.single.user_id.user_id
      } else {
        post = this.props.singlePost
        user_id = this.props.user_id
      }
      // This renders the post with different styles based on if it's viewed on its own or in the feed/profile. This is a lazy solution that will be fixed up later.
      if (fromFeed) {
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
                <Link
                  to={`/post/${post.post_id}`}
                  className="post__details-date"
                >
                  {post.post_date
                    .split(' ')
                    .slice(0, 3)
                    .join(' ')}
                  <br />
                  {post.post_date
                    .split(' ')
                    .slice(3, 4)
                    .toString()
                    .split(':')
                    .slice(0, 2)
                    .join(':')}
                </Link>
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
        )
      } else {
        return (
          <Fragment>
            <div className="post--single">
              <div className="post__top">
                <div className="post__details">
                  <div className="post__details-img-box">
                    <img
                      className="post__details-img"
                      src={`https://robohash.org/${
                        post.creator_username
                      }/?200x200`}
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
                        .split(' ')
                        .slice(0, 3)
                        .join(' ')}
                      <br />
                      {post.post_date
                        .split(' ')
                        .slice(3, 4)
                        .toString()
                        .split(':')
                        .slice(0, 2)
                        .join(':')}
                    </h3>
                  </div>
                  {post.creator_id === user_id ? (
                    <button
                      onClick={this.openModal}
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
              <div className="post__bottom--single">
                <PostAddComments post_id={post.post_id} single={true} />
                {/* If the post has comments, it will render the PostViewComments component */}
                {this.props.post.single.comments.length > 0 ? (
                  <PostViewComments
                    single={true}
                    comments={this.props.post.single.comments}
                  />
                ) : null}
              </div>
            </div>
            <Modal
              isOpen={this.state.showModal}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              contentLabel="Delete Post Warning Modal"
              style={modalStyles}
            >
              <h2 className="modal__heading">
                Are you sure you want to delete this post?
              </h2>
              <p className="modal__paragraph">
                Once a post is deleted, it can never be recovered.
              </p>
              <div className="modal__btns">
                <Button
                  text="Go Back"
                  callback={this.closeModal}
                  className="modal-go-back"
                />
                <Button
                  text="Delete"
                  callback={this.deletePost}
                  className="modal-delete"
                />
              </div>
            </Modal>
          </Fragment>
        )
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    post: state.post
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPostById: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  resetSinglePost: PropTypes.func.isRequired,
  fromFeed: PropTypes.bool,
  user_id: PropTypes.number,
  singlePost: PropTypes.object,
  id: PropTypes.string
}

export default connect(
  mapStateToProps,
  { getPostById, deletePost, resetSinglePost }
)(Post)
