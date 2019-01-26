import React, { Component } from "react";
import "./SearchBar.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { searchUsers } from "../../../actions/searchActions";

class SearchBar extends Component {
  state = {
    searchfield: ""
  };

  onChange = e => {
    this.setState({ searchfield: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.searchUsers(
      this.state.searchfield,
      localStorage.getItem("token")
    );

    this.setState({ searchfield: "" });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} noValidate className="searchbar">
        <input
          className="searchbar__input"
          type="text"
          onChange={this.onChange}
          value={this.state.searchfield}
          placeholder="Search users.."
        />
        <button className="searchbar__button">
          <i className="fas fa-search" />
        </button>
      </form>
    );
  }
}

SearchBar.propTypes = {
  searchUsers: PropTypes.func.isRequired
};

export default connect(
  null,
  { searchUsers }
)(SearchBar);
