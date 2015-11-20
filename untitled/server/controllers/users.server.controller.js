/**
 * Created by User on 05-Nov-15.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var User     = require('../models/user.server.model.js');
//var  Role = mongoose.model('Role');


/**
 * Create a Category
 */
exports.create = function(req, res) {

    var user = new User();      // create a new instance of the Bear model
    user.roleId = req.body.roleId;
    user.email = req.body.email;
    user.password = req.body.password;
    user.userName = req.body.userName;
    user.contactNo = req.body.contactNo;
    user.designation = req.body.designation;
    user.isActive = req.body.isActive;
    user.batchNo = req.body.batchNo;
    user.currentSemester = req.body.currentSemester;
    user.studentRoll = req.body.studentRoll;
    // save the bear and check for errors
    user.save(function(err) {
        if (err)
            res.send(err);

        res.json(user);
    });

};

/**
 * Show the current Category
 */
exports.getByUserId = function(req, res) {
    User.findById(req.params._id, function(err, role) {
        if (err)
            res.send(err);
        res.json(role);
    });
};

exports.update = function(req, res) {

    // use our bear model to find the bear we want
    User.findById(req.params._id, function(err, user) {

        if (err)
            res.send(err);

        user.roleId = req.body.roleId;
        user.email = req.body.email;
        user.password = req.body.password;
        user.userName = req.body.userName;
        user.contactNo = req.body.contactNo;
        user.designation = req.body.designation;
        user.isActive = req.body.isActive;
        user.batchNo = req.body.batchNo;
        user.currentSemester = req.body.currentSemester;
        user.studentRoll = req.body.studentRoll;
        // save the bear
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json(user);
        });

    });
}

/**
 * Delete an Category
 */
exports.delete = function(req, res) {
    User.remove({
        _id: req.params._id
    }, function(err, role) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully User deleted' });
    });
}

/**
 * List of Categories
 */
exports.list = function(req, res) {
    User.find(function(err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
}
exports.getUsersByRoleId = function(req, res) {
    User.find({ roleId: req.params._id },function(err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
}
exports.validateUser = function(req, res) {
    User.find({ $and:[{email: req.body.email},{password :req.body.password}]},function(err, users) {
        if (err)
            res.send(err);
        if(users.length==0) res.status(403).send("Invalid");
        else res.json(users);
    });
}
exports.getAllStudents = function(req, res) {
    User.find({ roleId: "Student" },function(err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
}
exports.getAllTeachers = function(req, res) {
    User.find({ roleId: "Teacher" },function(err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
}
exports.getAllAdmins = function(req, res) {
    User.find({ roleId: "Admin" },function(err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
}
exports.getAllStaffs = function(req, res) {
    User.find({ roleId: "Staff" },function(err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
}
exports.getAllTeachersName = function(req, res) {
    User.find({ roleId: "Teacher" },{ userName : 1},function(err, teachersName) {
        if (err){console.log(err);
            res.send(err);}
    else{console.log(teachersName);
        res.json(teachersName);}
    });
}
exports.getAllUsersForSemester = function(req,res){
    User.find({ $and:[{currentSemester: req.params.semester},{roleId :'Student'}]},function(err,students){
        if (err){console.log(err);
            res.send(err);}
        else{console.log(students);
            res.json(students);}
    });
}