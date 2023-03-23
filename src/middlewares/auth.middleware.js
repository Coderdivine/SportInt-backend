const JWT = require("jsonwebtoken");
const User = require("../models/user.model");
const { role, JWT_SECRET } = require("../config");
const CustomError = require("../utils/custom-error");

/**
 * If no role is passed the default role is user
 *
 * @param  {any[]} roles List of roles allowed to access the route
 */
function auth() {
   // roles = roles.length > 0 ? roles : role.USER;

    return async (req, res, next) => {
        console.log("Authent...")
        if(!req.body.user_id) throw new CustomError("You must specify userId");
        req.$user_id = req.body.user_id;
        console.log(req.body)
        next();
    }
}

module.exports = auth;
