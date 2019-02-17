import React, { Component } from 'react'
import './SuggestedFollowsList.css'
import { connect } from 'react-redux'
import SuggestedFollowsUser from '../SuggestedFollowsUser/SuggestedFollowsUser'
import {
  getSuggestedFollows,
  followUser,
  getFollowData
} from '../../../actions/followsActions'
import IUser from '../../../interfaces/IUser'
import IAuthProps from '../../../interfaces/IAuthProps'
import IFollowsProps from '../../../interfaces/IFollowsProps'
import IBtnMouseEvent from '../../../interfaces/IBtnMouseEvent'

interface Props {
  auth: IAuthProps
  follows: IFollowsProps
  getSuggestedFollows(user: IUser | number, token: string): void
  followUser(
    follower: { follower_id: IUser | number },
    following: number,
    token: string,
    location: string
  ): void
  getFollowData(user: IUser | number, token: string, location: string): void
}

interface State {
  suggestions: IUser[]
  inactiveButtons: number[]
  noSuggestions: boolean
}

class SuggestedFollowsList extends Component<Props, State> {
  public state = {
    suggestions: [] as IUser[],
    inactiveButtons: [] as number[],
    noSuggestions: false
  }

  public componentDidMount() {
    const { auth } = this.props
    const token = localStorage.getItem('token')
    if (token) {
      this.props.getSuggestedFollows(auth.user, token)
    }
  }

  public componentDidUpdate(prevProps: Props) {
    const { auth } = this.props
    if (prevProps.follows.suggestions !== this.props.follows.suggestions) {
      this.setState({ suggestions: this.props.follows.suggestions })
      if (this.props.follows.suggestions.length === 0) {
        this.setState({ noSuggestions: true })
      }
    }

    const token = localStorage.getItem('token')
    if (
      prevProps.follows.reloadSuggestions !==
        this.props.follows.reloadSuggestions &&
      token
    ) {
      this.props.getSuggestedFollows(auth.user, token)
      this.props.getFollowData(auth.user, token, 'suggestions')
    }
  }

  private handleFollow = (e: IBtnMouseEvent) => {
    const btn: number = Number([e.target.name])
    this.setState({
      inactiveButtons: [...this.state.inactiveButtons, btn]
    })
    const self: this = this
    setTimeout(function() {
      const target: number = self.state.inactiveButtons.indexOf(btn)
      self.setState({
        inactiveButtons: self.state.inactiveButtons.filter(
          (btn: number) => self.state.inactiveButtons.indexOf(btn) !== target
        )
      })
    }, 1000)

    const token = localStorage.getItem('token')
    if (token) {
      const arg1 = { follower_id: this.props.auth.user } // Follower ID
      const arg2 = [e.target.name] // Following ID
      this.props.followUser(arg1, Number(arg2[0]), token, 'feed')
    }
  }

  private renderSuggestions(): JSX.Element[] | JSX.Element {
    const { suggestions, noSuggestions } = this.state
    if (suggestions.length === 0 && !noSuggestions) {
      return <div>Loading suggestions</div>
    } else if (noSuggestions) {
      return <div>You have no more follow suggestions!</div>
    } else {
      return suggestions.map(
        (suggestion: IUser, index: number): JSX.Element => {
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
        }
      )
    }
  }

  public render(): JSX.Element {
    return (
      <div className='feed__container--right'>
        <h1 className='suggestions__title'>Who to follow</h1>
        {this.renderSuggestions()}
      </div>
    )
  }
}

function mapStateToProps(state: Props) {
  return {
    auth: state.auth,
    follows: state.follows
  }
}

export default connect(
  mapStateToProps,
  { getSuggestedFollows, followUser, getFollowData }
)(SuggestedFollowsList)
