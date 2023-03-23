const { BCRYPT_SALT } = require("../config");
const User = require("./../models/user.model");
const { VToken, FToken } = require("./../models/token.model");
const CustomError = require("./../utils/custom-error");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const randonNum = require("../utils/randonNum");
const { sendMail,sendForgotPasswordMail } = require("../utils/sendMail");
class UserService {

    async login(data){
        if(!data) throw new CustomError("Please provide either username or phoneNumber");
        if(!data.password) throw new CustomError("Please provide a password");
        const use = data.email?data.email:data.phone_number;
        console.log({[use]:use});
        let result = await User.findOne({email: use});
        // if(!result) result = await User.findOne({email: use});
        if(!result) throw new CustomError("User not found",404);
        console.log({result});
        await this.Validate(data.password,result);
        return result;
    }

    async Validate(password,data){
        const compare = await bcrypt.compare(password,data.password);
        if(!compare) throw new CustomError("Wrong password");
        return true;
    }

    async register(data){
        if(!data.email) throw new CustomError("Please provide email address");
        if(!data.password) throw new CustomError("Please provide password");
        if(!data.phone_number) throw new CustomError("Please provide phone number");
        if(!data.Interest) throw new CustomError("Please provide interest");
        const hash = await bcrypt.hash(data.password,BCRYPT_SALT); 
        const user_id = uuid.v4().toString();
        console.log({user_id});

        const newUser = new User({
            email: data.email,
            user_id,
            Interest:data.Interest,
            phone_number: data.phone_number,
            password:hash
        });
        const saved = await newUser.save();
        if(!saved) throw new CustomError("Unable to create user");
        console.log({saved});

        const result = await this.sendEmailVerification({
            user_id,
            email: data.email,
        });

        return result;
    };

    async sendEmailVerification(data){
        const token = await randonNum.randomNum();
        console.log({token});
        const hash = await bcrypt.hash(token,BCRYPT_SALT);
        const newVToken = new VToken({
            token:hash,
            user_id: data.user_id
        });
        const saved = await newVToken.save();
        console.log({saved});
        if(!saved) throw new CustomError("Unable to create verification token");
        const result = await sendMail({
            otp:token,
            email:data.email
        });
        console.log({result});
        
        if(!result) throw new CustomError("Unable to send verification code");
        return data;

    }

    async VerifyEmailCode(data){
        const vtoken = await VToken.findOne({user_id: data.user_id});
        if(!vtoken) throw new CustomError("Email verification token not found");
        const valid = await bcrypt.compare(data.token,vtoken.token);
        if(!valid) throw new CustomError("Email verification failed. Wrong token");
        // const user = await User.findOne({user_id: data.user_id});
        // user.isEmailVerified = true;
        const update = await User.updateOne({user_id: data.user_id},{isEmailVerified:true});
        const dlt = await VToken.deleteMany({user_id: data.user_id});
        if(!dlt) throw new CustomError("Unable to delete verification token");
        console.log({update});

        return {
            ...data,
            isEmailVerified:true
        }
    }

    async resendVerificationPin(data){
        const vtoken = await VToken.findOne({user_id:data.user_id});
        const otp = await randonNum.randomNum();
        data.token = otp.toString();
        data.otp = otp.toString();
        if(!vtoken) throw new CustomError("Email verification token not found");
        const newToken = await new VToken(data);
        const result = await newToken.save();
        if(!result) throw new CustomError("Unable to create verification token");
        const email_result = await this.sendEmailVerification(data);
        console.log({email_result});
        return email_result;
    }

    async forgotPasswordReset(data){
        const otp = await randonNum.randomNum();
        console.log({otp});

        if(!data.email) throw new CustomError("Email is required");
         data.token =  await bcrypt.hash(otp,BCRYPT_SALT);
        const createToken = new FToken(data);
        data.otp = otp;
        await createToken.save();
        if(!createToken) throw new CustomError("Unable to create token");
        const result = await this.sendforgotPasswordEmailCode(data);
        console.log({result});
        data.otp = "000000"

        return data;
    }

    async sendforgotPasswordEmailCode(data){
        const result = await sendForgotPasswordMail(data);
        return result;
    }

    async resendForgotPasswordMail(data){
        const ftoken = await FToken.findOne({email: data.email});
        if(!ftoken) throw new CustomError("No token found");
        console.log({ftoken});
        const otp = await randonNum.randomNum();
        const hash = await bcrypt.hash(otp,BCRYPT_SALT);
        const updated = await FToken.updateOne({email: data.email},{token:hash});
        console.log({updated});
        const email_result = await sendForgotPasswordMail({otp,email:ftoken.email});
        console.log({email_result});

        return email_result;
    }

    async verifyforgotPasswordEmailCode(data){
            const ftoken = await FToken.findOne({email:data.email});
            if(!ftoken) throw new CustomError("No token found");
            const valid = await bcrypt.compare(data.token,ftoken.token);
            console.log({valid});
            if(!valid) throw new CustomError("Email verification failed. Wrong token");
            const user = await User.findOne({email:data.email});
            const hash = await bcrypt.hash(data.password,BCRYPT_SALT);
            const result = await User.findOne({email:data.email},{password:hash});
            console.log({result});
            const dlt = await FToken.deleteMany({email: data.email});
            if(!dlt) throw new CustomError("Unable to delete verification token");
        

            return result;
    }
    




    async update(user_id,data) {
        if(data.password){
            const hash = await bcrypt.hash(data.password,BCRYPT_SALT);
            data.password = hash;
            console.log({["ripping_hash"]:data.password});
            const user = await User.updateOne({ user_id }, { $set: data });
            console.log({user});

            if (!user) throw new CustomError("user does not exist", 404);

            return user;
        }else{
            const user = await User.updateOne({ user_id }, { $set: data });
            if (!user) throw new CustomError("user does not exist", 404);

        return user;
        }
        
    }
}

module.exports = new UserService();
