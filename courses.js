const mongoose = require('mongoose');

const course = new mongoose.Schema({
    courseName: String,
    courseCode: String,
    semester: Number,
    branch: [String]
});

module.exports = mongoose.model('Course', course);