if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// // Models Import
// const User = require("./models/user");

// //Utils Import
// const express = require("express");
// const { Request, Response, NextFunction } = require("express");

// // import { Request, Response, NextFunction } from "express";
// const path = require("path");
// const { uploadImage } = require("./aws-s3/index");

// //DB and Auth Import
// const mongoose = require("mongoose");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/mernStack";
// const session = require("express-session");
// const MongoStore = require("connect-mongo");

// //Routes Import
// const userRoutes = require("./routes/users");

// const app = express();

if (process.env.NODE_ENV !== "production") {
    import("dotenv").then((dotenv) => dotenv.config());
}

// Models Import
import { User } from "./models/user";

// Utils Import
import express from "express";
import { Request, Response, NextFunction } from "express";
import path from "path";
import { uploadImage } from "./aws-s3";

// DB and Auth Import
import mongoose from "mongoose";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/mernStack";
import session from "express-session";
import MongoStore from "connect-mongo";

// Routes Import
import userRoutes from "./routes/users";

const app = express();

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DB conencted");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: "thisshouldbeabettersecret!",
    },
});

const sessionConfig: session.SessionOptions = {
    store,
    name: "session",
    secret: "keyword",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
};
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.use(express.static(path.join(__dirname, "frontend/build")));

app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.currentUser = req.user; //?
    // res.locals.success = req.flash("success");
    // res.locals.error = req.flash("error");
    next();
});

app.use("/", userRoutes);

// Handles any requests that don't match the ones above
app.get("*", (_req: Request, _res: Response) => {
    // res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
