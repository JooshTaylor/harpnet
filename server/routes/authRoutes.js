const bcrypt = require("bcryptjs");
const auth = require("../controllers/authControllers");

module.exports = (app, db, authenticator) => {
  // Register a new user
  app.post("/auth/register", (req, res) => {
    auth.handleRegister(req, res, db, bcrypt);
  });

  // Log a user in
  app.post("/auth/login", (req, res) => {
    auth.handleLogin(req, res, db, bcrypt);
  });

  app.put("/auth/logout", authenticator, (req, res) => {
    auth.handleLogout(req, res, db);
  });

  // Authenticate a user's JWT
  app.get("/auth/authenticate", (req, res) => {
    auth.handleAuthentication(req, res, db);
  });

  // Delete a user account by their ID.
  app.delete("/auth/delete/:id", authenticator, (req, res) => {
    auth.deleteAccount(req, res, db);
  });
};
