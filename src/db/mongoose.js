const monsgoose = require("mongoose");

monsgoose.connect("mongodb://localhost:27017/task-manager-api", {
  useNewUrlParser: true,
});

// const model = monsgoose.model("user", {
//   name: { type: String, require: true, trim: true },
//   age: {
//     type: Number,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (value < 0) {
//         throw new Error("Age must greater than 0");
//       }
//     },
//   },
//   email: {
//     type: String,
//     default: 0,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Email is invalid");
//       }
//     },
//   },
//   password: {
//     type: String,
//     require: true,
//     minlength: 7,
//     trim: true,
//     validate(value) {
//       if (value.toLowerCase().includes("password")) {
//         throw new Error("Invalid password");
//       }
//     },
//   },
// });

// // const me = new model({
// //   name: "Riyaz    ",
// //   email: "er.riyaz2507@gmail.com",
// //   password: "xzsdsds",
// // });

// // me.save()
// //   .then((res) => {
// //     console.log("result", res);
// //   })
// //   .catch((e) => {
// //     console.log("err", e.errors);
// //   });

// const taskModel = monsgoose.model("task", {
//   description: { type: String, trim: true, require: true },
//   isValid: { type: Boolean, default: false },
// });

// const userTask = new taskModel({
//   description: "create a node project and implement step by step            ",
//   isValid: false,
// });

// userTask
//   .save()
//   .then((res) => {
//     console.log("res", res);
//   })
//   .catch((e) => {
//     console.log("err", e);
//   });
