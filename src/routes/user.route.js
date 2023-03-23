//const { role } = require("../config");
const router = require("express").Router();
const auth = require("../middlewares/auth.middleware")();
//const upload = require("../middlewares/multer.middleware");
//const ProductCtrl = require("../controllers/product.controller");
const UserCtrl = require("../controllers/user.controller");

router.post("/register",UserCtrl.register);

router.post("/login",UserCtrl.login);

router.post("/v-registration",auth, UserCtrl.verifyregistrationPin);

router.post("/r-registration",UserCtrl.resendVerificationCode);

router.post("/forgot-password",UserCtrl.sendForgotPasswordCode);

router.post("/v-forgot-password",UserCtrl.verifyForgotPasswordPin);

router.post("/r-forgot-password",UserCtrl.resendForgotPasswordCode);


router.post("/update-profile",auth,UserCtrl.updateUserProfile);

/**
 * @apiIgnore Not to be used
 *
 * @apiVersion 0.1.0
 * @api {delete} /users/:userid 8. Delete user
 * @apiPermission admin
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiParam {string} userId The User ID.
 */

module.exports = router;
