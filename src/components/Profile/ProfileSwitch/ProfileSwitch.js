import React from "react";
import "./ProfileSwitch.css";

const ProfileSwitch = ({ changeView, selection }) => {
  return (
    <ul className="info__bottom">
      <li
        onClick={() => {
          changeView("posts");
        }}
        name="posts"
        className={`info__option ${
          selection === "posts" ? "info__option--select" : null
        }`}
      >
        Posts
      </li>
      <li
        onClick={() => {
          changeView("following");
        }}
        className={`info__option ${
          selection === "following" ? "info__option--select" : null
        }`}
      >
        Following
      </li>
      <li
        onClick={() => {
          changeView("followers");
        }}
        name="followers"
        className={`info__option ${
          selection === "followers" ? "info__option--select" : null
        }`}
      >
        Followers
      </li>
    </ul>
  );
};

export default ProfileSwitch;
