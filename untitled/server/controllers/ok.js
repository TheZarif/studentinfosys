/**
 * Created by Neela on 11/20/2015.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Course = require('../models/course.server.model.js');

var Category = require('../models/category.server.model.js');
var SubCategory = require('../models/subCategory.server.model.js');
var CalculatedMark = require('../models/calculatedMark.server.model.js');

exports.calculate = function (req, res) {
    var courseId = req.params._id;
    var categories = [];
    var count = 0;
    var size;
    Category.find({courseId : courseId}, function (err, categories) {
        if(err)                         res.status(400).send();
        size = categories.length;
        categories = categories;
        for(var i=0; i<categories.length; i++){
            var category = categories[i];
            SubCategory.find({categoryId : categories[i]._id}, function (err, subCategories) {

                if(!category.isAttendance){
                    for(var j=0; j<category.listOfMark.length; j++){
                        var sum = 0;
                        for(var k=0; k<subCategories.length; k++){
                            sum += subCategories[k].listOfMark[j].mark;
                        }
                        category.listOfMark[j].mark = sum;
                    }

                    var sum = 0;
                    for(var j=0; j<subCategories.length; j++){
                        sum += subCategories[j].marksOutOf;
                    }
                    category.marksOutOf = sum;
                }
                else {
                    for(var j=0; j<category.listOfMark.length;j++){
                        category.listOfMark[j].mark = category.listOfMark[j].attendanceList.length;
                    }
                    category.marksOutOf = category.totalAttendanceList.length;
                }

                Category.update({_id : category._id},{
                    '$set': {
                        'marksOutOf': category.marksOutOf,
                        'listOfMark': category.listOfMark
                    }},
                    function (err, numRow) {
                        if(err)         res.status(400).send();
                        else {
                            count++;
                            if(count == size){
                                res.json({})
                            }
                        }
                })
            })
        }
    })
};


exports.update = function (req, res) {
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