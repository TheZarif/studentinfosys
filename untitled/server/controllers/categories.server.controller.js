/**
 * Created by User on 16-Nov-15.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Category     = require('../models/category.server.model.js');
var Mark = require('../models/mark.server.model.js');
var Course     = require('../models/course.server.model.js');
var User     = require('../models/user.server.model.js');
/**
 * Create a Category
 */
exports.create = function(req,res){

    Course.findOne({_id:req.params._id},function(err,course){
        if(err) res.json(err);
        var category = new Category();
        category.courseId = req.params._id;
        User.find({currentSemester:course.semester},function(err,users){
            for(var i = 0;i<users.length;i++){
                var mark = new Mark();
                mark.studentName = users[i].userName;
                mark.studentRoll = users[i].studentRoll;
                mark.mark = 0;
                mark.attendencelist = [];
                category.listOfMark.push(mark);
            }
            // save the bear and check for errors
            category.save(function(err) {
                if (err)
                    res.send(err);

                res.json(category);
            });
        });
    });

}

exports.update = function(req, res) {

    // use our bear model to find the bear we want
    Category.update(
        {_id: req.params._id},
        {'$set': {
            'listOfMark': req.body.listOfMark,
            'name' : req.body.name,  // set the bears name (comes from the request)
            'description' : req.body.description,
            'weight' : req.body.weight,
            'isSelected' : req.body.isSelected,
            'date' : req.body.date,
            'hasSubCategory':req.body.hasSubCategory,
            'isAttendance' : req.body.isAttendance,
            'totalAttendanceList' : req.body.totalAttendanceList,
            'courseId' : req.body.courseId,
            'marksOutOf' : req.body.marksOutOf || 0
        }},
        function(err, numAffected) {
           if(err) res.json(err);
          else res.json(numAffected);
        }
    );

}

/**
 * Delete an Category
 */
exports.delete = function(req, res) {
    Category.remove({
        _id: req.params._id
    }, function(err, category) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
}
exports.list = function(req, res) {
    Category.find(function(err, categories) {
        if (err)
            res.send(err);

        res.json(categories);
    });
}
exports.getCategoriesByCourseId = function(req, res) {
    Category.find({ courseId: req.params._id },function(err, categories) {
        if (err)
            res.send(err);

        res.json(categories);
    });
}
exports.getAbc = function(courseId) {
    Category.find({ courseId: courseId },function(err, categories) {
        if (err)
            return err;

        else {console.log(categories);return categories;}
    });
}