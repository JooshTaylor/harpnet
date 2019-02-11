const validateRegister = require('../register.validation')

const formData = {
  email: '',
  username: '',
  password1: '',
  password2: ''
}
let spy

function clearInputs() {
  formData.email = ''
  formData.username = ''
  formData.password1 = ''
  formData.password2 = ''
}

function fillOutInputs() {
  formData.email = 'test@test.com'
  formData.username = 'testtesttest'
  formData.password1 = 'testtest'
  formData.password2 = 'testtest'
}

beforeEach(() => {
  spy = jest.fn(validateRegister)
})

test('Empty input fields return their appropriate error messages', () => {
  expect.assertions(3)
  clearInputs()
  const expected = {
    email: 'Please enter an email address',
    username: 'Please enter a username',
    password1: 'Please enter a password',
    password2: 'Please re-enter your password'
  }

  // const spy = jest.fn(validateRegister);
  const { isValid, errors } = spy(formData)

  expect(spy).toHaveBeenCalledWith(formData)
  expect(isValid).toBe(false)
  expect(errors).toMatchObject(expected)
})

describe('Testing specific inputs', () => {
  beforeEach(fillOutInputs)

  test('Invalid email addresses return appropriate error messages', () => {
    expect.assertions(10)
    const failTestCases = ['email', 'email@email']
    const passTestCases = ['email@email.com']

    failTestCases.forEach(email => {
      formData.email = email
      const { isValid, errors } = spy(formData)
      expect(isValid).toBe(false)
      expect(errors.email).toMatch('Please enter a valid email address')
      expect(spy).toHaveBeenCalledWith(formData)
    })

    passTestCases.forEach(email => {
      formData.email = email
      const { isValid, errors } = spy(formData)
      expect(isValid).toBe(true)
      expect(errors).toMatchObject({})
      expect(spy).toHaveBeenCalledWith(formData)
    })

    expect(spy).toHaveBeenCalledTimes(3)
  })

  test('Invalid usernames return appropriate error messages', () => {
    expect.assertions(16)
    const failTestCases = ['a', 'ab', 'djwidoanckdjelwpw']
    const passTestCases = ['abc', '123456789123456']

    failTestCases.forEach(username => {
      formData.username = username
      const { isValid, errors } = spy(formData)
      expect(isValid).toBe(false)
      expect(errors.username).toMatch(
        'Username must be between 3 and 16 characters in length'
      )
      expect(spy).toHaveBeenCalledWith(formData)
    })

    passTestCases.forEach(username => {
      formData.username = username
      const { isValid, errors } = spy(formData)
      expect(isValid).toBe(true)
      expect(errors).toMatchObject({})
      expect(spy).toHaveBeenCalledWith(formData)
    })

    expect(spy).toHaveBeenCalledTimes(5)
  })

  test('Invalid password data returns appropriate error messages', () => {
    expect.assertions(16)
    const failTestCases = ['pw', '1234567']
    const passTestCases = ['password', 'sjkfsdbfkjdsbdsbfsk']

    failTestCases.forEach(pw => {
      formData.password1 = pw
      formData.password2 = pw
      const { isValid, errors } = spy(formData)
      expect(isValid).toBe(false)
      expect(errors.password1).toMatch(
        'Password must be at least 8 characters in length'
      )
      expect(spy).toHaveBeenCalledWith(formData)
    })

    passTestCases.forEach(pw => {
      formData.password1 = pw
      formData.password2 = pw
      const { isValid, errors } = spy(formData)
      expect(isValid).toBe(true)
      expect(errors).toMatchObject({})
      expect(spy).toHaveBeenCalledWith(formData)
    })

    formData.password1 = 'password123'
    formData.password2 = 'password1234'
    const { isValid, errors } = spy(formData)
    expect(isValid).toBe(false)
    expect(errors).toMatchObject({ password2: 'Passwords do not match' })
    expect(spy).toHaveBeenCalledWith(formData)

    expect(spy).toHaveBeenCalledTimes(5)
  })
})
