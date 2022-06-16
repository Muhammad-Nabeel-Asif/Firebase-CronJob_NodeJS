const express = require("express");
const router = express.Router();

const {
  getUserData,
  addUserData,
  updateUserData,
} = require("../controllers/userController");

router.route("/").get(getUserData).post(addUserData);
router.route("/:id").patch(updateUserData);

module.exports = router;
