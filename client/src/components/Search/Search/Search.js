import React, { Component } from "react";
import "./Search.css";
import PropTypes from "prop-types";
import Spinner from "../../Common/Spinner";
import { connect } from "react-redux";
// import requireAuth from "../../HOC/requireAuth";

import Button from "../../Common/Buttons/Button";
import UserSearchInfo from "../UserSearchInfo/UserSearchInfo";
import { resetSearch, searchUsers } from "../../../actions/searchActions";
import {
  followUser,
  unfollowUser,
  getFollowData
} from "../../../actions/followsActions";
import { navigate, Link } from "@reach/router";

class Search extends Component {
  state = {
    searchField: "",
    inactiveButtons: []
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.search.reload !== this.props.search.reload &&
      this.props.search.reload === true
    ) {
      this.props.getFollowData(
        this.props.auth.user,
        localStorage.getItem("token")
      );
      this.props.searchUsers(
        this.props.search.searchField,
        localStorage.getItem("token")
      );
    }
  }

  componentDidMount() {
    const searchParams = window.location.pathname
      .split("/")
      .slice(2)
      .join("");
    this.setState({ searchField: searchParams }, () => {
      this.props.searchUsers(
        this.state.searchField,
        localStorage.getItem("token")
      );
    });
  }

  componentWillUnmount() {
    this.props.resetSearch();
  }

  handleFollow = e => {
    // Logic to handle buttons being disabled after click
    const btn = Number([e.target.name]);
    this.setState({
      inactiveButtons: [...this.state.inactiveButtons, btn]
    });
    const self = this;
    setTimeout(function() {
      const target = self.state.inactiveButtons.indexOf(btn);
      self.setState({
        inactiveButtons: self.state.inactiveButtons.filter(
          btn => self.state.inactiveButtons.indexOf(btn) !== target
        )
      });
    }, 1000);

    const arg1 = { follower_id: this.props.auth.user }; // Follower ID
    const arg2 = [e.target.name]; // Following ID

    this.props.followUser(
      arg1,
      Number(arg2[0]),
      localStorage.getItem("token"),
      "search"
    );
  };

  handleUnfollow = e => {
    // Logic to handle buttons being disabled after click
    const btn = Number([e.target.name]);
    this.setState({
      inactiveButtons: [...this.state.inactiveButtons, btn]
    });
    const self = this;
    setTimeout(function() {
      const target = self.state.inactiveButtons.indexOf(btn);
      self.setState({
        inactiveButtons: self.state.inactiveButtons.filter(
          btn => self.state.inactiveButtons.indexOf(btn) !== target
        )
      });
    }, 1500);

    const arg1 = this.props.auth.user; // Unfollower ID
    const arg2 = [e.target.name]; // Unfollowee ID

    this.props.unfollowUser(
      arg1,
      Number(arg2[0]),
      localStorage.getItem("token"),
      "search"
    );
  };

  render() {
    const { search, auth, follows } = this.props;

    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    if (search.loading & (search.searchResults.length === 0)) {
      return <Spinner />;
    }

    const searchResults = search.searchResults
      .filter(user => user.user_id !== auth.user)
      .map(result => {
        return (
          <li key={result.user_id} className="search__result">
            <figure className="search__img-box">
              <img
                className="search__img"
                src={`https://robohash.org/${result.username}/?200x200`}
                alt="profile"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/profile/${result.user_id}`);
                }}
              />
              <figcaption className="search__img-caption">
                <Link
                  style={{ textDecoration: "none" }}
                  className="search__username"
                  to={`/profile/${result.user_id}`}
                >
                  {result.username}
                </Link>
              </figcaption>
            </figure>
            <div className="search__info">
              <UserSearchInfo
                fname={result.first_name}
                lname={result.last_name}
                bio={result.biography}
              />
            </div>
            <div className="search__options">
              {follows.following.includes(result.user_id) ? (
                this.state.inactiveButtons.includes(result.user_id) ? (
                  <Button
                    name={result.user_id}
                    className="unfollow"
                    active={false}
                  />
                ) : (
                  <Button
                    name={result.user_id}
                    text="Unfollow"
                    callback={this.handleUnfollow}
                    className="unfollow"
                  />
                )
              ) : this.state.inactiveButtons.includes(result.user_id) ? (
                <Button
                  name={result.user_id}
                  className="follow"
                  active={false}
                />
              ) : (
                <Button
                  name={result.user_id}
                  text="Follow"
                  callback={this.handleFollow}
                  className="follow"
                />
              )}
              <Button
                text="View Profile"
                callback={() => {
                  navigate(`/profile/${result.user_id}`);
                }}
                className="edit-profile-btn"
              />
            </div>
          </li>
        );
      });

    return (
      <div className="search">
        <div className="search__for-box">
          <h1 className="search__for">
            Showing {searchResults.length} search results for:{" "}
            <span>{search.searchField}</span>
          </h1>
        </div>
        <ul className="search__results">{searchResults}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    search: state.search,
    auth: state.auth,
    follows: state.follows
  };
};

Search.propTypes = {
  search: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  follows: PropTypes.object.isRequired,
  searchUsers: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  getFollowData: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getFollowData, searchUsers, followUser, unfollowUser, resetSearch }
)(Search);
