import React, { Component } from 'react'
import { FeedStyles, FeedListStyles } from '../../styles/Feed'
import PropTypes from 'prop-types'
import Spinner from '../Spinner/Spinner'
import { connect } from 'react-redux'

import FeedViewPosts from './FeedViewPosts/FeedViewPosts'
import FeedAddPosts from './FeedAddPosts'
import FeedNoPosts from './FeedNoPosts/FeedNoPosts'
import { resetSinglePost } from '../../actions/postActions'
import { navigate } from '@reach/router'
import SuggestedFollowsList from '../Suggestions/SuggestedFollowsList/SuggestedFollowsList'

class Feed extends Component {
  componentWillMount() {
    this.props.resetSinglePost()
  }

  renderPosts() {
    const { follows, post } = this.props
    if (follows.loading) {
      return <Spinner />
    } else if (
      !follows.loading &&
      follows.following.length === 0 &&
      post.posts.length === 0
    ) {
      return <FeedNoPosts />
    } else {
      return (
        <FeedListStyles>
          <div className="feed__container--left">
            <FeedAddPosts />
            <FeedViewPosts />
          </div>
          <div className="feed__container--right">
            <SuggestedFollowsList />
          </div>
        </FeedListStyles>
      )
    }
  }

  render() {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }

    return <FeedStyles>{this.renderPosts()}</FeedStyles>
  }
}

Feed.propTypes = {
  resetSinglePost: PropTypes.func.isRequired,
  follows: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    follows: state.follows,
    post: state.post
  }
}

export default connect(
  mapStateToProps,
  {
    resetSinglePost
  }
)(Feed)
