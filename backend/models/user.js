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

userSchema.virtual("thumbnailSize").set(function (params) {
    this._thumbnailSize = params;
});

userSchema.virtual("thumbnail").get(function () {
    const width = this._thumbnailSize.width || 200;
    const height = this._thumbnailSize.height || 150;
    const url =
        process.env.ImageKit_Endpoint +
        this.avatar.filename +
        `?tr=w-${width},h-${height},f-png,lo-true`;
    return url;
});
userSchema.plugin(passportLocalMongoose);
// Create model for todo then exports
module.exports = mongoose.model("User", userSchema);
