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
var Course  = require('../models/course.server.model.js');
var User  = require('../models/user.server.model.js');
var Category  = require('../models/category.server.model.js');
var SubCategory  = require('../models/subCategory.server.model.js');
var CalculatedMark  = require('../models/calculatedMark.server.model.js');
var categoryController     = require('../controllers/categories.server.controller.js');
//var  Role = mongoose.model('Role');

/**
 * Create a Category
 */
exports.create = function(req, res) {

    var course = new Course();      // create a new instance of the Bear model
    course.courseName = req.body.courseName;
    course.courseCode = req.body.courseCode;
    course.credit = req.body.credit;
    course.teacherAssigned = req.body.teacherAssigned;
    course.semester = req.body.semester;
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
        course.teacherAssigned = req.body.teacherAssigned;
        course.semester = req.body.semester;
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
       // console.log(courseList);
    });
}
exports.getCoursesForTeacher = function (req,res) {
    var teacherName;
    User.findOne({ _id: req.params._id }, { userName: 1} ,function(err, user) {
        if (err)
           console.log(err);
    else {teacherName = user.userName;
            console.log(teacherName);
            Course.find({ teacherAssigned: teacherName },function(err, courses) {
                if (err)
                    res.send(err);

                res.json(courses);
            });
        }
    });
}
exports.getCoursesForStudent = function (req,res) {
    var studentSemester;
    User.findOne({ _id: req.params._id },function(err, user) {
        if (err)
            console.log(err);
        else { studentSemester = user.currentSemester;
            console.log(studentSemester);
            Course.find({ semester: studentSemester },function(err, courses) {
                if (err)
                    res.send(err);

                res.json(courses);
            });
        }
    });
}

exports.getStudentCountByCourseId = function (req,res) {
    Course.findOne({ _id: req.params._id },function(err, course) {
        if (err)
            res.json(err);
        var semester = course.semester;
        User.find({ $and:[{roleId : 'Student'},{currentSemester : semester}]}).count(function(err,count){
            if(err){res.json(err);}
            res.json(count);
        });
    });
}

exports.SaveCalculatedMarks = function(req,res){
    CalculatedMark.findOne({courseId: req.params._id },function(err,row){
        if(row==null) {
            Course.findOne({_id: req.params._id}, function (err, course) {
                if (err)
                    res.json(err);
                var categoryList;
                Category.find({courseId: course._id}, function (err, categories) {
                    if (err)
                        return err;

                    else {
                        console.log(categories);
                        categoryList = categories;
                        var calculatedMark = new CalculatedMark();
                        calculatedMark.courseId = course._id;
                        for (var k = 0; k < categories.length; k++) {
                            calculatedMark.categories.push(categories[k].name);
                        }
                        for(var j = 0; j <categories.length; j++){
                            if(!categories[j].hasSubCategory){
                                for(var x=0;x<categories[j].listOfMark.length;x++){
                                    calculatedMark.listOfCategoryMark.push({categoryName : categories[j].name,
                                    studentName : categories[j].listOfMark[x].studentName,
                                    studentRoll : categories[j].listOfMark[x].studentRoll,
                                    markInPercentage : (categories[j].listOfMark[x].mark / categories[j].marksOutOf)
                                                                                        *categories[j].weight
                                    });
                                }
                            }
                            else
                            {
                                SubCategory.find({categoryId: categories[j]._id}, function (err, subCategories) {

                                });
                            }
                        }
                        calculatedMark.save(function (err, calculatedMark) {
                            if (err) console.log(err);
                           else{ console.log(calculatedMark); res.json(calculatedMark);}
                        })
                    }
                });
            });
            //res.json("newly Created");
        }
        else{
            res.json("already exist");
        }
        });
}
function calculateTotalInCategory(){}
