const validator = require("validator");
const isEmpty = require("./is-empty");

const validatePostData = data => {
  const errors = {};

  data.content = isEmpty(data.content) ? "" : data.content;

  if (validator.isEmpty(data.content)) {
    errors.post = "You cannot submit an empty post!";
  }

  if (!validator.isLength(data.content, { max: 300, min: 1 })) {
    errors.post = "Your post must be between 1 and 300 characters long";
  }

  return {
    isValid: isEmpty(errors),
    errors
  };
};

module.exports = validatePostData;
