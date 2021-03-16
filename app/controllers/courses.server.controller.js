﻿const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const Student = require('mongoose').model('Student');

//
function getErrorMessage(err) {
    console.log("getError");
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};
//
exports.create = function (req, res) {
    console.log("create......course");
    const course = new Course();
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.section = req.body.section;
    course.semester = req.body.semester;
    //article.creator = req.body.username;
    //console.log(course)
    //console.log("req.body");
    //
    //
    Student.findOne({email: req.body.email}, (err, student) => {
        //console.log("validate student.");
        if (err) { return getErrorMessage(err); }
        //
        //console.log('student is',student);
        req.id = student._id;

	
    }).then( function () 
    {
        course.student = req.id
        //console.log('course', course);

        course.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(course);
            }
        });
    
    });
};
//
exports.list = function (req, res) {
    Course.find().sort('-created').populate('student', 'firstName lastName fullName').exec((err, courses) => {
if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json(courses);
    }
});
};
//
exports.courseByID = function (req, res, next, id) {
    console.log("courseByStudentID");
    Course.findById(id).populate('student', 'firstName lastName').exec((err, course) => {if (err) return next(err);
    if (!course) return next(new Error('Failed to load course '
            + id));
        req.course = course;
        next();
        //res.status(200).json(res.course);
    });
};
exports.listByStudentID = function (req, res, next, id) {
    //console.log("listByStudentID");
    Course.find({student:id}).populate('student').exec((err, courses) => {if (err) return next(err);
    if (!courses) return next(new Error('Failed to load course '
            + id));
        res.courses = courses;
        //console.log('in listByStudentId:', res.courses)
        res.status(200).json(res.courses);
        next();
    });
};
//
exports.read = function (req, res) {
    console.log("reading");
    //console.log(res.course);
    //console.log("reading");
    res.status(200).json(req.course);
};
//
exports.update = function (req, res) {
    console.log('in update:', req.course)
    const course = req.course;
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.section = req.body.section;
    course.semester = req.body.semester;
    course.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
//
exports.delete = function (req, res) {
    const course = req.course;
    course.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
//The hasAuthorization() middleware uses the req.article and req.user objects
//to verify that the current user is the creator of the current article
exports.hasAuthorization = function (req, res, next) {
    console.log('in hasAuthorization - student: ',req.course.student)
    console.log('in hasAuthorization - student: ',req.id)
    //console.log('in hasAuthorization - user: ',req.user._id)


    if (req.course.student.id !== req.id) {
        return res.status(403).send({
            message: 'Student is not authorized'
        });
    }
    next();
};
