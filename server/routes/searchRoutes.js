const search = require('../controllers/searchControllers')

module.exports = (app, db, authenticator) => {
  // Finds all users whose usernames include the :arg params string
  app.get('/search/:arg', authenticator, (req, res) => {
    search.search(req, res, db)
  })
}
