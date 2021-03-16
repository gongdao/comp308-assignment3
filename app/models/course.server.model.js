﻿// Load the module dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
//
// Define a new 'UserSchema'
var CourseSchema = new Schema({
	courseCode: {
		type: String,
		// Validate 'username' value existance
		required: 'Student Number is required',
		// Trim the 'username' field
		trim: true
    },
    courseName: {
		type: String,
		// Set a unique 'username' index
		required: 'Student Number is required',
		// Trim the 'username' field
		trim: true
    },
    section: {
		type: String,
		// Set a unique 'username' index
		required: 'Student Number is required',
		// Trim the 'username' field
		trim: true
    },
    semester: {
		type: String,
		// Set a unique 'username' index
		required: 'Student Number is required',
		// Trim the 'username' field
		trim: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }
	
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model('Course', CourseSchema);