const { userSchema } = require("./schemas.js");
const ExpressError = require("./utils/ExpressError");

module.exports.validateRegister = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};
