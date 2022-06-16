const express = require("express");
const nodeCron = require("node-cron");
const color = require("cli-color");

const userRef = require("./firebase");
const userRouter = require("./routes/userRoutes");

const app = express();
const port = 3000;

const cronJobFunction = () => {
  userRef.once("value", function (snapshot) {
    const objectArray = Object.entries(snapshot.val());
    if (!objectArray)
      throw new Error(
        "Something went wrong in Realtime Database - Server/Data/User, kindly fix it"
      );
    objectArray.forEach((item) => {
      updateUserMarks(item[0], item[1]);
    });
  });
};

const updateUserMarks = async (userId, userObject) => {
  await userRef.child(userId).update(
    {
      user_marks: userObject.user_marks + 5,
    },
    () => {
      console.log(
        `${color.green(`User marks updated at: `)} ${color.yellow(
          new Date().toLocaleString()
        )}`
      );
    }
  );
};

// cron job running every 20 seconds

nodeCron.schedule("*/20 * * * * *", cronJobFunction);

// Body parser middleware
app.use(express.json());

app.use("/users", userRouter);

app.listen(port, () => console.log(`App running on port ${port}...`));
