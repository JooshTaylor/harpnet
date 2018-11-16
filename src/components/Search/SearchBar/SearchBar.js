import React, { Component } from 'react';
import './SearchBar.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { search } from '../../../actions/searchActions';
import { withRouter } from 'react-router-dom';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchfield: ""
    }
  }

  onChange = (e) => {
    this.setState({ searchfield: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.props.search(this.state.searchfield, localStorage.getItem('token'), this.props.history);

    this.setState({ searchfield: "" })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} noValidate className="searchbar">
        <input className="searchbar__input" type="text" onChange={this.onChange} value={this.state.searchfield} placeholder="Search users.." />
        <button className="searchbar__button"><i className="fas fa-search"></i></button>
      </form>
    )
  }
}

export default connect(null, { search })(withRouter(SearchBar));
