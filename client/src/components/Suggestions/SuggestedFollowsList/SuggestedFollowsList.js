import React, { Component } from 'react'
import './SuggestedFollowsList.css'
import { connect } from 'react-redux'
import SuggestedFollowsUser from '../SuggestedFollowsUser/SuggestedFollowsUser'
import {
  getSuggestedFollows,
  followUser,
  getFollowData
} from '../../../actions/followsActions'

class SuggestedFollowsList extends Component {
  state = {
    suggestions: [],
    inactiveButtons: [],
    noSuggestions: false
  }

  componentDidMount() {
    const { auth } = this.props
    this.props.getSuggestedFollows(auth.user, localStorage.getItem('token'))
  }

  componentDidUpdate(prevProps) {
    const { auth } = this.props
    if (prevProps.follows.suggestions !== this.props.follows.suggestions) {
      this.setState({ suggestions: this.props.follows.suggestions })
      if (this.props.follows.suggestions.length === 0) {
        this.setState({ noSuggestions: true })
      }
    }

    if (
      prevProps.follows.reloadSuggestions !==
      this.props.follows.reloadSuggestions
    ) {
      this.props.getSuggestedFollows(auth.user, localStorage.getItem('token'))
      this.props.getFollowData(
        auth.user,
        localStorage.getItem('token'),
        'suggestions'
      )
    }
  }

  handleFollow = e => {
    const btn = Number([e.target.name])
    this.setState({
      inactiveButtons: [...this.state.inactiveButtons, btn]
    })
    const self = this
    setTimeout(function() {
      const target = self.state.inactiveButtons.indexOf(btn)
      self.setState({
        inactiveButtons: self.state.inactiveButtons.filter(
          btn => self.state.inactiveButtons.indexOf(btn) !== target
        )
      })
    }, 1000)

    const arg1 = { follower_id: this.props.auth.user } // Follower ID
    const arg2 = [e.target.name] // Following ID

    this.props.followUser(
      arg1,
      Number(arg2[0]),
      localStorage.getItem('token'),
      'feed'
    )
  }

  renderSuggestions() {
    const { suggestions, noSuggestions } = this.state
    if (suggestions.length === 0 && !noSuggestions) {
      return <div>Loading suggestions</div>
    } else if (noSuggestions) {
      return <div>You have no more follow suggestions!</div>
    } else {
      return suggestions.map((suggestion, index) => {
        if (index < 3) {
          return (
            <SuggestedFollowsUser
              key={index}
              user={suggestion}
              handleFollow={this.handleFollow}
            />
          )
        } else {
          return null
        }
      })
    }
  }

  render() {
    return (
      <div className='feed__container--right'>
        <h1 className='suggestions__title'>Who to follow</h1>
        {this.renderSuggestions()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    follows: state.follows
  }
}

export default connect(
  mapStateToProps,
  { getSuggestedFollows, followUser, getFollowData }
)(SuggestedFollowsList)
