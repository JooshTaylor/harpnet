import React from "react";
import "./ProfileViewPosts.css";

import Post from "../../Post/Post";

const ProfileViewPosts = ({ posts, user_id, openModal }) => {
  const postsWidget = posts.posts.map(post => (
    <li key={post.post_id} className="profile-posts">
      <Post
        key={post.post_id}
        openModal={openModal}
        user_id={user_id}
        fromFeed={true}
        singlePost={post}
      />
    </li>
  ));
  return <ul>{postsWidget}</ul>;
};

export default ProfileViewPosts;
