/**
 * Created by IIT on 17-Nov-15.
 */
/**
 * Created by User on 16-Nov-15.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var CalculateMark     = require('../models/calculatedMark.server.model.js');
var Mark = require('../models/mark.server.model.js');

exports.list = function(req, res) {
    CalculateMark.find(function(err, marks) {
        if (err)
            res.send(err);

        res.json(marks);
    });
}
exports.delete = function(req, res) {
    CalculateMark.remove({
        _id: req.params._id
    }, function(err, role) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully User deleted' });
    });
}
exports.getByCourseId = function(req, res) {
    CalculateMark.findOne({courseId:req.params._id},function(err, marks) {
        if (err)
            res.send(err);

        res.json(marks);
    });
}
exports.getAllMarksByUserRollByCourseId = function(req,res){
    console.log(req.params._id+req.params.roll);
    CalculateMark.findOne({courseId:req.params._id},function(err, marks) {
        if (err)
            res.send(err);

        else{
            var markList = [];
            for(var i=0;i<marks.listOfCategoryMark.length;i++){
                if(marks.listOfCategoryMark[i].studentRoll == req.params.roll){
                    markList.push(marks.listOfCategoryMark[i]);
                }
            }
            res.send(markList);
        }
    });
}