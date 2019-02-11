const isEmpty = require('./is-empty')

const validateLogin = data => {
  let { userOrEmail, password } = data

  const inputErrors = {}

  isEmpty(userOrEmail)
    ? (inputErrors.userOrEmail = 'Please enter your email address or username')
    : null
  isEmpty(password)
    ? (inputErrors.password = 'Please enter your password')
    : null

  return {
    isValid: isEmpty(inputErrors),
    inputErrors
  }
}

module.exports = validateLogin
