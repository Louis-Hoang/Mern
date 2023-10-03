const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const userSchema = new Schema({
    email: { type: String, require: true, unique: true },
    avatar: {
        url: String,
        filename: String,
    },
});

userSchema.virtual("thumbnail").get(function () {
    const url =
        process.env.ImageKit_Endpoint +
        this.avatar.filename +
        "?tr=w-200,h-150,f-png,lo-true";
    return url;
});
userSchema.plugin(passportLocalMongoose);
// Create model for todo then exports
module.exports = mongoose.model("User", userSchema);
