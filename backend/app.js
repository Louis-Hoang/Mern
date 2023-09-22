if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const User = require("./models/user");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
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

// Serve the static files from the React app
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

app.post("/register", async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            res.send("User create");
        });
    } catch (e) {
        res.send(e);
    }
});

app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.status(200).send("Authentication Failed");
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send("Successfully Authenticated");
                console.log(req.user);
            });
        }
    })(req, res, next);
});

// app.post(
//     "/login",
//     passport.authenticate("local", {

//         failureMessage: true,
//         successRedirect: "/content",
//     }),
//     (req, res, next) => {}
// );

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
