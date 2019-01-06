const validatePostData = require("../validation/post");
const { mergeSort } = require("../services/mergeSort");

// Gets all posts required to load the feed
const getFeedPosts = async (req, res, db) => {
  const users = [...req.body.following, req.body.id];
  const { iteration } = req.params;
  const data = {};

  const posts = await db("posts")
    .returning("*")
    .whereIn("creator_id", users)
    .then(posts => posts);

  let sortedPosts = mergeSort(posts);
  let morePosts = false;

  if (Number(iteration) === 1 && sortedPosts.length > 30) {
    sortedPosts = sortedPosts.slice(0, 30); //Gets posts 0-29
    morePosts = true;
  } else if (Number(iteration) > 1) {
    if (sortedPosts.length > Number(iteration) * 10 + 20) {
      sortedPosts = sortedPosts.slice(0, Number(iteration) * 10 + 20);
      morePosts = true;
    } else {
      sortedPosts = sortedPosts.slice(0, sortedPosts.length);
    }
  }

  data.posts = sortedPosts;
  data.morePosts = morePosts;
  const postIds = sortedPosts.map(post => {
    return post.post_id;
  });

  await db
    .select("*")
    .from("comments")
    .whereIn("post_id", postIds)
    .then(comments => {
      data.comments = comments;
      res.json(data);
    });
};

// Gets all posts by one user
const getPostsByUserId = async (req, res, db) => {
  const { id } = req.params;
  await db("posts")
    .returning("*")
    .where("creator_id", "=", id)
    .then(posts => res.json(posts));
};

// Gets one post by its ID
const getPostByPostId = async (req, res, db) => {
  const { id } = req.params;

  const post = await db("posts")
    .returning("*")
    .where("post_id", "=", id)
    .then(post => post[0]);

  await db("comments")
    .returning("*")
    .where("post_id", "=", post.post_id)
    .then(comments => {
      post.comments = comments;
      res.json(post);
    });
};

// Makes a post
const makePost = async (req, res, db) => {
  const { isValid, errors } = validatePostData(req.body);
  const { creator_id, creator_username, content, post_date } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  await db("posts")
    .returning("*")
    .insert({
      creator_id,
      creator_username,
      content,
      post_date
    })
    .then(post => {
      // console.log(post);
      res.json(post);
    });
};

// Makes a comment on a post
const makeComment = async (req, res, db) => {
  const {
    post_id,
    creator_id,
    creator_username,
    text,
    comment_date
  } = req.body;

  await db("comments")
    .returning("*")
    .insert({
      post_id,
      creator_id,
      creator_username,
      text,
      comment_date
    })
    .then(data => {
      res.json(data);
    });
};

// Deletes a post by ID and deletes all comments on that post
const deletePost = async (req, res, db) => {
  const { id } = req.params;

  await db("comments")
    .where("post_id", "=", id)
    .del();

  await db("posts")
    .where("post_id", "=", id)
    .del();

  res.json({ success: true });
};

// Deletes a comment by ID
const deleteComment = async (req, res, db) => {
  const { id } = req.params;

  await db("comments")
    .where("comment_id", "=", id)
    .del();

  res.json({ success: true });
};

module.exports = {
  getFeedPosts,
  getPostsByUserId,
  getPostByPostId,
  makePost,
  makeComment,
  deletePost,
  deleteComment
};
