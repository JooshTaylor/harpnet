import React, { Component } from "react";
import "./ProfileViewFollowers.css";
import { navigate, Link } from "@reach/router";

import Button from "../../Common/Buttons/Button";
import UserSearchInfo from "../../Search/UserSearchInfo/UserSearchInfo";

class ProfileViewFollowers extends Component {
  handleUnfollow = e => {
    console.log(1);
  };

  handleFollow = e => {
    console.log(2);
  };

  render() {
    const { followers, followings } = this.props;
    const followersWidget = followers.map(follower => {
      return (
        <li key={follower.user_id} className="follower__follower">
          <figure className="follower__img-box">
            <img
              className="follower__img"
              src={`https://robohash.org/${follower.username}/?200x200`}
              alt="profile"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/profile/${follower.user_id}`);
              }}
            />
            <figcaption className="follower__img-caption">
              <Link
                style={{ textDecoration: "none" }}
                className="follower__username"
                to={`/profile/${follower.user_id}`}
              >
                {follower.username}
              </Link>
            </figcaption>
          </figure>
          <div className="follower__info">
            <UserSearchInfo
              fname={follower.first_name}
              lname={follower.last_name}
              bio={follower.biography}
            />
          </div>
          <div className="follower__options">
            {followings.includes(follower.user_id) ? (
              <Button
                name={follower.user_id}
                text="Unfollow"
                callback={this.handleUnfollow}
                className="unfollow"
              />
            ) : (
              <Button
                name={follower.user_id}
                text="Follow"
                callback={this.handleFollow}
                className="follow"
              />
            )}
            <Button
              text="View Profile"
              callback={() => {
                navigate(`/profile/${follower.user_id}`);
              }}
              className="edit-profile-btn"
            />
          </div>
        </li>
      );
    });
    return <ul className="followers">{followersWidget}</ul>;
  }
}

export default ProfileViewFollowers;
