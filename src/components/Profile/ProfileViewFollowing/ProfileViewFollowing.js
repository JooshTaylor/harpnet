import React from "react";
import "./ProfileViewFollowing.css";

const ProfileViewFollowing = ({ followings }) => {
  const followingsWidget = followings.map(following => {
    return <li key={following.user_id}>{following.username}</li>;
  });
  return <ul>{followingsWidget}</ul>;
};

export default ProfileViewFollowing;
