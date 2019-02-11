const validator = require('validator')
const isEmpty = require('./is-empty')

const validateRegister = data => {
  let { email, username, password1, password2 } = data
  const errors = {}

  //This uses our personal isEmpty function to converting these values to empty strings if they are invalid. This lets us use validator.isEmpty later.
  email = isEmpty(email) ? '' : email
  username = isEmpty(username) ? '' : username
  password1 = isEmpty(password1) ? '' : password1
  password2 = isEmpty(password2) ? '' : password2

  !validator.isEmail(email)
    ? (errors.email = 'Please enter a valid email address')
    : null

  !validator.isLength(username, { min: 3, max: 16 })
    ? (errors.username =
        'Username must be between 3 and 16 characters in length')
    : null
  !validator.isLength(password1, { min: 8, max: 1000 })
    ? (errors.password1 = 'Password must be at least 8 characters in length')
    : null

  !validator.equals(password1, password2)
    ? (errors.password2 = 'Passwords do not match')
    : null

  //Checking for
  validator.isEmpty(email)
    ? (errors.email = 'Please enter an email address')
    : null
  validator.isEmpty(username)
    ? (errors.username = 'Please enter a username')
    : null
  validator.isEmpty(password1)
    ? (errors.password1 = 'Please enter a password')
    : null
  validator.isEmpty(password2)
    ? (errors.password2 = 'Please re-enter your password')
    : null

  return {
    isValid: isEmpty(errors), //Will return true if we received no errors during this validation process
    errors
  }
}

module.exports = validateRegister
