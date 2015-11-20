/**
 * Created by IIT on 12-Nov-15.
 */
/**
 * Created by User on 03-Nov-15.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var FileSchema = require('./file.server.model.js').schema;
/**
 * Category Schema
 */
var CourseSchema = new Schema({
    // the property name
    courseName:  String,
    courseCode : String,
    credit : Number,
    teacherAssigned : String,
    semester : String,

});

// Expose the model to other objects (similar to a 'public' setter).
module.exports = mongoose.model('Course', CourseSchema);

