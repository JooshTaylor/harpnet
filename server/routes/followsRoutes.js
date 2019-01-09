const follows = require("../controllers/followsControllers");

module.exports = (app, db, authenticator) => {
  // Returns all user data regarding who they follow and who follows them
  app.get("/follows/:id", authenticator, (req, res) => {
    follows.getFollows(req, res, db);
  });
  // Posts a new row to the follows DB. Returns the same follower data
  app.post("/follows/:following_id", authenticator, (req, res) => {
    follows.followUser(req, res, db);
  });
  // Unfollows a user
  app.delete(
    "/follows/:unfollower_id/:unfollowing_id",
    authenticator,
    (req, res) => {
      follows.unfollowUser(req, res, db);
    }
  );

  app.get("/follows/suggestions/:id", authenticator, (req, res) => {
    follows.getFollowSuggestions(req, res, db);
  });
};
