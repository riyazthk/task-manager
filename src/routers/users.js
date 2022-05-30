const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/user");
const { passwordhash } = require("../utils/hasing");
var router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    const isValid = await user.findEmailRegister(req.body);
    const response = await user.generateAuthToken();

    res.send({
      status: 200,
      message: "User data saved successfully",
      data: response,
    });
  } catch (e) {
    res.send({
      status: 401,
      message: e,
      data: e,
    });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const authData = await user.generateAuthToken();
    res.send({
      user: authData,
    });
  } catch (e) {
    console.log("e", e);
    res.status(400).send({ status: 400, message: "Invalid user credentials" });
  }
});

router.post("/users/logout", auth, async (req, res) => {
  req.user.tokens = req.user.tokens.filter((token) => {
    return token.token !== req.token;
  });
  const user = await req.user.save();
  res.send({
    message: "User logout successfully",
  });
});

router.post("/users/logoutall", auth, async (req, res) => {
  try {
    req.user.token = [];
    await req.user.save();
    res.status(200).send({ message: "All user successfully logouts" });
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res.send({ message: "dssd" });
  }
});

router.get("/users", auth, async (req, res) => {
  const _id = req.user.id;
  try {
    const response = await User.findById({ _id });
    if (!response) {
      return res.status(404).send({
        status: 404,
        message: "Invalid user id",
      });
    }
    res.status(200).send({
      status: 200,
      message: "user list fetched successfully",
      data: response,
    });
  } catch (e) {
    res.status(404).send({
      status: 404,
      message: "Invalid ",
    });
  }
});

router.patch("/users", auth, async (req, res) => {
  const _id = req.user.id;
  const updates = Object.keys(req.body);
  const db_parameter = ["name", "password", "email"];
  const isValidOperator = updates.every((item) => db_parameter.includes(item));

  if (!isValidOperator) {
    return res.send({
      status: 404,
      message: "Invalid validation keys",
    });
  }

  try {
    const user = await User.findById(_id);

    updates.forEach((update) => {
      return (user[update] = req.body[update]);
    });

    await user.save();

    if (!user) {
      res.status(400).send({
        status: 400,
        message: "Invalid Id",
      });
    }
    res.status(200).send({
      status: 200,
      message: "user details updated successsfully",
      data: user,
    });
  } catch (e) {
    res.status(500).send({
      status: 500,
      message: "internal server error",
    });
  }
});

router.delete("/users", auth, async (req, res) => {
  const user = await req.user.remove();
  res.send({
    status: 200,
    message: "User data deleted successfully",
    data: user,
  });
});

module.exports = router;
