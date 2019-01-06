const validateRegister = require("../validation/register");
const validateLogin = require("../validation/login");
const jwt = require("jsonwebtoken");
const redis = require("redis");
const keys = require("../config/keys");

// Setting up a redis client
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

//All account registration handling
const handleRegister = async (req, res, db, bcrypt) => {
  const { email, username, password1 } = req.body;

  const { isValid, errors } = validateRegister(req.body); //Validates our input data

  //If our data is deemed invalid by the validation function, we return all errors
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const errors = {};

    //Checking if the email is unique
    await db
      .select("email")
      .from("users")
      .where("email", "=", email)
      .then(user => {
        if (user[0] !== undefined) {
          errors.email = "An account with that email address already exists";
          return res.status(400).json(errors);
        }
      });

    //Checking if the username is unique
    await db
      .select("username")
      .from("users")
      .where("username", "=", username.toUpperCase())
      .then(user => {
        if (user[0] !== undefined) {
          errors.username = "An account with that username already exists";
          return res.status(400).json(errors);
        }
      });

    //Inserting into the user database
    const newUser = await db("users")
      .returning("*")
      .insert({
        email,
        username
      })
      .then(user => user[0]);

    //Hashing the user's password
    await bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password1, salt, async (err, hash) => {
        //Inserting into the login database
        await db("login")
          .returning("*")
          .insert({
            user_id: newUser.user_id,
            password_hash: hash,
            username,
            email
          });
      });
    });
    res.json({ success: true });
  }
};

const handleLogin = async (req, res, db, bcrypt) => {
  const { isValid, inputErrors } = validateLogin(req.body);
  const { userOrEmail, password } = req.body;

  if (!isValid) {
    return res.status(400).json(inputErrors);
  }
  const errors = {};

  // Checking if the email or username exists and returning the user if successful
  const user = await db
    .select("*")
    .from("login")
    .where("email", "=", userOrEmail)
    .orWhere("username", "=", userOrEmail)
    .then(user => {
      if (user[0] === undefined) {
        return "error";
      }
      return user[0];
    });

  if (user === "error") {
    errors.userOrEmail =
      "Username or email address does not exist. Click the link below to register an account";
    return res.status(400).json(errors);
  }

  // Checking if the password entered matches the hash returned in the user object above
  await bcrypt.compare(password, user.password_hash, (err, response) => {
    if (!response) {
      errors.password = "Invalid password";
      return res.status(400).json(errors);
    }
  });

  // If user has been validated, we get all data needed to initially load the feed (first load page post-login)
  const storeData = {};
  storeData.follows = {};
  await db("users")
    .returning("*")
    .where("user_id", "=", user.user_id)
    .then(profile => {
      storeData.auth = {
        user: profile[0].user_id
      };
      storeData.profile = profile[0];
    });

  await db("follows")
    .returning("*")
    .where("follower_id", "=", user.user_id)
    .then(follows => {
      storeData.follows.following = follows.map(pair => {
        return pair.following_id;
      });
    });

  await db("follows")
    .returning("*")
    .where("following_id", "=", user.user_id)
    .then(follows => {
      storeData.follows.followers = follows.map(pair => {
        return pair.follower_id;
      });
    });

  // Creating a live login session.
  const session = await createSession(user.user_id);
  storeData.session = session;
  res.json(storeData);
};

// Creates a JWT, stores it in the Redis database with the user_id, then returns both token & ID.
const createSession = id => {
  const jwtPayload = {
    user_id: id
  };

  let token = jwt.sign(
    jwtPayload,
    process.env.JWT_SECRET || "production_jwt_secret",
    { expiresIn: "1 day" }
  );

  token = `Bearer ${token}`;

  redisClient.set(token, id);

  return {
    id,
    token
  };
};

// Authenticates a JWT for each private interaction
const handleAuthentication = (req, res, db) => {
  const { authorization } = req.headers;
  // Checks if the token has a corresponding user ID in the Redis DB.
  redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(400).json("Unauthorized");
    }
    // Checking if the ID returned is a legitimate user ID.
    db("users")
      .returning("*")
      .where("user_id", "=", reply)
      .then(user => {
        res.json(user[0]);
      });
  });
};

// Deletes a user account
const deleteAccount = async (req, res, db) => {
  const { id } = req.params;

  // Deleting every comment by the user
  await db("comments")
    .where("creator_id", "=", id)
    .del();

  // Retrieving an array of post IDs of posts made by the user to delete all comments on each post by ID
  let posts = await db("posts")
    .returning("*")
    .where("creator_id", "=", id);

  posts = posts.map(post => post.post_id);
  await db("comments")
    .whereIn("post_id", posts)
    .del();

  // Deleting all user posts
  await db("posts")
    .where("creator_id", "=", id)
    .del();

  // Deleting all data related to the user's followings or followers
  await db("follows")
    .where("follower_id", "=", id)
    .orWhere("following_id", "=", id)
    .del();

  // Deleting login data
  await db("login")
    .where("user_id", "=", id)
    .del();

  // Deleting all profile data
  await db("users")
    .where("user_id", "=", id)
    .del();

  res.json({ success: true });
};

module.exports = {
  handleRegister,
  handleLogin,
  handleAuthentication,
  deleteAccount,
  redisClient
};
