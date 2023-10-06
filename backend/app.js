if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const User = require("./models/user");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { uploadImage } = require("./aws-s3/index");
const app = express();

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/mernStack";

const session = require("express-session");
const MongoStore = require("connect-mongo");

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
    res.locals.currentUser = req.user;
    // res.locals.success = req.flash("success");
    // res.locals.error = req.flash("error");
    next();
});

// An api endpoint that returns a short list of items
app.get("/api/getList", (req, res) => {
    var list = [{ first: "Tung", last: "Hoang" }];
    res.json(list);
    console.log("Sent list of items");
});

app.post("/register", uploadImage.single("image"), async (req, res, next) => {
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

        const registeredUser = await User.register(user, password);

        req.login(registeredUser, (err) => {
            if (err) return next(err);
            res.send({
                auth: true,
                username: req.user.username,
                id: req.user._id,
            });
        });
    } catch (e) {
        res.send(e);
    }
});

app.post("/login", (req, res, next) => {
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
});

app.post("/auth", function (req, res, next) {
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
});

app.post("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
    });
    res.json({ auth: true, msg: "Logout success" });
});

app.get("/user/:userId/:thumbnailDim", async (req, res, next) => {
    const { userId, thumbnailDim } = req.params;
    const user = await User.findById(userId);
    if (!user) {
        return res.json({ msg: "User does not exist" });
    }
    user.thumbnailSize = { width: thumbnailDim, height: thumbnailDim };
    const foundUser = Object.assign({ thumbnail: user.thumbnail }, user._doc);
    return res.json({ msg: "User found", user: foundUser });
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
    // res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
