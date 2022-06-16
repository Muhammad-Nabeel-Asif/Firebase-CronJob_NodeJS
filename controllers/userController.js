const userRef = require("../firebase");

const getUserData = async (req, res) => {
  try {
    await userRef.once("value", function (snapshot) {
      res.status(200).json({
        status: "success",
        length: snapshot.numChildren(),
        users: snapshot.val(),
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

const addUserData = async (req, res) => {
  const { user_name, user_age, user_location, user_marks } = req.body;
  try {
    await userRef.push({
      user_name: user_name,
      user_age: user_age,
      user_location: user_location,
      user_marks: user_marks,
    });

    res.status(201).json({
      status: "success",
      msg: "Data is added successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

const updateUserData = async (req, res) => {
  const userId = req.params.id;
  const { user_marks } = req.body;
  const testString = `${userId}/user_marks`;
  try {
    await userRef.update({
      testString: user_marks,
    });
    res.status(200).json({
      status: "success",
      msg: "Data is updated successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

module.exports = {
  getUserData,
  addUserData,
  updateUserData,
};
