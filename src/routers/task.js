const express = require("express");
const auth = require("../middleware/auth");
const Task = require("../models/task");
var router = new express.Router();

router.post("/task", auth, async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user.id });
  try {
    const response = await task.save();
    res.status(200).send({
      status: 200,
      message: "Task added successfully",
      data: response,
    });
  } catch (e) {
    res.status(403).send({
      status: 403,
      message: "something went wrong",
      data: e,
    });
  }
});

router.get("/task", auth, async (req, res) => {
  const match = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  try {
    await req.user.populate({ path: "tasks", match });

    res.send({
      status: 200,
      message: "task list fetched successfully",
      data: req.user.tasks,
    });
  } catch (e) {
    res.send({
      status: 404,
      message: "Invalid id",
    });
  }
});

router.get("/task/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    // const response = await Task.findById(_id);
    const response = await Task.findOne({ _id, owner: req.user._id });

    if (!response) {
      return res.status(400).send({
        status: 400,
        message: "invalid id",
        data: response,
      });
    }
    res.status(200).send({
      status: 200,
      message: "task details fetched successfully",
      data: response,
    });
  } catch (e) {
    res.status(500).send({
      status: 500,
      message: "Internal server error",
    });
  }
});

router.patch("/task/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const db_parameter = ["description", "completed"];
  const isValidUpdate = updates.every((item) => db_parameter.includes(item));

  if (!isValidUpdate) {
    return res.send({
      status: 400,
      message: "Invalid data send",
    });
  }

  try {
    const task = await Task.findById({ _id, owner: req.user._id });

    updates.forEach((item) => {
      return (task[item] = req.body[item]);
    });

    if (!task) {
      return res.status(404).send({
        status: 404,
        message: "Invalid Id",
      });
    }
    const response = await task.save();

    res.status(200).send({
      status: 200,
      message: "Task updates successfully",
      data: response,
    });
  } catch (e) {
    res.status(500).send({
      status: 500,
      message: "Internal server error",
      error: e,
    });
  }
});

router.delete("/task/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const task = await Task.findByIdAndDelete({ _id, owner: req.user._id });
  if (!task) {
    return res.send({
      error: 400,
      message: "Invalid id",
    });
  }
  res.send({
    status: 200,
    message: "Task deleted successfully",
    data: task,
  });
});

module.exports = router;
