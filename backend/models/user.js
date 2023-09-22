const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// Create schema for todo
const userSchema = new Schema({
    email: { type: String, require: true, unique: true },
});

userSchema.plugin(passportLocalMongoose);
// Create model for todo then exports
module.exports = mongoose.model("User", userSchema);
