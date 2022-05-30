var bcryptjs = require("bcryptjs");

const passwordhash = async (value) => {
  return await bcryptjs.hash(value, 8);
};

const boolHashMatch = async (value, hashValue) => {
  return await bcryptjs.compare(value, hashValue);
};

module.exports = { passwordhash, boolHashMatch };
