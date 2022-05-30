// const mongodb = require("mongodb");

// const mongoClient = mongodb.MongoClient;
// const objectId = mongodb.ObjectId;

const { MongoClient, ObjectId } = require("mongodb");

const id = new ObjectId();

const connectionUrl = "mongodb://localhost:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("unable to connect mongo db");
    }

    const db = client.db(databaseName);
    db.collection("users").insertOne(
      {
        name: "vikaram",
        age: 22,
        _id: id,
      },
      (error, results) => {
        if (error) {
          return console.log("error", error);
        }
        console.log("result", results);
      }
    );
    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Riyaz",
    //       age: 23,
    //     },
    //     {
    //       name: "Ahamed",
    //       age: 23,
    //     },
    //   ],
    //   (error, results) => {
    //     if (error) {
    //       return console.log("error");
    //     }
    //     console.log("send success fully");
    //   }
    // );
    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "This is one of the most powerful engine",
    //       completed: true,
    //     },
    //     {
    //       description: "We need to calculate rows and columns",
    //       completed: false,
    //     },
    //     {
    //       description: "We need to calculate rows and columns",
    //       completed: false,
    //     },
    //   ],
    //   (error, results) => {
    //     if (error) {
    //       return console.log("unable to send documents");
    //     }
    //     console.log("successfully save into database");
    //   }
    // );
    // db.collection("users").findOne({ name: "Riyaz" }, (error, results) => {
    //   if (error) {
    //     return console.log("unable to connect database");
    //   }
    //   console.log("results", results);
    // });

    // db.collection("users")
    //   .find({ name: "riyaz" })
    //   .toArray((error, results) => {
    //     if (error) {
    //       return console.log("unable to connect data");
    //     }
    //     console.log("redults", results);
    //   });
    // const updatePromise = db.collection("users").updateOne(
    //   {
    //     _id: new ObjectId("624d5e4ce95addb5b142a603"),
    //   },
    //   { $set: { name: "test" } }
    // );

    // const updatePromise = db
    //   .collection("users")
    //   .updateOne(
    //     { _id: new ObjectId("624d5e4ce95addb5b142a603") },
    //     { $inc: { age: 10 } }
    //   );

    // const updatePromise = db.collection("users").updateMany(
    //   { _id: new ObjectId("624d5e4ce95addb5b142a603") },
    //   {
    //     $set: {
    //       age: 1,
    //       name: "Mike",
    //     },
    //   }
    // );
    const updatePromise = db.collection("users").deleteMany({ age: 22 });

    updatePromise
      .then((results) => {
        console.log("results", results);
      })
      .catch((e) => {
        console.log("err");
      });
  }
);
