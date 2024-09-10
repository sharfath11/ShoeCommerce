import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    
    mobileNumber: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    block: {
        type: Boolean,
        default: false
    },
    googleUser: {
        type: Boolean,
        default: false
    },
    googleId: {
        type: String,
        default: null
    }
}, { timestamps: true });
const User = mongoose.model('User', userSchema);
module.exports = User;
