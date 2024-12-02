const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true, minlength: 2 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt=await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

UserSchema.methods.matchPassword= async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
};

module.exports = mongoose.model('User', UserSchema);