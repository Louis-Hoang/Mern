const express = require("express");
const router = express.Router();
const { uploadImage } = require("../aws-s3/index");
const users = require("../controllers/users");

router.route("/register").post(uploadImage.single("image"), users.registerUser);
router.route("/login").post(users.loginUser);
router.route("/logout").post(users.logoutUser);
router.route("/auth").post(users.authenticateUser);
router.route("/:userId/:thumbnailDim").get(users.fetchUser);

module.exports = router;
