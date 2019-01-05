import React from "react";
import "./ProfileSwitch.css";
import PropTypes from "prop-types";

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

ProfileSwitch.propTypes = {
  selection: PropTypes.string.isRequired,
  changeView: PropTypes.func.isRequired
};

export default ProfileSwitch;
