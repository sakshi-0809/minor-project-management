const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username: String,
    password: String,
    branch: String,
    name: String,
    isStudent: Boolean,
    admissionYear: String
});

module.exports = mongoose.model('User', user);
