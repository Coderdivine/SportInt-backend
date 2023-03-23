const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
// const { BCRYPT_SALT } = require("../config");
const Schema = mongoose.Schema;
const uuid = require("uuid");

const userSchema = new Schema(
    {
        user_id:{
            type:String,
            default:uuid.v4().toString(),
            unique:true
        },
        username: {
            type: String,
            default:"No Username :(",
        },
        Interest:{
            type:String,
            required:true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            // select: false
        },
        image: {
            type: String,
            required: false
        },
        phone_number:{
            type:String,
            required:true
        },
        role: {
            type: String,
            default:"user",
            enum: ["user", "admin"]
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true
        },
        isEmailVerified: {
            type: Boolean,
            required: true,
            default: false
        },
        lastActive: {
            type: Date,
            required: true,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("sportIn-user", userSchema);