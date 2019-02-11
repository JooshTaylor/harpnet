const isEmpty = require("../is-empty");

describe("isEmpty detects whether different datatypes are empty", () => {
  test("isEmpty detects an empty object", () => {
    const emptyObject = {};
    const response = isEmpty(emptyObject);
    expect(response).toBe(true);
  });

  test("isEmpty detects an empty string", () => {
    const emptyString = "";
    const response = isEmpty(emptyString);
    expect(response).toBe(true);
  });

  test("isEmpty detects an empty array", () => {
    const emptyArray = [];
    const response = isEmpty(emptyArray);
    expect(response).toBe(true);
  });
});
