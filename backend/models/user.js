const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// const AvatarSchema = new Schema({
//     url: String,
//     filename: String,
// });

const userSchema = new Schema({
    email: { type: String, require: true, unique: true },
    avatar: { url: String, filename: String },
});

userSchema.plugin(passportLocalMongoose);
// Create model for todo then exports
module.exports = mongoose.model("User", userSchema);
