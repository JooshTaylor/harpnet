import React from "react";
import "./ProfileViewFollowers.css";
import { navigate, Link } from "@reach/router";

import Button from "../../Common/Buttons/Button";
import UserSearchInfo from "../../Search/UserSearchInfo/UserSearchInfo";

const ProfileViewFollowers = ({
  followers,
  clientFollows,
  clientId,
  handleFollow,
  handleUnfollow
}) => {
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
          {clientFollows.includes(follower.user_id) &&
          follower.user_id !== clientId ? (
            <Button
              name={follower.user_id}
              text="Unfollow"
              callback={handleUnfollow}
              className="unfollow"
            />
          ) : follower.user_id !== clientId ? (
            <Button
              name={follower.user_id}
              text="Follow"
              callback={handleFollow}
              className="follow"
            />
          ) : null}
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
};

export default ProfileViewFollowers;
