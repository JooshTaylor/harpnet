import React from "react";
import "./ProfileViewFollowers.css";

const ProfileViewFollowers = ({ followers }) => {
  const followersWidget = followers.map(follower => {
    return <li key={follower.user_id}>{follower.username}</li>;
  });
  return <ul>{followersWidget}</ul>;
};

export default ProfileViewFollowers;
