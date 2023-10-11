if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Models Import
const User = require("./models/user");

//Utils Import
const express = require("express");
const path = require("path");
const { uploadImage } = require("./aws-s3/index");

//DB and Auth Import
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/mernStack";
const session = require("express-session");
const MongoStore = require("connect-mongo");

//Routes Import
const userRoutes = require("./routes/users");

const app = express();

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
});

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

const sessionConfig = {
    store,
    name: "session",
    secret: "keyword",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
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

app.use((req, res, next) => {
    res.locals.currentUser = req.user; //?
    // res.locals.success = req.flash("success");
    // res.locals.error = req.flash("error");
    next();
});

app.use("/", userRoutes);

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
    // res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
