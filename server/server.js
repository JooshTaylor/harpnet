const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { requireAuth } = require("./authorization");
const keys = require("./keys");

// Creates an express instance - used to develop API endpoints
const app = express();

// Allows use of bodyParser to allow post requests to be made
app.use(bodyParser.json());
app.use(cors());

// Using the knex library to connect our Postgres database to the server
const knex = require("knex");
const db = knex({
  client: "pg",
  connection: {
    host: keys.pgHost,
    user: keys.pgUser,
    password: keys.pgPassword,
    database: keys.pgDatabase
  }
});

app.get("/", (req, res) => {
  res.json("Working");
});

// Authentication endpoints
const auth = require("./api/auth");
// Register a new user
app.post("/auth/register", (req, res) => {
  auth.handleRegister(req, res, db, bcrypt);
});
// Log a user in
app.post("/auth/login", (req, res) => {
  auth.handleLogin(req, res, db, bcrypt);
});
// Authenticate a user's JWT
app.get("/auth/authenticate", (req, res) => {
  auth.handleAuthentication(req, res, db);
});
// Delete a user account by their ID.
app.delete("/auth/delete/:id", requireAuth, (req, res) => {
  auth.deleteAccount(req, res, db);
});

// Profile endpoints
const profile = require("./api/profile");
// Gets a user's basic profile data.
app.get("/profile/:id", requireAuth, (req, res) => {
  profile.getProfile(req, res, db);
});
// Gets all data required for viewing an individual profile (profile, follows, posts).
app.get("/profile/view/:id", requireAuth, (req, res) => {
  profile.getViewProfile(req, res, db);
});
// Changes a profile's privacy state
app.put("/profile/privacy/:id", requireAuth, (req, res) => {
  profile.changePrivacy(req, res, db);
});
// Changes a profile's biography
app.put("/profile/biography/:id", requireAuth, (req, res) => {
  profile.changeBio(req, res, db);
});
// Changes a profile's first name
app.put("/profile/first_name/:id", requireAuth, (req, res) => {
  profile.changeFirstName(req, res, db);
});
// Changes a profile's last name
app.put("/profile/last_name/:id", requireAuth, (req, res) => {
  profile.changeLastName(req, res, db);
});

// Follows endpoints
const follows = require("./api/follows");
// Returns all user data regarding who they follow and who follows them
app.get("/follows/:id", requireAuth, (req, res) => {
  follows.getFollows(req, res, db);
});
// Posts a new row to the follows DB. Returns the same follower data
app.post("/follows/:following_id", requireAuth, (req, res) => {
  follows.followUser(req, res, db);
});
// Unfollows a user
app.delete(
  "/follows/:unfollower_id/:unfollowing_id",
  requireAuth,
  (req, res) => {
    follows.unfollowUser(req, res, db);
  }
);

// Post endpoints
const posts = require("./api/posts");
// Gets all posts made by a single user
app.get("/posts/user/:id", requireAuth, (req, res) => {
  posts.getPostsByUserId(req, res, db);
});
// Gets a single post by its ID
app.get("/posts/post/:id", requireAuth, (req, res) => {
  posts.getPostByPostId(req, res, db);
});
// Gets all posts by users that the user follows
app.post("/posts/get/:iteration", requireAuth, (req, res) => {
  posts.getFeedPosts(req, res, db);
});
// Creates a new post
app.post("/posts/post", requireAuth, (req, res) => {
  posts.makePost(req, res, db);
});
// Creates a new comment on a post
app.post("/posts/comment", requireAuth, (req, res) => {
  posts.makeComment(req, res, db);
});
// Deletes a post by its ID and deletes all comments on that post
app.delete("/posts/post/:id", requireAuth, (req, res) => {
  posts.deletePost(req, res, db);
});
// Deletes a single comment by its ID
app.delete("/posts/comment/:id", requireAuth, (req, res) => {
  posts.deleteComment(req, res, db);
});

// Search endpoints
const search = require("./api/search");
// Finds all users whose usernames include the :arg params string
app.get("/search/:arg", requireAuth, (req, res) => {
  search.search(req, res, db);
});

// Activates the server
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server is running on port ${port}`));
