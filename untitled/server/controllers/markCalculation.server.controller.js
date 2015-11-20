'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Course = require('../models/course.server.model.js');

var Category = require('../models/category.server.model.js');
var SubCategory = require('../models/subCategory.server.model.js');
var CalculatedMark = require('../models/calculatedMark.server.model.js');
//var calculatedMarkController     = require('./controllers/calculatedMark.server.controller.js');


exports.SaveCalculatedMarks = function (req, res) {
    calculateSubCategories(req, res);
    //res.json("calculation done");
}

exports.getMarksView = function (req, res) {
    CalculatedMark.findOne({courseId: req.params._id}, function (err, row) {
        if (row == null) {
            addAllCategoryTotal(req.params._id, res);
        }
        else {
            updateAllCategoryTotal(req.params._id, res);
        }
    });
}
function addAllCategoryTotal(id, res) {
    console.log("addAllCategoryTotal" + id);
    Course.findOne({_id: id}, function (err, course) {
        if (err)
            console.log(err);
        else {
            var calculatedMark = new CalculatedMark();
            calculatedMark.courseId = id;
            Category.find({courseId: course._id}, function (err, categories) {
                for (var i = 0; i < categories.length; i++) {
                    calculatedMark.categories.push(categories[i].name);
                }
                for (var j = 0; j < categories.length; j++) {
                    for (var x = 0; x < categories[j].listOfMark.length; x++) {
                        calculatedMark.listOfCategoryMark.push({
                            categoryName: categories[j].name,
                            studentName: categories[j].listOfMark[x].studentName,
                            studentRoll: categories[j].listOfMark[x].studentRoll,
                            markInPercentage: (categories[j].listOfMark[x].mark / categories[j].marksOutOf)
                            * categories[j].weight
                        });
                    }

                }
                calculatedMark.save(function (err, calculatedMark) {
                    if (err) console.log(err);
                    else { //console.log(calculatedMark);
                        console.log("ggggggggggg" + calculatedMark.listOfCategoryMark.length);
                        //  res.json(calculatedMark);
                    }
                    res.json(calculatedMark);
                });
            });

        }
    });
}

function updateAllCategoryTotal(id, res) {
    Course.findOne({_id: id}, function (err, course) {
        Category.find({courseId: course._id}, function (err, categories) {
            if (err)
                console.log(err);
            var categoryList = [];
            var categoryMarkList = [];
            for (var k = 0; k < categories.length; k++) {
                categoryList.push(categories[k].name);
            }
            for (var j = 0; j < categories.length; j++) {
                for (var x = 0; x < categories[j].listOfMark.length; x++) {
                    categoryMarkList.push({
                        categoryName: categories[j].name,
                        studentName: categories[j].listOfMark[x].studentName,
                        studentRoll: categories[j].listOfMark[x].studentRoll,
                        markInPercentage: (categories[j].listOfMark[x].mark / categories[j].marksOutOf)
                        * categories[j].weight
                    });
                }
            }
            CalculatedMark.update({courseId: id}, {
                    '$set': {
                        'categories': categoryList,
                        'listOfCategoryMark': categoryMarkList
                    }
                },
                function (err, numAffected) {
                    if (err) consile.log(err);
                    res.json(numAffected);
                });

        });
    });
}
function calculateSubCategories(req, res) {
    Course.findOne({_id: req.params._id}, function (err, course) {
        if (err) res.status(400).send(err);
        else {
            Category.find({courseId: course._id}, function (err, categories) {

                for (var j = 0; j < categories.length; j++) {
                    if (!categories[j].isAttendance) {

                        initializeCategory(categories[j], doTest);
                        //doTest(categories[j]);
                    }
                    else {
                        console.log("i am ffor attendance ......................+++");
                        updateMarkOutOfForAttendance(categories[j]);
                        for (var a = 0; a < categories[j].listOfMark.length; a++) {
                            updateMarkObtainedForAttendance(categories[j], categories[j].listOfMark[a].studentRoll,
                                categories[j].listOfMark[a].attendanceList);
                        }
                    }
                }
            });
        }
    });

}
function initializeCategory(cat, callback) {
    Category.findOne(
        {_id: cat._id},
        function (err, category) {
            if (err) console.log(err);
            for (var c = 0; c < category.listOfMark.length; c++) {
                category.listOfMark[c].mark = 0;
            }
            Category.update({_id: cat._id},
                {'$set': {'listOfMark': category.listOfMark}},
                function (err, numOfRow) {
                    if (err) console.log(err);
                    else {
                        console.log(numOfRow);
                        callback(cat);
                    }
                });

        }
    );


}
function doTest(cat) {
    SubCategory.find({categoryId: cat._id}, function (err, subCategories) {
        console.log("from" + cat.name + "child" + subCategories);
        var sum = 0;
        for (var i = 0; i < subCategories.length; i++) {
            sum = sum + subCategories[i].marksOutOf;
        }
        //cat.marksOutOf = sum;

        var s0 = subCategories[0].listOfMark;
        for (var x = 0; x < s0.length; x++) {//updateMarkObtained(cat._id, s0[x].studentRoll, s0[x].mark);
            for (var k = 0; k < subCategories.length; k++) {
                cat.listOfMark[x].mark += subCategories[k].listOfMark[x].mark;
            }
        }

        Category.update({_id: cat._id},
            {'$set': {'listOfMark': cat.listOfMark,
                    'marksOutOf' : sum}},
            function (err, numOfRow) {
                if (err) console.log(err);
                else {
                    console.log(numOfRow);
                }
            });


    });
}
function updateMarkOutOfForAttendance(cat) {
    console.log("////////////////updatedMarkOutOF   for attendance  ...........");
    Category.update(
        {_id: cat._id},
        {
            '$set': {
                'marksOutOf': cat.totalAttendanceList.length
            }
        },
        function (err, numAffected) {
            if (err) console.log(err);
            console.log("updated attendence");
        }
    );
}
function updateMarkObtainedForAttendance(cat, roll, attendencelist) {
    console.log("////////////////updatedMark Obtained for attendance.....................");
    Category.update(
        {_id: cat._id, 'listOfMark.studentRoll': roll},
        {$set: {"listOfMark.$.mark": attendencelist.length}},
        function (err, numAffected) {
            if (err) console.log(err);
            console.log("updated alon e ..................");
        }
    );

}
function updateMarksOutOf(id, updatedMark) {
    console.log("////////////////updatedMarkOutOF" + id + updatedMark);
    Category.update(
        {_id: id},
        {
            '$set': {
                'marksOutOf': updatedMark
            }
        },
        function (err, numAffected) {
            if (err) console.log(err);
            console.log("updated");
        }
    );
}

