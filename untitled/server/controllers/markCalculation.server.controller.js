/**
 * Created by User on 18-Nov-15.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Course  = require('../models/course.server.model.js');

var Category  = require('../models/category.server.model.js');
var SubCategory  = require('../models/subCategory.server.model.js');
var CalculatedMark  = require('../models/calculatedMark.server.model.js');

exports.SaveCalculatedMarks = function(req,res){
    var calculatedMark = new CalculatedMark();
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
                        //console.log(categories);
                        categoryList = categories;

                        calculatedMark.courseId = course._id;
                        for (var k = 0; k < categories.length; k++) {
                            calculatedMark.categories.push(categories[k].name);
                        }
                        for(var j = 0; j <categories.length; j++){
                            if(!categories[j].hasSubCategory){
                                console.log("??????????????????"+categories[j].name);
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
                    var uff = categories[j].name; var kuff =  categories[j].weight;
                                SubCategory.find({categoryId: categories[j]._id}, function (err, subCategories) {
                                    console.log(".................."+uff);
                                   // console.log(subCategories);
                                    var uff1 = subCategories[0];
                                    //console.log("mmmmmmmmmmmmmm"+uff1);
                                    for(var i=0;i<subCategories[0].listOfMark.length;i++){
                                        var sum = 0;
                                        sum = sum + subCategories[0].listOfMark[i].mark / subCategories[0].marksOutOf;
                                        for(var x=1;x<subCategories.length;x++){
                                            var again = subCategories[x].marksOutOf;
                                            SubCategory.findOne({ $and:[{_id: subCategories[x]._id},
                                                {"listOfMark.studentRoll":subCategories[0].listOfMark[i].studentRoll }]},
                                                {"listOfmark.mark" : 1},
                                                function(err,mark){
                                                    sum= sum + mark.mark / again;
                                                }
                                            );
                                        }
                                        console.log("mmmmmmmmmmmmmm"+uff +"\n"+uff1.listOfMark[i].studentName+
                                                "\n"+uff1.listOfMark[i].studentRoll+"\n"+
                                            (sum * kuff)/100
                                        );

                                        calculatedMark.listOfCategoryMark.push({categoryName: uff,
                                            studentName : uff1.listOfMark[i].studentName,
                                            studentRoll : uff1.listOfMark[i].studentRoll,
                                            markInPercentage : (sum * kuff)/100
                                        });
                                    }
                                });
                            }
                        }
                        console.log(calculatedMark.listOfCategoryMark);
                        calculatedMark.save(function (err, calculatedMark) {
                            if (err) console.log(err);
                            else{ //console.log(calculatedMark);
                                console.log("ggggggggggg"+calculatedMark.listOfCategoryMark.length);
                             res.json(calculatedMark);}
                        })
                    }
                });
            });
            //res.json("newly Created");
        }
        else{
            var categoryList = [];
            var categoryMarkList = [];
            Course.findOne({_id: req.params._id}, function (err, course) {
                Category.find({courseId: course._id}, function (err, categories) {
                    if (err)
                        return err;
                    for (var k = 0; k < categories.length; k++) {
                        categoryList.push(categories[k].name);
                    }
                    console.log(categoryList);
                    for(var j=0;j<categories.length;j++){
                        if(!categories[j].hasSubCategory){
                            for(var x=0;x<categories[j].listOfMark.length;x++){
                                categoryMarkList.push({categoryName : categories[j].name,
                                    studentName : categories[j].listOfMark[x].studentName,
                                    studentRoll : categories[j].listOfMark[x].studentRoll,
                                    markInPercentage : (categories[j].listOfMark[x].mark / categories[j].marksOutOf)
                                    *categories[j].weight
                                });
                            }
                        }
                    }
                    CalculatedMark.update({courseId: req.params._id },
                        {'$set': {
                            'categories': categoryList,
                            'listOfCategoryMark' : categoryMarkList
                        }},
                        function(err, numAffected) {
                            res.json(numAffected);
                        }

                    );
                });
            });

        }
    });
}