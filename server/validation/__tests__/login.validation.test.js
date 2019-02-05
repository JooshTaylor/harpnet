const validateLogin = require("../login.validation");

const formData = {
  userOrEmail: "",
  password: ""
};

test("inputErrors object returns appropriate error messages when both input fields are empty", () => {
  const spy = jest.fn(validateLogin);
  const expected = {
    userOrEmail: "Please enter your email address or username",
    password: "Please enter your password"
  };

  const { isValid, inputErrors } = spy(formData);

  expect(spy).toHaveBeenCalledWith(formData);
  expect(isValid).toBe(false);
  expect(inputErrors).toMatchObject(expected);
});
