const isEmpty = data => {
  if (
    (typeof data === "string" && data === "") ||
    (typeof data === "object" && Object.keys(data).length === 0) ||
    data === undefined ||
    data === null
  ) {
    return true;
  }
  return false;
};

module.exports = isEmpty;
