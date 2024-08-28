const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    profilePic: {
        type: String,
    },
    // Removed username and email fields to avoid duplication
}, { timestamps: true }); // Adding timestamps

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
