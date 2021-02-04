const mongoose = require('mongoose');
const Course = require('./courses');

mongoose.connect('mongodb://localhost/minorProject', { useNewUrlParser: true });
const runner = async () => {

    const newCourse = new Course({
        courseName: "Minor Project",
        courseCode: "-",
        semester: 6,
        branch: ['CSE', 'CCE', 'IT']
    });

    await newCourse.save(err => {
        if (err) {
            console.log("There was an Error");
        }
        else {
            console.log("Saved Successfully");
        }
    });
}

runner();

