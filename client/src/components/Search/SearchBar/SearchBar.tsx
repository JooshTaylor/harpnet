import React, { Component } from 'react'
import './SearchBar.css'
import { connect } from 'react-redux'

import { searchUsers } from '../../../actions/searchActions'
import IFormSubmitEvent from '../../../interfaces/IFormSubmitEvent'

interface Props {
  searchUsers(searchField: string, token: string): void
}

interface State {
  searchField: string
}

class SearchBar extends Component<Props, State> {
  public state = {
    searchField: ''
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchField: event.target.value })
  }

  private onSubmit = (event: IFormSubmitEvent) => {
    event.preventDefault()

    let token: string | null = localStorage.getItem('token')
    if (token) {
      this.props.searchUsers(this.state.searchField, token)
    }

    this.setState({ searchField: '' })
  }

  public render(): JSX.Element {
    return (
      <form onSubmit={this.onSubmit} noValidate className='searchbar'>
        <input
          className='searchbar__input'
          type='text'
          onChange={this.onChange}
          value={this.state.searchField}
          placeholder='Search users..'
        />
        <button className='searchbar__button'>
          <i className='fas fa-search' />
        </button>
      </form>
    )
  }
}

export default connect(
  null,
  { searchUsers }
)(SearchBar)
