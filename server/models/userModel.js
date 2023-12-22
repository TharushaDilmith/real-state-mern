//import modules
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Create user schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name.']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password.']
    },
}, {
    timestamps: true
});

// Create middleware to hash password
userSchema.pre('save', async function(next) {
    // Check if password is modified
    if (!this.isModified('password')) {
        next();
    }
    // Hash password
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

// Create method to match password
userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Create user model
const User = mongoose.model('User', userSchema);

// Export module
export default User;