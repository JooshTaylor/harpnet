const search = async (req, res, db) => {
  const { arg } = req.params;

  const allUsers = await db("users")
    .returning("*")
    .then(users => users);

  // Filtering all users based on if their usernames include the arg string
  const filteredUsers = allUsers.filter(user => {
    return user.username.toLowerCase().includes(arg.toLowerCase());
  });
  res.json(filteredUsers);
};

module.exports = {
  search
};
