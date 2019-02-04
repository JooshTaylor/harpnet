const isEmpty = require("../is-empty");

describe("isEmpty detects whether different datatypes are empty", () => {
  test("isEmpty detects an empty object", () => {
    expect.assertions(1);

    const emptyObject = {};
    const response = isEmpty(emptyObject);
    expect(response).toBe(false);
  });
});
