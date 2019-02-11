const profile = require('../controllers/profileControllers')

module.exports = (app, db, authenticator) => {
  // Gets a user's basic profile data.
  app.get('/profile/:id', authenticator, (req, res) => {
    profile.getProfile(req, res, db)
  })

  // Gets all data required for viewing an individual profile (profile, follows, posts).
  app.get('/profile/view/:id', authenticator, (req, res) => {
    profile.getViewProfile(req, res, db)
  })

  // Changes a profile's privacy state
  app.put('/profile/privacy/:id', authenticator, (req, res) => {
    profile.changePrivacy(req, res, db)
  })

  // Changes a profile's biography
  app.put('/profile/biography/:id', authenticator, (req, res) => {
    profile.changeBio(req, res, db)
  })

  // Changes a profile's first name
  app.put('/profile/first_name/:id', authenticator, (req, res) => {
    profile.changeFirstName(req, res, db)
  })

  // Changes a profile's last name
  app.put('/profile/last_name/:id', authenticator, (req, res) => {
    profile.changeLastName(req, res, db)
  })
}
