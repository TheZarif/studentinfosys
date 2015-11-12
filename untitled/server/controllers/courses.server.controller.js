/**
 * Created by IIT on 12-Nov-15.
 */
/**
 * Created by User on 05-Nov-15.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Course     = require('../models/course.server.model.js');
//var  Role = mongoose.model('Role');

/**
 * Create a Category
 */
exports.create = function(req, res) {

    var course = new Course();      // create a new instance of the Bear model
    course.courseName = req.body.courseName;
    course.courseCode = req.body.courseCode;
    course.credit = req.body.credit;

    // save the bear and check for errors
    course.save(function(err) {
        if (err)
            res.send(err);
        res.json(course);
    });
};

/**
 * Show the current Category
 */

exports.update = function(req, res) {

    // use our bear model to find the bear we want
    Course.findById(req.params._id, function(err, course) {

        if (err)
            res.send(err);

        course.courseName = req.body.courseName;
        course.courseCode = req.body.courseCode;
        course.credit = req.body.credit;
        // save the bear
        course.save(function(err) {
            if (err)
                res.send(err);

            res.json(course);
        });

    });
}

/**
 * Delete an Category
 */
exports.delete = function(req, res) {
    Course.remove({
        _id: req.params._id
    }, function(err, course) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully Course deleted' });
    });
}

/**
 * List of Categories
 */
exports.list = function(req, res) {
    Course.find(function(err, courseList) {
        if (err)
            res.send(err);

        res.json(courseList);
    });
}


