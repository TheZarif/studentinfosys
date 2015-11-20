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

    calculateSubCategories(req);
    res.json("calculation done");

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
function calculateSubCategories(req) {
    console.log(req.params._id);
    Course.findOne({_id: req.params._id}, function (err, course) {
        if (err) console.log(err);
        else {
            Category.find({courseId: course._id}, function (err, categories) {
                for (var j = 0; j < categories.length; j++) {
                    if (!categories[j].isAttendance) {
                        // var c = categories[j];
                        //  console.log("from  " + c.name);
                        initializeCategory(categories[j]);
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
function doTest(cat) {
    SubCategory.find({categoryId: cat._id}, function (err, subCategories) {
        console.log("from" + cat.name + "child" + subCategories);
        var sum = 0;
        for (var i = 0; i < subCategories.length; i++) {
            sum = sum + subCategories[i].marksOutOf;
        }
        console.log("dddddddddddddd" + sum);
        updateMarksOutOf(cat._id, sum);

        var s0 = subCategories[0].listOfMark;
        for (var x = 0; x < s0.length; x++) {
            updateMarkObtained(cat._id, s0[x].studentRoll, s0[x].mark);
            for (var k = 1; k < subCategories.length; k++) {
                //console.log("oooooooooos"+subCategories[k]._id+s0[x].studentRoll);
                getMark(cat._id, subCategories[k]._id, s0[x].studentRoll);
            }
        }

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
function updateMarkObtained(catId, roll, tempMark) {
    console.log("////////////////updatedMark Obtained" + catId + " " + roll + " " + tempMark);
    Category.update(
        {_id: catId, 'listOfMark.studentRoll': roll},
        {$inc: {"listOfMark.$.mark": tempMark}},
        function (err, numAffected) {
            if (err) console.log(err);
            console.log("updated alon e ..................");
        }
    );

}
function getMark(catId, id, roll) {
    console.log("///////////////get amer  " + id + roll);
    SubCategory.findOne({_id: id}, {'listOfMark.mark': 1, 'listOfMark.studentRoll': 1},
        function (err, subMark) {
            if (err) return err;
            else {
                for (var i = 0; i < subMark.listOfMark.length; i++) {
                    if (subMark.listOfMark[i].studentRoll == roll) {
                        console.log(subMark.listOfMark[i].mark);
                        updateMarkObtained(catId, roll, subMark.listOfMark[i].mark);
                        //  return subMark.listOfMark[i].mark;
                    }
                }
            }
        });
}

function initializeCategory(cat) {
    console.log("initializing");
    Category.findOne(
        {_id: cat._id},
        function (err, category) {
            if (err) console.log(err);
          //  console.log("initttttttttt" + id);
            var list = [];
            for (var c = 0; c < category.listOfMark.length; c++) {
                category.listOfMark[c].mark = 0;
                list.push(category.listOfMark[c]);
                console.log(category.listOfMark[c]);
            }
            Category.update({_id: cat._id},
                {'$set': {'listOfMark': list}},
                function (err, numOfRow) {
                    if (err) console.log(err);
                    else {
                        console.log(numOfRow);
                        doTest(cat)
                    }
                });

        }
    );


}