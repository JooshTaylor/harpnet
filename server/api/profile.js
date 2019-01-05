// Gets basic user profile data
const getProfile = async (req, res, db) => {
  const { id } = req.params;

  await db("users")
    .returning("*")
    .where("user_id", "=", id)
    .then(profile => {
      res.json(profile[0]);
    });
};

// Gets all user data for viewing a profile (profile, follows, posts)
const getViewProfile = async (req, res, db) => {
  const { id } = req.params;
  let profileView = {};
  profileView.post = {};
  profileView.follows = {};

  profileView.profile = await db("users")
    .returning("*")
    .where("user_id", "=", id)
    .then(profile => profile[0]);

  let postIds = [];
  profileView.post.posts = await db("posts")
    .returning("*")
    .where("creator_id", "=", id)
    .then(posts => {
      postIds = posts.map(post => post.post_id);
      return posts;
    });

  profileView.post.comments = await db("comments")
    .returning("*")
    .whereIn("post_id", postIds)
    .then(comments => comments);

  const followingIds = await db("follows")
    .returning("*")
    .where("follower_id", "=", id)
    .then(followings => followings.map(following => following.following_id));

  profileView.follows.following = await db("users")
    .returning("*")
    .whereIn("user_id", followingIds)
    .then(followings => followings);

  const followerIds = await db("follows")
    .returning("*")
    .where("following_id", "=", id)
    .then(followers => followers.map(follower => follower.follower_id));

  profileView.follows.followers = await db("users")
    .returning("*")
    .whereIn("user_id", followerIds)
    .then(followers => followers);

  res.json(profileView);
};

const changePrivacy = async (req, res, db) => {
  const { id } = req.params;
  const { state } = req.body;

  await db("users")
    .where("user_id", "=", id)
    .update({
      privacy: state
    });

  res.json({ success: true });
};

const changeBio = async (req, res, db) => {
  const { id } = req.params;
  const { bio } = req.body;

  await db("users")
    .where("user_id", "=", id)
    .update({
      biography: bio
    });

  res.json({ success: true });
};

const changeFirstName = async (req, res, db) => {
  const { id } = req.params;
  const { fname } = req.body;

  await db("users")
    .where("user_id", "=", id)
    .update({
      first_name: fname
    });

  res.json({ success: true });
};

const changeLastName = async (req, res, db) => {
  const { id } = req.params;
  const { lname } = req.body;

  await db("users")
    .where("user_id", "=", id)
    .update({
      last_name: lname
    });

  res.json({ success: true });
};

module.exports = {
  getProfile,
  getViewProfile,
  changePrivacy,
  changeBio,
  changeFirstName,
  changeLastName
};
