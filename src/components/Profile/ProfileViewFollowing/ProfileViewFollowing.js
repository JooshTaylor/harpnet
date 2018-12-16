import React, { Component } from "react";
import "./ProfileViewFollowing.css";
import { navigate, Link } from "@reach/router";

import Button from "../../Common/Buttons/Button";
import UserSearchInfo from "../../Search/UserSearchInfo/UserSearchInfo";

class ProfileViewFollowing extends Component {
  handleUnfollow = e => {
    console.log(1);
  };

  render() {
    const { followings } = this.props;
    const followingsWidget = followings.map(following => {
      return (
        <li key={following.user_id} className="following__following">
          <figure className="following__img-box">
            <img
              className="following__img"
              src={`https://robohash.org/${following.username}/?200x200`}
              alt="profile"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/profile/${following.user_id}`);
              }}
            />
            <figcaption className="following__img-caption">
              <Link
                style={{ textDecoration: "none" }}
                className="following__username"
                to={`/profile/${following.user_id}`}
              >
                {following.username}
              </Link>
            </figcaption>
          </figure>
          <div className="following__info">
            <UserSearchInfo
              fname={following.first_name}
              lname={following.last_name}
              bio={following.biography}
            />
          </div>
          <div className="following__options">
            <Button
              name={following.user_id}
              text="Unfollow"
              callback={this.handleUnfollow}
              className="unfollow"
            />
            <Button
              text="View Profile"
              callback={() => {
                navigate(`/profile/${following.user_id}`);
              }}
              className="edit-profile-btn"
            />
          </div>
        </li>
      );
    });
    return <ul className="followings">{followingsWidget}</ul>;
  }
}

export default ProfileViewFollowing;
