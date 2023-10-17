const User = require("../models/user");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/mernStack";
const session = require("express-session");
const MongoStore = require("connect-mongo");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

module.exports.registerUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const avatar = req.file
            ? { url: req.file.location, filename: req.file.key }
            : {
                  //default image
                  url: process.env.AWS_DEFAULT_URL,
                  filename: process.env.AWS_DEFAULT_FILENAME,
              };
        const user = new User({ email, username, avatar });
        // user.avatar = {
        //     //req.files for multiple file
        //     url: req.file.location,
        //     filename: req.file.key,
        // };

        await User.register(user, password, function (err, registeredUser) {
            if (err) {
                return res.send({ err });
            } else {
                // Registration successful, proceed with login
                req.login(registeredUser, (err) => {
                    if (err) {
                        return res.send(err);
                    }
                    return res.send({
                        auth: true,
                        username: req.user.username,
                        id: req.user._id,
                        msg: "Register successfully",
                    });
                });
            }
        });
    } catch (e) {
        res.send(e);
    }
};

module.exports.loginUser = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        try {
            if (!user)
                res.json({
                    auth: req.isAuthenticated(),
                    msg: "Username or Password is incorrect",
                });
            else {
                req.login(user, (err) => {
                    if (err) throw err;
                    res.json({
                        auth: req.isAuthenticated(),
                        username: req.user.username,
                        id: req.user._id,
                    });
                    console.log(req.user);
                    console.log("login sucess");
                });
            }
        } catch (e) {
            console.log(e);
        }
    })(req, res, next);
};

module.exports.authenticateUser = async (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            return res.json({
                auth: true,
                user: req.user.username,
                id: req.user._id,
            });
        }
        return res.json({ auth: false, message: "cannot authenticate" });
    } catch (e) {
        console.log(e);
    }
};

module.exports.logoutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
    });
    res.json({ auth: true, msg: "Logout success" });
};

module.exports.fetchUser = async (req, res, next) => {
    const { userId, thumbnailDim } = req.params;
    const user = await User.findById(userId);
    if (!user) {
        return res.json({ msg: "User does not exist" });
    }
    user.thumbnailSize = { width: thumbnailDim, height: thumbnailDim };
    const foundUser = Object.assign({ thumbnail: user.thumbnail }, user._doc);
    return res.json({ msg: "User found", user: foundUser });
};
