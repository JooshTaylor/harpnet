const getFollows = async (req, res, db) => {
  const { id } = req.params
  const followData = {
    following: [],
    followers: []
  }

  //Gets all users that the subject is following
  await db('follows')
    .returning('*')
    .where('follower_id', '=', id)
    .then(data => {
      followData.following = data.map(pair => {
        return pair.following_id
      })
    })

  //Gets all users that follow the subject
  await db('follows')
    .returning('*')
    .where('following_id', '=', id)
    .then(data => {
      followData.followers = data.map(pair => {
        return pair.follower_id
      })
    })

  //Returning an object with an array for each of the queries executed above
  res.json(followData)
}

const followUser = async (req, res, db) => {
  const { follower_id } = req.body
  const { following_id } = req.params
  const errors = {}

  // Ensuring the follower user is not already following who they are requesting to follow.
  const data = await db('follows')
    .returning('*')
    .where('follower_id', '=', follower_id)
    .then(data => data)

  //If the user is already following the requested account, isValid == false. Otherwise == true.
  const isValid =
    data.filter(item => {
      return item.following_id === following_id
    }).length === 0
      ? true
      : false

  if (!isValid) {
    errors.follow = 'You are already following this user'
    return res.status(400).json(errors)
  }

  // Getting and returning data if everything previously run was valid.
  await db('follows')
    .returning('*')
    .insert({
      follower_id: follower_id,
      following_id: following_id
    })
    .then(data => {
      res.json(data)
    })
}

// Unfollows a user
const unfollowUser = async (req, res, db) => {
  const { unfollower_id, unfollowing_id } = req.params

  await db('follows')
    .where('follower_id', '=', unfollower_id)
    .andWhere('following_id', '=', unfollowing_id)
    .del()
    .then(() => {
      res.json({ success: true })
    })
}

const getFollowSuggestions = async (req, res, db) => {
  const { id } = req.params

  const allUsers = await db('users')
    .returning('*')
    .where('user_id', '<>', id)

  const usersFollowingData = await db('follows')
    .returning('*')
    .where('follower_id', '=', id)

  const usersFollowing = usersFollowingData.map(
    followPair => followPair.following_id
  )

  const suggestions = allUsers.filter(
    user => !usersFollowing.includes(user.user_id)
  )

  res.json({ suggestions })
}

module.exports = {
  getFollows,
  followUser,
  unfollowUser,
  getFollowSuggestions
}
