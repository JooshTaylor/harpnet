const posts = require("../controllers/postControllers");

module.exports = (app, db, authenticator) => {
  // Gets all posts made by a single user
  app.get("/posts/user/:id", authenticator, (req, res) => {
    posts.getPostsByUserId(req, res, db);
  });
  // Gets a single post by its ID
  app.get("/posts/post/:id", authenticator, (req, res) => {
    posts.getPostByPostId(req, res, db);
  });
  // Gets all posts by users that the user follows
  app.post("/posts/get/:iteration", authenticator, (req, res) => {
    posts.getFeedPosts(req, res, db);
  });
  // Creates a new post
  app.post("/posts/post", authenticator, (req, res) => {
    posts.makePost(req, res, db);
  });
  // Creates a new comment on a post
  app.post("/posts/comment", authenticator, (req, res) => {
    posts.makeComment(req, res, db);
  });
  // Deletes a post by its ID and deletes all comments on that post
  app.delete("/posts/post/:id", authenticator, (req, res) => {
    posts.deletePost(req, res, db);
  });
  // Deletes a single comment by its ID
  app.delete("/posts/comment/:id", authenticator, (req, res) => {
    posts.deleteComment(req, res, db);
  });
};
