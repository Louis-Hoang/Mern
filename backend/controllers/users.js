const User = require("../models/user");

module.exports.registerUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username, password });
        await user.save();
        res.send("User Created");
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/register");
    }
};
