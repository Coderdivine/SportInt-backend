const response = require("../utils/response");
const UserService = require("../services/user.service");
const CustomError = require("../utils/custom-error");

class UserContoller {

    async login(req, res) {
        const result = await UserService.login(req.body);
        res.status(200).send(response("User Logged In", result));
    }

    async register(req,res){
        if(!req.body) throw new CustomError("No request body",404);
        const result = await UserService.register(req.body);
        if(!result) throw new CustomError("Registration failed",500);
        res.status(201).send(response("Registration completed",result));
    }

    async verifyregistrationPin(req,res){
        if(!req.body) throw new CustomError("No request body",404);
        const result = await UserService.VerifyEmailCode(req.body);
        res.status(201).send(response("Verification Completed",result));

    }

    async resendVerificationCode(req,res){
        if(!req.body) throw new CustomError("No request body",404);
        const result = await UserService.resendVerificationPin(req.body);
        res.status(201).send(response("Verification pin sent",result));

    }

    async sendForgotPasswordCode(req,res){
        if(!req.body) throw new CustomError("No request body",404);
        const result = await UserService.forgotPasswordReset(req.body);
        res.status(201).send(response("Verification pin sent",result));
 
    }

    async resendForgotPasswordCode(req,res){
        if(!req.body) throw new CustomError("No request body",404);
        const result = await UserService.resendForgotPasswordMail(req.body);
        res.status(201).send(response("Verification pin sent",result));
 
    }

    async verifyForgotPasswordPin(req,res){
        if(!req.body) throw new CustomError("No request body",404);
        if(!req.body.password) throw new CustomError("New password is required");
        const result = await UserService.verifyforgotPasswordEmailCode(req.body);
        res.status(201).send(response("Verification Completed",result));
 
    }

    async updateUserProfile(req, res) {
        const result = await UserService.update(req.$user_id,req.body);
        res.status(200).send(response("Profile updated", result));
    }

}

module.exports = new UserContoller();
