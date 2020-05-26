const mongoose = require('../database');

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        unique: true,
        required: true,
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;