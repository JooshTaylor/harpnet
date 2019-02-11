const validatePostData = require("../post.validation");

const formData = {
  content: ""
};
let spy;

beforeEach(() => {
  formData.content = "";
  spy = jest.fn(validatePostData);
});

test("Empty post input returns appropriate error message", () => {
  const { isValid, errors } = spy(formData);
  expect(isValid).toBe(false);
  expect(errors).toMatchObject({ post: "You cannot submit an empty post!" });
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(formData);
});

test("Invalid post content length returns appropriate error message", () => {
  const failTestCases = [
    "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  ];
  const passTestCases = [
    "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "1",
    "123",
    "sfjnsdfjksdng"
  ];

  failTestCases.forEach(input => {
    formData.content = input;
    const { isValid, errors } = spy(formData);
    expect(isValid).toBe(false);
    expect(errors.post).toMatch(
      "Your post must be between 1 and 300 characters long"
    );
    expect(spy).toHaveBeenCalledWith(formData);
  });

  passTestCases.forEach(input => {
    formData.content = input;
    const { isValid, errors } = spy(formData);
    expect(isValid).toBe(true);
    expect(errors).toMatchObject({});
    expect(spy).toHaveBeenCalledWith(formData);
  });

  expect(spy).toHaveBeenCalledTimes(5);
});
