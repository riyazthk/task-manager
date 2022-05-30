const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const verifyToken = jwt.verify(token, "Thisisnewcourse");
    const user = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    req.user = user;
    req.token = token;
    if (!verifyToken || !user) {
      throw new Error();
    }
    next();
  } catch (e) {
    console.log("entry");
    res.status(401).send("Please authenticate user");
  }
};
module.exports = auth;
