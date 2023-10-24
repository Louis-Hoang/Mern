// const express = require("express");
// const router = express.Router();
// const { uploadImage } = require("../aws-s3/index");
// const users = require("../controllers/users");
// const { validateRegister } = require("../middleware");

// router
//     .route("/register")
//     .post(uploadImage.single("image"), validateRegister, users.registerUser);
// router.route("/login").post(users.loginUser);
// router.route("/logout").post(users.logoutUser);
// router.route("/auth").post(users.authenticateUser);
// router.route("/:userId/:thumbnailDim").get(users.fetchUser);

// module.exports = router;

import express, { Router } from "express";
import { RequestHandler } from "express-serve-static-core";
import { uploadImage } from "../aws-s3/index";
import * as users from "../controllers/users";
import { validateRegister } from "../middleware";

const router: Router = express.Router();

router
    .route("/register")
    .post(
        uploadImage.single("image"),
        validateRegister,
        users.registerUser as RequestHandler
    );

router.route("/login").post(users.loginUser as RequestHandler);
router.route("/logout").post(users.logoutUser as RequestHandler);
router.route("/auth").post(users.authenticateUser as RequestHandler);
router.route("/:userId/:thumbnailDim").get(users.fetchUser as RequestHandler);

export = router;
